import { useContext } from "react";

import context from "store/context";

export interface Props {
  style: React.CSSProperties;
  className: string;
  onClick: () => void;
}

const PlayButton: React.FC<Props> = (props) => {
  const { isPlaying } = useContext(context);
  const buttonProps = {
    "aria-label": isPlaying ? "pause slideshow" : "start slideshow",
    ...props,
  };
  return (
    <button {...buttonProps}>
      <svg viewBox="0 0 100 100">
        {isPlaying ? (
          <path data-testid="pause-path" d="M 20 15 h 20 v 70 h -20 v -70 M 60 15 h 20 v 70 h -20 v -70" />
        ) : (
          <path data-testid="play-path" d="M 17 12 L 87 50 L 17 88 L 17 12 M 64 50 L 27 30 L 27 71 L 64 50 Z" />
        )}
      </svg>
    </button>
  );
};

export default PlayButton;
