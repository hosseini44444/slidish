import { useContext } from "react";

import context from "store/context";

export interface Props {
  style: React.CSSProperties;
  className: string;
  infinite: boolean;
  onClick: () => void;
}

const NextButton: React.FC<Props> = ({ style, infinite, ...otherProps }) => {
  const { slidesCount, currentIndex } = useContext(context);

  const opacity = (1.5 - currentIndex / (slidesCount - 1)).toFixed(2);
  const cursor = infinite ? "pointer" : currentIndex === slidesCount - 1 ? "not-allowed" : "pointer";
  const updatedStyle = { opacity, cursor, ...style };
  const disabled = infinite ? false : currentIndex === slidesCount - 1;

  return (
    <button aria-label="next slide" style={updatedStyle} disabled={disabled} {...otherProps}>
      <svg viewBox="0 0 100 100" style={style}>
        <path d="M 30 10 L 70 50 L 30 90 L 30 70 L 50 50 L 30 30 L 30 10 Z" />
      </svg>
    </button>
  );
};

export default NextButton;
