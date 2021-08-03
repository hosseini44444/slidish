import { useContext } from "react";

import context from "store/context";
import { actions } from "store/reducer";
import Indicator from "./indicator";

interface Props {
  className: string;
  style: React.CSSProperties;
  activeIndicatorClass: string;
  activeIndicatorStyle: React.CSSProperties;
  hide: boolean;
  indicatorClass: string;
  indicatorStyle: React.CSSProperties;
  onIndicatorClick?: (index?: number) => void;
}

const Indicators: React.FC<Props> = ({
  indicatorClass,
  indicatorStyle,
  activeIndicatorClass,
  activeIndicatorStyle,
  onIndicatorClick,
  hide,
  ...otherProps
}) => {
  const { currentIndex, dispatch, slidesCount } = useContext(context);
  const indicators = new Array(slidesCount);
  indicators.fill(true);

  const classes = [indicatorClass];
  classes.push(activeIndicatorClass);
  const activeClass = classes.join(" ");

  const activeStyle: React.CSSProperties = { ...indicatorStyle, ...activeIndicatorStyle };

  const handleClick = (index: number) => {
    onIndicatorClick && onIndicatorClick(index);
    dispatch(actions.goto(index));
  };

  return hide ? null : (
    <div {...otherProps}>
      {indicators.map((indicator, index) => {
        const isActive = index === currentIndex;
        const style = isActive ? activeStyle : indicatorStyle;
        const className = isActive ? activeClass : indicatorClass;
        return <Indicator key={index} onClick={handleClick} {...{ index, style, className }} />;
      })}
    </div>
  );
};

export default Indicators;
