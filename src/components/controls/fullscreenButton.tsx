import { useContext } from "react";

import context from "store/context";

export interface Props {
  style: React.CSSProperties;
  className: string;
  onClick: () => void;
}

const FullscreenButton: React.FC<Props> = (props) => {
  const { isFullscreen } = useContext(context);
  const buttonProps = {
    "aria-label": isFullscreen ? "exit fullscreen" : "go fullscreen",
    ...props,
  };

  return (
    <button {...buttonProps}>
      <svg viewBox="0 0 100 100">
        {isFullscreen ? (
          <path d="M 41 41 L 41 15 L 33 15 L 33 33 L 15 33 L 15 41 L 41 41 M 59 15 L 59 41 L 85 41 L 85 33 L 68 33 L 68 15 L 59 15 M 15 59 L 15 68 L 33 68 L 33 85 L 41 85 L 41 59 L 15 59 M 85 59 L 59 59 L 59 85 L 68 85 L 68 68 L 85 68 L 85 59 Z" />
        ) : (
          <path d="M 15 15 L 41 15 L 41 24 L 24 24 L 24 41 L 15 41 L 15 15 M 59 15 L 85 15 L 85 41 L 76 41 L 76 24 L 59 24 L 59 15 M 15 59 L 24 59 L 24 76 L 41 76 L 41 85 L 15 85 L 15 59 M 85 59 L 85 85 L 59 85 L 59 76 L 76 76 L 76 59 L 85 59 Z" />
        )}
      </svg>
    </button>
  );
};

export default FullscreenButton;
