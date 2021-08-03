import { useEffect, useState, useContext, memo } from "react";
import context from "store/context";

interface Props {
  index: number;
  placeHolder: JSX.Element | string;
  preloadCount: number;
}

const LazySlide: React.FC<Props> = ({ children, index, preloadCount, placeHolder, ...otherProps }) => {
  const { currentIndex } = useContext(context);
  const [loaded, setLoaded] = useState(false);

  const pHolder = <div {...otherProps}>{placeHolder}</div>;
  const full = <div {...otherProps}>{children}</div>;
  const isInRange = index <= currentIndex + preloadCount && index >= currentIndex - preloadCount;
  const result = loaded ? full : isInRange ? full : pHolder;

  useEffect(() => {
    !loaded && isInRange && setLoaded(true);
  }, [loaded, isInRange]);

  return result;
};

export default memo(LazySlide);
