import { useContext } from "react";

import context from "store/context";

interface Props {
  className: string;
  style: React.CSSProperties;
  containerProps: { className: string; style: React.CSSProperties };
  hardwareAcceleration: boolean;
  hide: boolean;
  progress: number;
  transitionTimingFunction: string;
}

const ProgressBar: React.FC<Props> = ({
  hide,
  progress,
  transitionTimingFunction,
  hardwareAcceleration,
  style,
  className,
  containerProps,
}) => {
  const { transitionDuration } = useContext(context);

  const transition = `transform ${transitionDuration}s ${transitionTimingFunction}`;
  const updatedStyle = {
    ...style,
    transform: hardwareAcceleration ? `translate3d(${progress - 100}%,0,0)` : `translate(${progress - 100}%,0)`,
    transition,
  };

  return hide ? null : (
    <div data-testid="progressBar" {...containerProps}>
      <div style={updatedStyle} className={className} />
    </div>
  );
};

export default ProgressBar;
