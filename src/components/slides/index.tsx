import { Children, useEffect, useRef, useContext } from "react";
import type { MouseEventHandler, TouchEventHandler } from "react";

import context from "store/context";
import { actions } from "store/reducer";
import Slide from "./slide";
import LazySlide from "./lazySlide";

// React's Mouse and Touch Event handlers union type
export type MouchEventHandler = React.MouseEventHandler<HTMLDivElement> | React.TouchEventHandler<HTMLDivElement>;
// React's Mouse and Touch Events union type
export type MouchEvent = React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>;

interface Props {
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
  hide: boolean;
  containerClass: string;
  containerStyle: React.CSSProperties;
  hardwareAcceleration: boolean;
  lazyLoad: boolean;
  onSlide?: (currentIndex: number, type: "next" | "previous") => void;
  pauseOnHover: boolean;
  placeHolder: JSX.Element | string;
  preloadCount: number;
  slideProps: {
    className: string;
    style: React.CSSProperties;
  };
  slideStopPropagation: boolean;
  slides: React.ReactNode;
  slidingSensitivity: number;
  transitionTimingFunction: string;
}

const Slides: React.FC<Props> = ({
  children,
  hide,
  slides,
  hardwareAcceleration,
  onSlide,
  transitionTimingFunction,
  slidingSensitivity,
  slideStopPropagation,
  slideProps,
  containerClass,
  containerStyle,
  lazyLoad,
  preloadCount,
  placeHolder,
  pauseOnHover,
  ...otherProps
}) => {
  const { currentIndex, slidesCount, transitionDuration, isPlaying, dispatch, isTestEnv } = useContext(context);
  const startX = useRef<number>(0);
  const pointerDown = useRef<boolean>(false);
  // To detect that if the click event is the result of sliding to another slide
  // and stop click event propagation to slides after sliding
  const justSlid = useRef<boolean>(false);
  // To detect that if sliding amount is more than slidingSensitivity and slide to next or previous slide
  // or return the slide to it's original position if sliding had been less than sensitivity
  const isSliding = useRef<boolean>(false);
  const playStatus = useRef(isPlaying ? "playing" : "stopped");

  const transition = `transform ${transitionDuration}s ${transitionTimingFunction}`;
  const transform = hardwareAcceleration
    ? `translate3d(-${currentIndex * 100}%,0,0)`
    : `translate(-${currentIndex * 100}%,0)`;

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => e.preventDefault();

  const handleSlideStart: MouchEventHandler = (e: MouchEvent) => {
    if (slidesCount === 1) return;
    startX.current = "clientX" in e ? e.clientX : e.targetTouches[0].clientX;
    pointerDown.current = true;
  };

  const handleSlideMove: MouchEventHandler = (e: MouchEvent) => {
    if (!pointerDown.current) return;
    const target = e.currentTarget;
    const x = "clientX" in e ? e.clientX : e.targetTouches[0].clientX;
    // for testing purpose
    const containerWidth = isTestEnv ? 100 : target.offsetWidth;
    const movement = x - startX.current;
    const translateX = currentIndex * -100 + +((movement / containerWidth) * 100).toFixed(2);
    target.style.transition = "none";
    target.style.transform = hardwareAcceleration ? `translate3d(${translateX}%,0,0)` : `translate(${translateX}%,0)`;
    if (Math.abs(movement) > slidingSensitivity) {
      isSliding.current = true;
      justSlid.current = true;
    }
  };

  const handleHover = () => {
    if (isPlaying && pauseOnHover) {
      dispatch(actions.pause());
      playStatus.current = "paused";
    }
  };

  const handleSlideEnd: MouchEventHandler = (e: MouchEvent) => {
    if (e.type === "mouseleave" && playStatus.current === "paused") {
      playStatus.current = "resumed";
      dispatch(actions.play());
    }
    const target = e.currentTarget;
    pointerDown.current = false;
    target.style.transition = transition;
    target.style.transform = transform;
    if (!isSliding.current) {
      justSlid.current = false;
      return;
    }
    // if (e.type === "touchend") e = e.touches[0] || e.changedTouches[0];
    const x = "clientX" in e ? e.clientX : e.changedTouches[0].clientX;
    const movement = x - startX.current;
    if (-movement > slidingSensitivity) {
      onSlide && onSlide(currentIndex, "next");
      dispatch(actions.next());
    } else if (movement > slidingSensitivity) {
      onSlide && onSlide(currentIndex, "previous");
      dispatch(actions.previous());
    }
    isSliding.current = false;
  };

  const clickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    (justSlid.current || slideStopPropagation) && e.stopPropagation();
    (justSlid.current || slideStopPropagation) && e.preventDefault();
  };

  useEffect(() => {
    if (playStatus.current !== "paused") playStatus.current = isPlaying ? "playing" : "stopped";
  }, [isPlaying]);

  useEffect(() => {
    const preventScroll = (e: Event) => {
      // in google chrome touch events are not cancelable while scrolling and preventDefault will cause a warning in console
      isSliding.current && e.cancelable && e.preventDefault();
    };
    window.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  return (
    // the root div is necessary for positioning controls, indicators , ...
    hide ? null : (
      <div {...otherProps}>
        <div
          data-testid="slidesContainer"
          className={containerClass}
          style={{ ...containerStyle, transition, transform }}
          onClickCapture={clickHandler}
          onMouseDown={handleSlideStart as MouseEventHandler}
          onTouchStart={handleSlideStart as TouchEventHandler}
          onMouseMove={handleSlideMove as MouseEventHandler}
          onMouseOver={handleHover}
          onTouchMove={handleSlideMove as TouchEventHandler}
          onMouseUp={handleSlideEnd as MouseEventHandler}
          onMouseLeave={handleSlideEnd as MouseEventHandler}
          onTouchEnd={handleSlideEnd as TouchEventHandler}
          onTouchCancel={handleSlideEnd as TouchEventHandler}
          onDragStart={handleDrag}
        >
          {Children.map(slides, (child, index) => {
            return lazyLoad ? (
              <LazySlide {...{ index, placeHolder, preloadCount, ...slideProps }}>{child}</LazySlide>
            ) : (
              <Slide {...{ index, ...slideProps }}>{child}</Slide>
            );
          })}
        </div>
        {children}
      </div>
    )
  );
};

export default Slides;
