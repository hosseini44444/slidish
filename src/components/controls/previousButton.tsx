import { useContext } from "react";

import context from "store/context";

export interface Props {
  style: React.CSSProperties;
  className: string;
  infinite: boolean;
  onClick: () => void;
}

const PreviousButton: React.FC<Props> = ({  infinite, style, ...otherProps }) => {
  const { slidesCount, currentIndex } = useContext(context);

  const opacity = (currentIndex / (slidesCount - 1) + 0.5).toFixed(2);
  const cursor = infinite ? "pointer" : currentIndex === 0 ? "not-allowed" : "pointer";
  const updatedStyle = { opacity, cursor, ...style };
  const disabled = infinite ? false : currentIndex === 0;

  return (
    <button style={updatedStyle} disabled={disabled} aria-label="previous slide" {...otherProps}>
      <svg viewBox="0 0 100 100">
        <path d="M 70 10 L 30 50 L 70 90 L 70 70 L 50 50 L 70 30 L 70 10 Z" />
      </svg>
    </button>
  );
};

export default PreviousButton;
