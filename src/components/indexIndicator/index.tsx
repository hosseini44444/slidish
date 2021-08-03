import { useContext } from "react";

import context from "store/context";

interface Props {
  hide: boolean;
  style: React.CSSProperties;
  className: string;
}

const IndexIndicator: React.FC<Props> = ({ hide, ...otherProps }) => {
  const { currentIndex, slidesCount } = useContext(context);
  return hide ? null : <span {...otherProps}>{currentIndex + 1 + " / " + slidesCount}</span>;
};

export default IndexIndicator;
