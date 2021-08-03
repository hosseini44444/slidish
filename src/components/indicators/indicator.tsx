interface Props {
  className: string;
  style: React.CSSProperties;
  index: number;
  onClick: (index: number) => void;
}

const Indicator: React.FC<Props> = ({ index, onClick, ...otherProps }) => {
  const keyDownHandler: React.KeyboardEventHandler<HTMLSpanElement> = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 32 || keyCode === 13) onClick(index);
  };

  const indicatorProps = {
    role: "button",
    "aria-label": "slide indicator, go to slide number " + (index + 1),
    tabIndex: 0,
    onKeyDown: keyDownHandler,
    onClick: () => onClick(index),
    ...otherProps,
  };

  return <span {...indicatorProps} />;
};

export default Indicator;
