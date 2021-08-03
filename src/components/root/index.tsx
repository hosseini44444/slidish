import { forwardRef, useEffect, useRef, useContext } from "react";

import context from "store/context";
import { actions } from "store/reducer";
import CloseButton from "./closeButton";

import type { Props as CloseButtonProps } from "./closeButton";

interface Props {
  className: string;
  style: React.CSSProperties;
  keyboardNavigation: boolean;
  closeButtonProps: CloseButtonProps;
  children: React.ReactNode;
}

const Root = forwardRef<HTMLDivElement, Props>(
  ({ children, keyboardNavigation, closeButtonProps, ...otherProps }, ref) => {
    const { isFullscreen, dispatch } = useContext(context);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => {
      return () => clearTimeout(timer.current);
    }, []);

    // For hiding mouse pointer after 2 seconds while fullscreen
    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
      clearTimeout(timer.current);
      // should be enabled even if it's not fullscreen
      // maybe user has exited fullscreen mode using keyboard navigation and pointer is still hidden
      const target = e.currentTarget;
      target.style.cursor = "";
      if (!isFullscreen) return;
      timer.current = window.setTimeout(() => {
        target.style.cursor = "none";
      }, 2000);
    };

    const handleKeyboardNavigation: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (e.currentTarget.contains(document.activeElement) && keyboardNavigation) {
        e.keyCode === 37 && dispatch(actions.previous());
        e.keyCode === 39 && dispatch(actions.next());
      }
    };

    return (
      <div
        data-testid="root"
        ref={ref}
        onMouseMove={handleMouseMove}
        onKeyUp={handleKeyboardNavigation}
        // for handling keyboard navigation just when slider is active and not elements out of slider
        tabIndex={-1}
        {...otherProps}
      >
        <CloseButton {...closeButtonProps} />
        {children}
      </div>
    );
  }
);

Root.displayName = "RootContainer";

export default Root;
