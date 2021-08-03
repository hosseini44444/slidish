import { useState, useRef, useCallback } from "react";

interface Props {
  className: string;
  style: React.CSSProperties;
  tabIndex: number;
  onClickCapture: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  placeHolder: JSX.Element | string;
}

const LazyThumb: React.FC<Props> = ({ children, placeHolder, ...otherProps }) => {
  const [loaded, setLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  const intersectionHandler: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      observerRef.current && observerRef.current.disconnect();
      setLoaded(true);
    }
  };

  // should be wrapped in useCallback, otherwise ref prop will change every time that the component reRenders
  // and this callback will be called again and again
  const intersectionRef: React.RefCallback<HTMLDivElement> = useCallback((thumb) => {
    if (thumb) {
      observerRef.current = new IntersectionObserver(intersectionHandler);
      observerRef.current.observe(thumb);
    } else {
      observerRef.current && observerRef.current.disconnect();
    }
  }, []);

  const thumbProps = {
    ref: intersectionRef,
    ...otherProps,
  };

  const full = <div {...thumbProps}>{children}</div>;
  const holder = <div {...thumbProps}>{placeHolder}</div>;
  const result = loaded ? full : holder;

  return result;
};

export default LazyThumb;
