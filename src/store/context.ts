import { createContext } from "react";
import type { Actions } from "./reducer";

interface SliderContext {
  slidesCount: number;
  dispatch: React.Dispatch<Actions>;
  isTestEnv: boolean;
  currentIndex: number;
  transitionDuration: number;
  isPlaying: boolean;
  isFullscreen: boolean;
}
const context = createContext<SliderContext>({} as SliderContext);

export const { Provider, Consumer } = context;
export default context;
