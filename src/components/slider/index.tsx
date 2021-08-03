import isEqual from "react-fast-compare";
import { Children, useCallback, useEffect, useMemo, useRef, useImperativeHandle, forwardRef, memo } from "react";

import usePrevious from "hooks/usePrevious";
import { Controls, IndexIndicator, Indicators, Root, ProgressBar, Slides, Thumbs } from "../../collection";
import { Provider } from "store/context";
import { actions, useSlidesReducer } from "store/reducer";

interface MainOptions {
  /**
   * Total height of the slider component
   * @defaultValue "500px"
   */
  height: string | number;
  /**
   * Total width of the slider component
   * @defaultValue "100%"
   */
  width: string | number;
  /**
   * Width of every single thumbnail in pixels (should be of type number so it can be used in calculating the thumbs
   * position).
   */
  thumbWidth: number;
  /**
   * Height of every single thumbnail.
   */
  thumbHeight: string | number;
  /**
   * Margin between every thumbnail in pixels (should be of type number so it can be used in calculating the thumbs
   * position).
   */
  thumbMargin: number;
  /**
   * Index of first slide to show on mount (starts from zero)
   */
  startIndex: number;
  /**
   * If set to false after reaching the last slide, clicking the next button
   * or calling the next method will have no effect
   * also slideshow will stop on last slide
   */
  infinite: boolean;
  /**
   * If set to true slider will start in fullscreen mode on mount (browser fullscreen mode is disabled on mount)
   */
  startFullscreen: boolean;
  /**
   * If set to false browser's fullscreen mode will not be used on fullscreen
   * @defaultValue true
   */
  useBrowserFullscreen: boolean;
  /**
   * If set to false keyboard navigation using left and right arrows will be disabled
   */
  keyboardNavigation: boolean;
  /**
   * Transition duration in seconds when switching to next or previous slide
   */
  transitionDuration: number;
  /**
   * Duration of transitioning between last and first slide. In conjunction with `transitionDuration`
   * property this will be used to calculate transitioning time between slides.
   */
  repeatTransitionDuration: number;
}

interface AdvancedOptions {
  /**
   * If set to false translate will be used instead of translate3d for transitioning between slides.
   *
   * @see [translate vs translate3d](https://stackoverflow.com/questions/22111256/translate3d-vs-translate-performance)
   */
  hardwareAcceleration: boolean;
  /**
   * If set to false click events will be propagated to slides otherwise click events will be discarded.
   */
  slideStopPropagation: boolean;
  /**
   * If set to false click events will be propagated to thumbnails otherwise click events will be discarded.
   */
  thumbStopPropagation: boolean;
  /**
   * Sliding sensitivity in pixels for going to next or previous slide. If mouse or touch movement will be
   * below this number no sliding will occur.
   */
  slidingSensitivity: number;
  /**
   * Sliding sensitivity in pixels for going to next or previous slide while dragging thumbs.
   * If mouse or touch movement will be below this number no sliding will occur.
   */
  thumbsSlidingSensitivity: number;
  /**
   * Timing function that will be used while transitioning between slides.
   */
  transitionTimingFunction: string;
  /**
   * Timing function that will be used while transitioning between thumbs.
   */
  thumbsTransitionTimingFunction: string;
}

interface SlideshowOptions {
  /**
   * If set to true slideshow will start automatically on mount
   */
  autoplay: boolean;
  /**
   * Interval in seconds between each slide while playing
   */
  playInterval: number;
  /**
   * If set to true the slideshow will stop if the user goes to previous slideshow
   */
  stopOnPrev: boolean;
  /**
   * If set to true the slideshow will pause when mouse hovers over slides and will play again after leaving the slides.
   */
  pauseOnHover: boolean;
}

interface LazyOptions {
  /**
   * If set to true a place holder will be shown instead of the actual slide or thumbnail when the slide is not loaded
   * or thumb is not in the view. If thumbs prop is not set, visible thumb will cause the actual slide to be loaded.
   */
  enabled: boolean;
  /**
   * This property will set the number of slides to be preloaded.
   */
  preloadCount: number;
  /**
   * Placeholder JSX node to be shown instead of the actual slide before loading.
   * @defaultValue "Loading..."
   */
  placeHolder: JSX.Element | string;
  /**
   * Placeholder JSX node to be shown instead of the actual thumbnail before loading.
   * @defaultValue "Loading thumb..."
   */
  thumbPlaceHolder: JSX.Element | string;
}

interface Classes {
  /**
   * Will be applied to the outermost div container of all slider elements while not in fullscreen mode
   */
  root: string;
  /**
   * Will be applied to the outermost div container of all slider elements while in fullscreen mode
   */
  rootFullscreen: string;
  /**
   * Will be applied to the outermost container of slides
   */
  slidesRoot: string;
  /**
   * Will be applied to the container of slides which moves inside slidesRoot when slides move
   */
  slidesContainer: string;
  /**
   * Will be applied to every single slide
   */
  slide: string;
  /**
   * Will be applied to the outermost container of thumbnails
   */
  thumbsRoot: string;
  /**
   * Will be applied to the container of thumbs which moves inside thumbsRoot when thumbs move
   */
  thumbsContainer: string;
  /**
   * Will be applied to every single thumbnail including the active one
   */
  thumb: string;
  /**
   * Will be applied to the currently active slide's thumbnail
   */
  activeThumb: string;
  /**
   * Will be applied to the indexIndicator span
   */
  indexIndicator: string;
  /**
   * Will be applied to the container div of indicators
   */
  indicatorsContainer: string;
  /**
   * Will be applied to every single indicator including the active one.
   */
  indicator: string;
  /**
   * Will be applied to the currently active slide's indicator
   */
  activeIndicator: string;
  /**
   * Will be applied to the container div of the progressBar
   */
  progressBarContainer: string;
  /**
   * Will be applied to the progressBar
   */
  progressBar: string;
  /**
   * Will be applied to the previous button
   */
  previousButton: string;
  /**
   * Will be applied to the next button
   */
  nextButton: string;
  /**
   * Will be applied to the play & pause button
   */
  playButton: string;
  /**
   * Will be applied to the close button of fullscreen mode
   */
  fullscreenCloseButton: string;
  /**
   * Will be applied to the fullscreen & exit fullscreen button
   */
  fullscreenButton: string;
}

interface Styles {
  /**
   * Will be applied to the outermost div container of all slider elements while not in fullscreen mode
   */
  root: React.CSSProperties;
  /**
   * Will be applied to the outermost div container of all slider elements while in fullscreen mode
   */
  rootFullscreen: React.CSSProperties;
  /**
   * Will be applied to the outermost container of slides
   */
  slidesRoot: React.CSSProperties;
  /**
   * Will be applied to the container of slides which moves inside slidesRoot when slides move
   */
  slidesContainer: React.CSSProperties;
  /**
   * Will be applied to every single slide
   */
  slide: React.CSSProperties;
  /**
   * Will be applied to the outermost container of thumbnails
   */
  thumbsRoot: React.CSSProperties;
  /**
   * Will be applied to the container of thumbs which moves inside thumbsRoot when thumbs move
   */
  thumbsContainer: React.CSSProperties;
  /**
   * Will be applied to every single thumbnail including the active one
   */
  thumb: React.CSSProperties;
  /**
   * Will be applied to the currently active slide's thumbnail
   */
  activeThumb: React.CSSProperties;
  /**
   * Will be applied to the indexIndicator span
   */
  indexIndicator: React.CSSProperties;
  /**
   * Will be applied to the container div of indicators
   */
  indicatorsContainer: React.CSSProperties;
  /**
   * Will be applied to every single indicator including the active one
   */
  indicator: React.CSSProperties;
  /**
   * Will be applied to the currently active slide's indicator
   */
  activeIndicator: React.CSSProperties;
  /**
   * Will be applied to the container div of the progressBar
   */
  progressBarContainer: React.CSSProperties;
  /**
   * Will be applied to the progressBar
   */
  progressBar: React.CSSProperties;
  /**
   * Will be applied to the previous button
   */
  previousButton: React.CSSProperties;
  /**
   * Will be applied to the next button
   */
  nextButton: React.CSSProperties;
  /**
   * Will be applied to the play & pause button
   */
  playButton: React.CSSProperties;
  /**
   * Will be applied to the close button of fullscreen mode
   */
  fullscreenCloseButton: React.CSSProperties;
  /**
   * Will be applied to the fullscreen & exit fullscreen button
   */
  fullscreenButton: React.CSSProperties;
}

interface Layout {
  /**
   * If set to false, slides will be removed from the DOM
   */
  slides: boolean;
  /**
   * If set to false, thumbs will be removed from the DOM
   */
  thumbs: boolean;
  /**
   * If set to false, next button will be removed from the DOM
   */
  nextButton: boolean;
  /**
   * If set to false, previous button will be removed from the DOM
   */
  previousButton: boolean;
  /**
   * If set to false, play button will be removed from the DOM
   */
  playButton: boolean;
  /**
   * If set to false, fullscreen button will be removed from the DOM
   */
  fullscreenButton: boolean;
  /**
   * If set to false, close button (while in fullscreen) will be removed from the DOM
   */
  fullscreenCloseButton: boolean;
  /**
   * If set to false, indexIndicator will be removed from the DOM
   */
  indexIndicator: boolean;
  /**
   * If set to false, indicators will be removed from the DOM
   */
  indicators: boolean;
  /**
   * If set to false, progressBar will be removed from the DOM
   */
  progressBar: boolean;
}

interface Handlers {
  /**
   * Callback function that will be executed when the user clicks the next button or the next method is fired.
   * @param currentIndex - Index of the current slide before going to the next one (starts from zero)
   */
  onNext: (currentIndex: number) => void;
  /**
   * Callback function that will be executed when the user clicks the previous button or the previous method is fired.
   * @param currentIndex - Index of the current slide before going to the previous one (starts from zero)
   */
  onPrevious: (currentIndex?: number) => void;
  /**
   * Callback function that will be executed when the user clicks an indicator.
   * @param index - Index of the clicked indicator (starts from zero)
   */
  onIndicatorClick: (index?: number) => void;
  /**
   * Callback function that will be executed when the user clicks a thumbnail.
   * @param index - Index of the clicked thumbnail (starts from zero)
   */
  onThumbClick: (index?: number) => void;
  /**
   * Callback function that will be executed when the user clicks the play button or the play method is fired.
   */
  onPlay: () => void;
  /**
   * Callback function that will be executed when the user clicks the pause button or the pause method is fired.
   */
  onPause: () => void;
  /**
   * Callback function that will be executed when the user slides to the next or previous slide by dragging the
   * current slide.
   * @param currentIndex - Index of the current slide before sliding to the next or previous slide (starts from zero)
   * @param type - Shows if the slider will slide to the next or previous slide (will be "next" or "previous")
   */
  onSlide: (currentIndex?: number, type?: "next" | "previous") => void;
  /**
   * Callback function that will be executed after current slide changes for any reason.
   * @param previousIndex - Index of the active slide before sliding (starts from zero)
   * @param currentIndex - Index of the active slide after sliding (starts from zero)
   * @param slidesCount - Count of total slides
   */
  onSlideChange: (previousIndex?: number, currentIndex?: number, slidesCount?: number) => void;
  /**
   * Callback function that will be executed when the user clicks the fullscreen button or the goFullscreen method is fired.
   */
  onFullscreen: () => void;
  /**
   * Callback function that will be executed when the user clicks the exit fullscreen button or the exitFullscreen method is
   * fired.
   */
  onFullscreenExit: () => void;
}

const defaultMainOptions: MainOptions = {
  height: "500px",
  width: "100%",
  thumbWidth: 120,
  thumbHeight: "20%",
  thumbMargin: 4,
  startIndex: 0,
  infinite: true,
  startFullscreen: false,
  useBrowserFullscreen: true,
  keyboardNavigation: true,
  transitionDuration: 0.45,
  repeatTransitionDuration: 2,
};

const defaultAdvancedOptions: AdvancedOptions = {
  hardwareAcceleration: true,
  slideStopPropagation: true,
  thumbStopPropagation: true,
  slidingSensitivity: 10,
  thumbsSlidingSensitivity: 10,
  transitionTimingFunction: "cubic-bezier(.1, .3, .5, 1)",
  thumbsTransitionTimingFunction: "cubic-bezier(.1, .3, .5, 1)",
};

const defaultSlideshowOptions: SlideshowOptions = {
  autoplay: false,
  playInterval: 3,
  stopOnPrev: false,
  pauseOnHover: false,
};

const defaultLazyOptions: LazyOptions = {
  enabled: false,
  preloadCount: 1,
  placeHolder: "Loading...",
  thumbPlaceHolder: "Loading thumb...",
};

const defaultClasses: Classes = {
  root: "Reslide__root",
  rootFullscreen: "Reslide__root--fullscreen",
  slidesRoot: "Reslide__slides-root",
  slidesContainer: "Reslide__slides-container",
  slide: "Reslide__slide",
  thumbsRoot: "Reslide__thumbs-root",
  thumbsContainer: "Reslide__thumbs-container",
  thumb: "Reslide__thumb",
  activeThumb: "Reslide__thumb--active",
  indexIndicator: "Reslide__index-indicator",
  indicatorsContainer: "Reslide__indicators-container",
  indicator: "Reslide__indicator",
  activeIndicator: "Reslide__indicator--active",
  progressBarContainer: "Reslide__progress-bar-container",
  progressBar: "Reslide__progress-bar",
  previousButton: "Reslide__previous-button",
  nextButton: "Reslide__next-button",
  playButton: "Reslide__play-button",
  fullscreenCloseButton: "Reslide__close-button--fullscreen",
  fullscreenButton: "Reslide__fullscreen-button",
};

const defaultStyles: Styles = {
  root: {},
  rootFullscreen: {},
  slidesRoot: {},
  slidesContainer: {},
  slide: {},
  thumbsRoot: {},
  thumbsContainer: {},
  thumb: {},
  activeThumb: {},
  indexIndicator: {},
  indicatorsContainer: {},
  indicator: {},
  activeIndicator: {},
  progressBarContainer: {},
  progressBar: {},
  previousButton: {},
  nextButton: {},
  playButton: {},
  fullscreenCloseButton: {},
  fullscreenButton: {},
};

const defaultLayout: Layout = {
  slides: true,
  thumbs: true,
  nextButton: true,
  previousButton: true,
  playButton: true,
  fullscreenButton: true,
  fullscreenCloseButton: true,
  indexIndicator: true,
  indicators: true,
  progressBar: true,
};

const defaultHandlers: Partial<Handlers> = {
  onNext: undefined,
  onPrevious: undefined,
  onIndicatorClick: undefined,
  onThumbClick: undefined,
  onPlay: undefined,
  onPause: undefined,
  onSlide: undefined,
  onSlideChange: undefined,
  onFullscreen: undefined,
  onFullscreenExit: undefined,
};

interface State {
  currentIndex: number;
  isPlaying: boolean;
  isFullscreen: boolean;
  slidesCount: number;
}

export interface Methods {
  /**
   * Get Current state of Slider component
   * @returns Slider's current state.
   */
  getState: () => State;
  /**
   * Goes to the next slide.
   */
  next: () => void;
  /**
   * Goes to the previous slide.
   */
  previous: () => void;
  /**
   * Goes to the specified slide.
   * @param index - Index of the slide you want to go to (starts from zero)
   */
  goto: (index: number) => void;
  /**
   * Starts playing the slideshow
   */
  play: () => void;
  /**
   * Pauses the slideshow.
   */
  pause: () => void;
  /**
   * Goes to fullscreen mode.
   */
  goFullscreen: () => void;
  /**
   * Exits from fullscreen mode
   */
  exitFullscreen: () => void;
}

interface Props {
  children?: React.ReactNode;
  /**
   * For providing custom thumbnails. By default it will use slides as thumbnails too.
   * Custom thumbnails are recommended in lazy loading mode, otherwise actual slides will be loaded when thumbnails
   * become visible to the user. Useful for setting custom thumbnails for videos.
   */
  thumbs?: React.ReactNode;
  /**
   * Used for testing purposes.
   * If set to true will set the isTestEnv context value to true in the slider and all sub-components.
   *
   * If you want to test something that depends on this component then you need to mock ResizeObserver and
   * IntersectionObserver too.
   * @default false
   */
  testing?: boolean;
  /** Main options */
  options?: Partial<MainOptions>;
  /** Advanced options */
  advanced?: Partial<AdvancedOptions>;
  /** Slideshow options */
  slideshow?: Partial<SlideshowOptions>;
  /** Lazy loading options */
  lazyLoading?: Partial<LazyOptions>;
  /** Set custom className for any element */
  classNames?: Partial<Classes>;
  /** Set custom inline style for any element*/
  styles?: Partial<Styles>;
  /** Set which slider elements to be removed from the DOM */
  layout?: Partial<Layout>;
  /** Callbacks to be called when specific slider events fire*/
  handlers?: Partial<Handlers>;
  /** Used for calling slider methods manually */
  ref?: React.ForwardedRef<Methods>;
}

/**
 * Full-featured slider component for react
 * @author [Abbas Hosseini](https://github.com/hosseini44444)
 */
export const Reslide = forwardRef<Methods, Props>(
  (
    {
      children,
      thumbs = children,
      testing = false,
      options = defaultMainOptions,
      advanced = defaultAdvancedOptions,
      slideshow = defaultSlideshowOptions,
      lazyLoading = defaultLazyOptions,
      classNames = defaultClasses,
      styles = defaultStyles,
      layout = defaultLayout,
      handlers = defaultHandlers,
    }: Props,
    ref
  ) => {
    const slidesCount = Children.count(children);
    const _options = useMemo(() => ({ ...defaultMainOptions, ...options }), [options]);
    const _advanced = useMemo(() => ({ ...defaultAdvancedOptions, ...advanced }), [advanced]);
    const _slideshow = useMemo(() => ({ ...defaultSlideshowOptions, ...slideshow }), [slideshow]);
    const _layout = useMemo(() => ({ ...defaultLayout, ...layout }), [layout]);
    const _handlers = useMemo(() => ({ ...defaultHandlers, ...handlers }), [handlers]);
    const _lazyOptions = useMemo(() => ({ ...defaultLazyOptions, ...lazyLoading }), [lazyLoading]);
    const _classes = useMemo(() => ({ ...defaultClasses, ...classNames }), [classNames]);
    const _styles = useMemo(() => ({ ...defaultStyles, ...styles }), [styles]);

    const [state, dispatch] = useSlidesReducer(
      ///// test to see if changing these options have an effect without refreshing
      slidesCount,
      _options.startIndex,
      _options.transitionDuration,
      _options.repeatTransitionDuration,
      _slideshow.autoplay,
      _options.startFullscreen,
      _options.infinite,
      _slideshow.stopOnPrev
    );
    const { currentIndex, isFullscreen, isPlaying } = state;

    const rootRef = useRef<HTMLDivElement>(null);
    const prevIndex = usePrevious(currentIndex);
    const handlePlay = useCallback(() => {
      _handlers.onPlay && _handlers.onPlay();
      dispatch(actions.play());
    }, [_handlers, dispatch]);

    const handlePause = useCallback(() => {
      _handlers.onPause && _handlers.onPause();
      dispatch(actions.pause());
    }, [_handlers, dispatch]);

    const handleGoFullscreen = useCallback(() => {
      _handlers.onFullscreen && _handlers.onFullscreen();
      _options.useBrowserFullscreen &&
        document.fullscreenEnabled &&
        rootRef.current &&
        rootRef.current.requestFullscreen();
      dispatch(actions.goFullscreen());
    }, [_options.useBrowserFullscreen, _handlers, dispatch]);

    const handleExitFullscreen = useCallback(() => {
      _handlers.onFullscreenExit && _handlers.onFullscreenExit();
      document.fullscreenElement && document.exitFullscreen();
      dispatch(actions.exitFullscreen());
    }, [_handlers, dispatch]);

    const handleNext = useCallback(() => {
      _handlers.onNext && _handlers.onNext(currentIndex);
      dispatch(actions.next());
    }, [_handlers, currentIndex, dispatch]);

    const handlePrevious = useCallback(() => {
      _handlers.onPrevious && _handlers.onPrevious(currentIndex);
      dispatch(actions.previous());
    }, [_handlers, currentIndex, dispatch]);

    useImperativeHandle(
      ref,
      () => ({
        getState: () => {
          const { transitionDuration, ...conciseState } = state;
          return { slidesCount, ...conciseState };
        },
        next: () => handleNext(),
        previous: () => handlePrevious(),
        goto: (index) => dispatch(actions.goto(index)),
        play: () => handlePlay(),
        pause: () => handlePause(),
        goFullscreen: () => handleGoFullscreen(),
        exitFullscreen: () => handleExitFullscreen(),
      }),
      [
        dispatch,
        slidesCount,
        state,
        handleNext,
        handlePrevious,
        handlePlay,
        handlePause,
        handleGoFullscreen,
        handleExitFullscreen,
      ]
    );

    const rootClassName = useMemo(
      () => (isFullscreen ? _classes.rootFullscreen : _classes.root),
      [isFullscreen, _classes.root, _classes.rootFullscreen]
    );

    const rootStyle = useMemo(
      () =>
        isFullscreen
          ? { ..._styles.rootFullscreen, height: "100%", width: "100%" }
          : { ..._styles.root, height: _options.height, width: _options.width },
      [isFullscreen, _styles.root, _styles.rootFullscreen, _options.height, _options.width]
    );

    const fullscreenCloseButtonClassName = useMemo(
      () => (isFullscreen ? _classes.fullscreenCloseButton : "Reslide__close-button"),
      [isFullscreen, _classes.fullscreenCloseButton]
    );

    const fullscreenCloseButtonStyle = useMemo(
      () => (isFullscreen ? _styles.fullscreenCloseButton : {}),
      [isFullscreen, _styles.fullscreenCloseButton]
    );

    const thumbsStyle = useMemo(
      () => ({ ..._styles.thumbsRoot, height: _options.thumbHeight }),
      [_styles.thumbsRoot, _options.thumbHeight]
    );

    const progress = useMemo(() => Math.round((currentIndex / (slidesCount - 1)) * 100), [currentIndex, slidesCount]);

    const slideProps = useMemo(
      () => ({
        className: _classes.slide,
        style: _styles.slide,
      }),
      [_classes.slide, _styles.slide]
    );

    const nextButtonProps = useMemo(
      () => ({
        infinite: _options.infinite,
        style: _styles.nextButton,
        className: _classes.nextButton,
        onClick: handleNext,
      }),
      [_options.infinite, _classes.nextButton, _styles.nextButton, handleNext]
    );

    const previousButtonProps = useMemo(
      () => ({
        infinite: _options.infinite,
        style: _styles.previousButton,
        className: _classes.previousButton,
        onClick: handlePrevious,
      }),
      [_options.infinite, _classes.previousButton, _styles.previousButton, handlePrevious]
    );

    const playButtonProps = useMemo(
      () => ({
        style: _styles.playButton,
        className: _classes.playButton,
        onClick: isPlaying ? handlePause : handlePlay,
      }),
      [_styles.playButton, _classes.playButton, handlePlay, handlePause, isPlaying]
    );

    const fullscreenButtonProps = useMemo(
      () => ({
        style: _styles.fullscreenButton,
        className: _classes.fullscreenButton,
        onClick: isFullscreen ? handleExitFullscreen : handleGoFullscreen,
      }),
      [isFullscreen, _styles.fullscreenButton, _classes.fullscreenButton, handleGoFullscreen, handleExitFullscreen]
    );

    useEffect(() => {
      if (isPlaying && !_options.infinite && currentIndex === slidesCount - 1) return dispatch(actions.pause());
      const timer = isPlaying
        ? window.setTimeout(() => dispatch(actions.next()), _slideshow.playInterval * 1000)
        : undefined;
      return () => clearTimeout(timer);
    }, [isPlaying, _options.infinite, slidesCount, _slideshow.playInterval, dispatch, currentIndex]);

    useEffect(() => {
      _handlers.onSlideChange &&
        prevIndex !== undefined &&
        prevIndex !== currentIndex &&
        _handlers.onSlideChange(prevIndex, currentIndex, slidesCount);
    }, [currentIndex, _handlers, slidesCount, prevIndex]);

    // To avoid bugs when some slides get removed and currentIndex is bigger than the updated slides' count
    useEffect(() => {
      currentIndex > slidesCount - 1 && dispatch(actions.goto(slidesCount - 1));
    }, [currentIndex, slidesCount, dispatch]);

    const contextValues = useMemo(
      () => ({ ...state, slidesCount, dispatch, isTestEnv: testing }),
      [state, slidesCount, dispatch, testing]
    );

    const fullscreenCloseButtonProps = useMemo(
      () => ({
        hide: !_layout.fullscreenCloseButton,
        className: fullscreenCloseButtonClassName,
        style: fullscreenCloseButtonStyle,
        onClick: handleExitFullscreen,
      }),
      [_layout.fullscreenCloseButton, fullscreenCloseButtonClassName, fullscreenCloseButtonStyle, handleExitFullscreen]
    );

    return (
      <Provider value={contextValues}>
        <Root
          ref={rootRef}
          className={rootClassName}
          style={rootStyle}
          keyboardNavigation={_options.keyboardNavigation}
          closeButtonProps={fullscreenCloseButtonProps}
        >
          <Slides
            hide={!_layout.slides}
            slides={children}
            transitionTimingFunction={_advanced.transitionTimingFunction}
            hardwareAcceleration={_advanced.hardwareAcceleration}
            slidingSensitivity={_advanced.slidingSensitivity}
            slideStopPropagation={_advanced.slideStopPropagation}
            lazyLoad={_lazyOptions.enabled}
            preloadCount={_lazyOptions.preloadCount}
            placeHolder={_lazyOptions.placeHolder}
            onSlide={_handlers.onSlide}
            pauseOnHover={_slideshow.pauseOnHover}
            className={_classes.slidesRoot}
            style={_styles.slidesRoot}
            containerClass={_classes.slidesContainer}
            containerStyle={_styles.slidesContainer}
            slideProps={slideProps}
          >
            <IndexIndicator
              hide={!_layout.indexIndicator}
              className={_classes.indexIndicator}
              style={_styles.indexIndicator}
            />
            <Controls
              hideNextButton={!_layout.nextButton}
              hidePreviousButton={!_layout.previousButton}
              hidePlayButton={!_layout.playButton}
              hideFullscreenButton={!_layout.fullscreenButton}
              {...{
                nextButtonProps,
                previousButtonProps,
                playButtonProps,
                fullscreenButtonProps,
              }}
            />
            <Indicators
              hide={!_layout.indicators}
              indicatorClass={_classes.indicator}
              indicatorStyle={_styles.indicator}
              activeIndicatorClass={_classes.activeIndicator}
              activeIndicatorStyle={_styles.activeIndicator}
              onIndicatorClick={_handlers.onIndicatorClick}
              className={_classes.indicatorsContainer}
              style={_styles.indicatorsContainer}
            />
            <ProgressBar
              progress={progress}
              hide={!_layout.progressBar}
              className={_classes.progressBar}
              style={_styles.progressBar}
              transitionTimingFunction={_advanced.transitionTimingFunction}
              hardwareAcceleration={_advanced.hardwareAcceleration}
              containerProps={{
                className: _classes.progressBarContainer,
                style: _styles.progressBarContainer,
              }}
            />
          </Slides>
          <Thumbs
            thumbs={thumbs}
            hide={!_layout.thumbs}
            thumbWidth={_options.thumbWidth}
            thumbMargin={_options.thumbMargin}
            thumbsTransitionTimingFunction={_advanced.thumbsTransitionTimingFunction}
            thumbsSlidingSensitivity={_advanced.thumbsSlidingSensitivity}
            hardwareAcceleration={_advanced.hardwareAcceleration}
            thumbClass={_classes.thumb}
            activeThumbClass={_classes.activeThumb}
            thumbStyle={_styles.thumb}
            activeThumbStyle={_styles.activeThumb}
            thumbStopPropagation={_advanced.thumbStopPropagation}
            onThumbClick={_handlers.onThumbClick}
            style={thumbsStyle}
            className={_classes.thumbsRoot}
            lazyLoad={_lazyOptions.enabled}
            placeHolder={_lazyOptions.thumbPlaceHolder}
            containerClass={_classes.thumbsContainer}
            containerStyle={_styles.thumbsContainer}
          />
        </Root>
      </Provider>
    );
  }
);

const MemorizedReslide = memo<Props>(Reslide, isEqual);

Reslide.displayName = "Reslide";

MemorizedReslide.displayName = "MemorizedReslide";

export default MemorizedReslide;
