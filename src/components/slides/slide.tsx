import { memo } from "react";

interface Props {
  className: string;
  style: React.CSSProperties;
  index: number;
}

const Slide: React.FC<Props> = ({ children, index, ...otherProps }) => <div {...otherProps}>{children}</div>;

export default memo(Slide);
