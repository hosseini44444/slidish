import { useReducer } from "react";

const calculateTransitionDuration = (
  currentIndex: number,
  nextIndex: number,
  slidesCount: number,
  transitionDuration: number,
  repeatTransitionDuration: number
): number => {
  if (slidesCount <= 2) return transitionDuration;
  // calculate number of slides in between
  const difference = Math.abs(currentIndex - nextIndex);
  // compute transition duration based on a single transitionDuration
  const differenceDuration = +(difference * transitionDuration).toFixed(2);
  // compute transition duration based on repeatTransitionDuration
  const repeatDuration = +(((difference + 1) / slidesCount) * repeatTransitionDuration).toFixed(2);
  // compute transition so that it will not be more than repeatTransitionDuration and it will not be more than more than transitionDuration * difference(number of slides in between)
  const nextTransitionDuration =
    repeatDuration > transitionDuration
      ? repeatDuration > differenceDuration
        ? differenceDuration
        : repeatDuration
      : transitionDuration;
  return nextTransitionDuration;
};

enum ActionTypes {
  NEXT = "NEXT",
  PREVIOUS = "PREVIOUS",
  GOTO = "GOTO",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  GO_FULLSCREEN = "GO_FULLSCREEN",
  EXIT_FULLSCREEN = "EXIT_FULLSCREEN",
}

type Next = { type: ActionTypes.NEXT };
type Previous = { type: ActionTypes.PREVIOUS };
type Goto = { type: ActionTypes.GOTO; index: number };
type Play = { type: ActionTypes.PLAY };
type Pause = { type: ActionTypes.PAUSE };
type GoFullscreen = { type: ActionTypes.GO_FULLSCREEN };
type ExitFullscreen = { type: ActionTypes.EXIT_FULLSCREEN };

export type Actions = Next | Previous | Goto | Play | Pause | GoFullscreen | ExitFullscreen;

const next = (): Next => ({ type: ActionTypes.NEXT });
const previous = (): Previous => ({ type: ActionTypes.PREVIOUS });
const goto = (index: number): Goto => ({ type: ActionTypes.GOTO, index });
const play = (): Play => ({ type: ActionTypes.PLAY });
const pause = (): Pause => ({ type: ActionTypes.PAUSE });
const goFullscreen = (): GoFullscreen => ({ type: ActionTypes.GO_FULLSCREEN });
const exitFullscreen = (): ExitFullscreen => ({ type: ActionTypes.EXIT_FULLSCREEN });

export const actions = {
  next,
  previous,
  goto,
  play,
  pause,
  goFullscreen,
  exitFullscreen,
};

export const useSlidesReducer = (
  slidesCount: number,
  startIndex: number,
  transitionDuration: number,
  repeatTransitionDuration: number,
  autoplay: boolean,
  startFullscreen: boolean,
  infinite: boolean,
  stopSlideshowOnPrev: boolean
): [typeof initialState, React.Dispatch<Actions>] => {
  const initialState = {
    currentIndex: startIndex,
    transitionDuration,
    isPlaying: autoplay,
    isFullscreen: startFullscreen,
  };

  const reducer = (state: typeof initialState, action: Actions): typeof initialState => {
    switch (action.type) {
      case ActionTypes.NEXT: {
        if (slidesCount === 1) return { ...state, currentIndex: 0, isPlaying: false, transitionDuration };
        let nextIndex = state.currentIndex + 1;
        if (nextIndex >= slidesCount) {
          nextIndex = slidesCount - 1;
          if (infinite) {
            nextIndex = 0;
          }
        }
        const nextTransitionDuration = calculateTransitionDuration(
          state.currentIndex,
          nextIndex,
          slidesCount,
          transitionDuration,
          repeatTransitionDuration
        );
        return {
          ...state,
          currentIndex: nextIndex,
          transitionDuration: nextTransitionDuration,
        };
      }
      case ActionTypes.PREVIOUS: {
        if (slidesCount === 1) return { ...state, currentIndex: 0, isPlaying: false, transitionDuration };
        let nextIndex = state.currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = 0;
          if (infinite) {
            nextIndex = slidesCount - 1;
          }
        }
        const nextTransitionDuration = calculateTransitionDuration(
          state.currentIndex,
          nextIndex,
          slidesCount,
          transitionDuration,
          repeatTransitionDuration
        );
        return {
          ...state,
          currentIndex: nextIndex,
          transitionDuration: nextTransitionDuration,
          isPlaying: stopSlideshowOnPrev ? false : state.isPlaying,
        };
      }
      case ActionTypes.GOTO: {
        if (slidesCount === 1) return { ...state, currentIndex: 0, isPlaying: false, transitionDuration };
        const nextIndex = action.index < 0 ? 0 : action.index >= slidesCount ? slidesCount - 1 : action.index;
        // changed due to [this React bug](https://github.com/facebook/react/issues/21416)
        // if (nextIndex === state.currentIndex) return state;
        if (nextIndex === state.currentIndex) return { ...state };
        const nextTransitionDuration = calculateTransitionDuration(
          state.currentIndex,
          nextIndex,
          slidesCount,
          transitionDuration,
          repeatTransitionDuration
        );
        return { ...state, currentIndex: nextIndex, transitionDuration: nextTransitionDuration };
      }
      case ActionTypes.PLAY: {
        return { ...state, isPlaying: true };
      }
      case ActionTypes.PAUSE: {
        return { ...state, isPlaying: false };
      }
      case ActionTypes.GO_FULLSCREEN: {
        return { ...state, isFullscreen: true };
      }
      case ActionTypes.EXIT_FULLSCREEN: {
        return { ...state, isFullscreen: false };
      }
      default:
        // changed due to [this React bug](https://github.com/facebook/react/issues/21416)
        // return state;
        throw new Error("[Slidish][reducer] should not be reached");        
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};

export default useSlidesReducer;
