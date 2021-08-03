interface Props {
  className: string;
  style: React.CSSProperties;
  tabIndex: number;
  onClickCapture: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
}

const Thumb: React.FC<Props> = ({ children, ...otherProps }) => <div {...otherProps}>{children}</div>;

export default Thumb;
