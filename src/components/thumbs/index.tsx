import { Children, useState, useRef, useContext, useCallback } from "react";
// ResizeObserver polyfill for older browsers
import { ResizeObserver } from "@juggle/resize-observer";

import context from "store/context";
import { actions } from "store/reducer";

import Thumb from "./thumb";
import LazyThumb from "./lazyThumb";
import type { MouchEvent, MouchEventHandler } from "components/slides";

interface Props {
  className: string;
  style: React.CSSProperties;
  activeThumbClass: string;
  activeThumbStyle: React.CSSProperties;
  containerClass: string;
  containerStyle: React.CSSProperties;
  hardwareAcceleration: boolean;
  hide: boolean;
  lazyLoad: boolean;
  onThumbClick?: (index?: number) => void;
  placeHolder: JSX.Element | string;
  thumbClass: string;
  thumbMargin: number;
  thumbStopPropagation: boolean;
  thumbStyle: React.CSSProperties;
  thumbWidth: number;
  thumbs: React.ReactNode;
  thumbsSlidingSensitivity: number;
  thumbsTransitionTimingFunction: string;
}

// const ResizeObserver = window.ResizeObserver || Polyfill;

const Thumbs: React.FC<Props> = ({
  thumbs,
  onThumbClick,
  thumbWidth,
  thumbMargin,
  thumbsTransitionTimingFunction,
  thumbsSlidingSensitivity,
  hardwareAcceleration,
  thumbStopPropagation,
  containerClass,
  containerStyle,
  thumbClass,
  activeThumbClass,
  thumbStyle,
  activeThumbStyle,
  lazyLoad,
  placeHolder,
  hide,
  ...otherProps
}) => {
  const { currentIndex, slidesCount, transitionDuration, dispatch } = useContext(context);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerDown = useRef(false);
  const sliding = useRef(false);
  const justSlid = useRef(false);
  const startX = useRef(0);
  const resizeObserver = useRef<ResizeObserver>();

  const width = thumbWidth + thumbMargin * 2;
  const extraWidth = slidesCount * width - containerWidth;
  const extraWidthPerThumb = extraWidth > 0 ? (extraWidth / (slidesCount - 1)).toFixed(2) : 0;
  const translateX = currentIndex * -extraWidthPerThumb;
  const transition = `transform ${transitionDuration}s ${thumbsTransitionTimingFunction}`;
  const transform = hardwareAcceleration ? `translate3d(${translateX}px, 0, 0)` : `translate(${translateX}px, 0)`;

  const resizeCallback: ResizeObserverCallback = (entries) => {
    setContainerWidth(entries[0].contentRect.width);
  };

  // should be wrapped in useCallback, otherwise ref prop will change every time that the component reRenders
  // and this callback will be called again and again
  const containerSizeRef: React.RefCallback<HTMLDivElement> = useCallback((container) => {
    containerRef.current = container;
    // Check if container has mounted and then create a new ResizeObserver instance and observe the container's size
    // If container is null (onUnMount) disconnect the resizeObserver
    if (container) {
      resizeObserver.current = new ResizeObserver(resizeCallback);
      resizeObserver.current.observe(container);
    } else {
      resizeObserver.current && resizeObserver.current.disconnect();
    }
  }, []);

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => e.preventDefault();

  const handleSlideStart: MouchEventHandler = (e: MouchEvent) => {
    startX.current = "clientX" in e ? e.clientX : e.targetTouches[0].clientX;
    pointerDown.current = true;
  };

  const handleSlideMove: MouchEventHandler = (e: MouchEvent) => {
    if (!pointerDown.current) return;
    const target = containerRef.current as HTMLDivElement;
    const x = "clientX" in e ? e.clientX : e.targetTouches[0].clientX;
    const movement = x - startX.current;
    target.style.transition = "none";
    target.style.transform = hardwareAcceleration
      ? `translate3d(${translateX + movement}px, 0, 0)`
      : `translate(${translateX + movement}px, 0)`;
    if (Math.abs(movement) > thumbsSlidingSensitivity) {
      sliding.current = true;
      justSlid.current = true;
    }
  };

  const handleSlideEnd: MouchEventHandler = (e: MouchEvent) => {
    const target = containerRef.current as HTMLDivElement;
    pointerDown.current = false;
    target.style.transition = transition;
    target.style.transform = transform;
    if (!sliding.current) {
      justSlid.current = false;
      return;
    }
    const x = "clientX" in e ? e.clientX : e.changedTouches[0].clientX;
    const movement = x - startX.current;
    const indexCount = Math.ceil(Math.abs(movement / width));
    const nextIndex =
      movement > thumbsSlidingSensitivity
        ? currentIndex - indexCount
        : -movement > thumbsSlidingSensitivity
        ? currentIndex + indexCount
        : currentIndex;
    dispatch(actions.goto(nextIndex));
    sliding.current = false;
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, index: number) => {
    (justSlid.current || thumbStopPropagation) && e.stopPropagation();
    (justSlid.current || thumbStopPropagation) && e.preventDefault();
    !justSlid.current && dispatch(actions.goto(index));
    !justSlid.current && onThumbClick && onThumbClick(index);
  };

  const classes = [thumbClass];
  classes.push(activeThumbClass);
  const activeClassName = classes.join(" ");

  const mainStyle = {
    ...thumbStyle,
    width: thumbWidth + "px",
    margin: "0px " + thumbMargin + "px",
  };

  const activeStyle = { ...activeThumbStyle, ...mainStyle };

  return hide ? null : (
    <div
      data-testid="thumbsRoot"
      onMouseDown={handleSlideStart as React.MouseEventHandler}
      onTouchStart={handleSlideStart as React.TouchEventHandler}
      onMouseMove={handleSlideMove as React.MouseEventHandler}
      onTouchMove={handleSlideMove as React.TouchEventHandler}
      onMouseUp={handleSlideEnd as React.MouseEventHandler}
      onMouseLeave={handleSlideEnd as React.MouseEventHandler}
      onTouchEnd={handleSlideEnd as React.TouchEventHandler}
      onTouchCancel={handleSlideEnd as React.TouchEventHandler}
      onDragStart={handleDrag}
      {...otherProps}
    >
      <div
        data-testid="thumbsContainer"
        ref={containerSizeRef}
        style={{ ...containerStyle, transform, transition }}
        className={containerClass}
      >
        {Children.map(thumbs, (child, index) => {
          const isActive = index === currentIndex;
          const className = isActive ? activeClassName : thumbClass;
          const style = isActive ? activeStyle : mainStyle;
          const keyDownHandler: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
            const keyCode = e.keyCode;
            if (keyCode === 32 || keyCode === 13) clickHandler(e, index);
          };
          const thumbProps = {
            onClickCapture: (e: React.MouseEvent<HTMLDivElement>) => clickHandler(e, index),
            onKeyDown: keyDownHandler,
            tabIndex: 0,
            role: "button",
            "aria-label": "thumbnail, go to slide number " + (index + 1),
            className,
            style,
          };
          const lazyThumbProps = { ...thumbProps, placeHolder };

          return lazyLoad ? <LazyThumb {...lazyThumbProps}>{child}</LazyThumb> : <Thumb {...thumbProps}>{child}</Thumb>;
        })}
      </div>
    </div>
  );
};

export default Thumbs;
