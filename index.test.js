import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Slider from "./src/components/slider";

describe("[Slidish] methods", () => {
  let ref = { current: null },
    getByTestId,
    getByRole;
  beforeEach(() => {
    ({ getByRole, getByTestId } = render(
      <Slider ref={ref} testing>
        <span>1</span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    ));
  });
  afterEach(() => {
    ref.current = null;
  });
  it("should go to next or previous slide on calling next or previous methods", () => {
    const slidesContainer = getByTestId("slidesContainer");
    expect(slidesContainer.style.transform).toBe("translate3d(-0%,0,0)");
    act(() => ref.current.next());
    expect(slidesContainer.style.transform).toBe("translate3d(-100%,0,0)");
    act(() => ref.current.previous());
    expect(slidesContainer.style.transform).toBe("translate3d(-0%,0,0)");
  });
  it("should go to the specified slide on calling goto method", () => {
    const slidesContainer = getByTestId("slidesContainer");
    expect(slidesContainer.style.transform).toBe("translate3d(-0%,0,0)");
    act(() => ref.current.goto(2));
    expect(slidesContainer.style.transform).toBe("translate3d(-200%,0,0)");
  });
  it("should go fullscreen on calling goFullscreen and exit fullscreen on calling exitFullscreen", () => {
    const root = getByTestId("root");
    expect(root.classList.contains("Slidish__root")).toBe(true);
    expect(root.classList.contains("Slidish__root--fullscreen")).toBe(false);
    act(() => ref.current.goFullscreen());
    expect(root.classList.contains("Slidish__root--fullscreen")).toBe(true);
    expect(root.classList.contains("Slidish__root")).toBe(false);
    act(() => ref.current.exitFullscreen());
    expect(root.classList.contains("Slidish__root")).toBe(true);
    expect(root.classList.contains("Slidish__root--fullscreen")).toBe(false);
  });
  it("should change isPlaying state to true when calling play and change it to false when calling pause", () => {
    const playButton = getByRole("button", { name: "start slideshow" });
    jest.useFakeTimers();
    act(() => ref.current.play());
    expect(playButton.getAttribute("aria-label")).toBe("pause slideshow");
    act(() => ref.current.pause());
    expect(playButton.getAttribute("aria-label")).toBe("start slideshow");
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it("should return the current state of slider", () => {
    const defaultState = ref.current.getState();
    expect(defaultState).toMatchObject({
      currentIndex: 0,
      isPlaying: false,
      isFullscreen: false,
      slidesCount: 3,
    });
    act(() => ref.current.next());
    const updatedState = ref.current.getState();
    expect(updatedState).toMatchObject({ currentIndex: 1 });
  });
});

describe("[Slidish] functionality", () => {
  let slidesContainer,
    rerender,
    getByTestId,
    getAllByTestId,
    getByRole,
    getAllByRole,
    ref = { current: null };

  beforeEach(() => {
    ({ rerender, getByTestId, getAllByTestId, getByRole, getAllByRole } = render(
      <Slider testing ref={ref}>
        <span>1</span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    ));
    slidesContainer = getByTestId("slidesContainer");
  });

  afterEach(() => {
    ref.current = null;
  });

  it("should render 3 slides", () => {
    const slides = document.querySelectorAll(".Slidish__slide");
    expect(slides.length).toBe(3);
  });
  it("should go to next or previous slide on clicking the next or previous button", () => {
    const nextButton = getByRole("button", { name: "next slide" });
    const previousButton = getByRole("button", { name: "previous slide" });
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    userEvent.click(nextButton);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    userEvent.click(previousButton);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
    userEvent.click(previousButton);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    userEvent.click(nextButton);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
  });
  it("should go fullscreen on clicking the fullscreen button and vise versa", () => {
    const fullscreenButton = getByRole("button", { name: "go fullscreen" });
    let isFullscreen = ref.current.getState().isFullscreen;
    expect(isFullscreen).toBe(false);
    userEvent.click(fullscreenButton);
    isFullscreen = ref.current.getState().isFullscreen;
    expect(isFullscreen).toBe(true);
    userEvent.click(fullscreenButton);
    isFullscreen = ref.current.getState().isFullscreen;
    expect(isFullscreen).toBe(false);
  });
  it("should start playing slideshow on clicking the play button and vise versa", async () => {
    const playButton = getByRole("button", { name: "start slideshow" });
    jest.useFakeTimers("legacy");
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    userEvent.click(playButton);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    act(() => jest.advanceTimersByTime(3000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    act(() => jest.advanceTimersByTime(3000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    act(() => jest.advanceTimersByTime(3000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
    userEvent.click(playButton);
    act(() => jest.advanceTimersByTime(3000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
    act(() => jest.advanceTimersByTime(60000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
    expect(setTimeout).toHaveBeenCalledTimes(4);
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it("should go to the associated slide when clicking an indicator or pressing enter or space while indicator has focus", () => {
    const indicators = getAllByRole("button", { name: /slide indicator/ });
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    userEvent.click(indicators[2]);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    userEvent.click(indicators[1]);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    userEvent.click(indicators[0]);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
    indicators[2].focus();
    userEvent.type(indicators[2], "{enter}", { skipClick: true });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    indicators[1].focus();
    userEvent.type(indicators[1], " ", { skipClick: true });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    indicators[0].focus();
    userEvent.type(indicators[0], "b", { skipClick: true });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
  });
  it("should go to the associated slide when clicking a thumbnail", () => {
    const thumbs = getAllByRole("button", { name: /thumbnail/ });
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    userEvent.click(thumbs[2]);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    userEvent.click(thumbs[1]);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    userEvent.click(thumbs[0]);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
    thumbs[2].focus();
    userEvent.type(thumbs[2], "{enter}", { skipClick: true });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    thumbs[1].focus();
    userEvent.type(thumbs[1], " ", { skipClick: true });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    thumbs[2].focus();
    userEvent.type(thumbs[2], "any", { skipClick: true });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
  });
  it("should go to next or previous slide on pressing right or left key", () => {
    const root = getByTestId("root");
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    root.focus();
    userEvent.type(root, "{arrowright}");
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    userEvent.type(root, "{arrowleft}");
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
  });
  it("should go to next or previous slide on slide", () => {
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    fireEvent.mouseDown(slidesContainer, { clientX: 0 });
    fireEvent.mouseMove(slidesContainer, { clientX: -50 });
    expect(slidesContainer.style.transform).toBe("translate3d(-50%,0,0)");
    fireEvent.mouseUp(slidesContainer, { clientX: -70 });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    fireEvent.mouseDown(slidesContainer, { clientX: 0 });
    fireEvent.mouseMove(slidesContainer, { clientX: -50 });
    fireEvent.mouseUp(slidesContainer, { clientX: 20 });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
    fireEvent.touchStart(slidesContainer, { targetTouches: [{ clientX: 0 }] });
    fireEvent.touchMove(slidesContainer, { targetTouches: [{ clientX: -40 }] });
    expect(slidesContainer.style.transform).toBe("translate3d(-40%,0,0)");
    fireEvent.touchEnd(slidesContainer, { changedTouches: [{ clientX: -60 }] });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
  });
  it("shouldn't slide when mouse is not down and moving on or leaving the slidesContainer", () => {
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    fireEvent.mouseMove(slidesContainer, { clientX: -70 });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
    fireEvent.mouseLeave(slidesContainer);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
  });
  it("should pause on hover while pauseOnHover prop is true and slideshow is playing", () => {
    rerender(
      <Slider testing ref={ref} slideshow={{ pauseOnHover: true }}>
        <span>1</span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    );
    jest.useFakeTimers();
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    act(() => ref.current.play());
    act(() => jest.advanceTimersByTime(3000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    fireEvent.mouseOver(slidesContainer);
    act(() => jest.advanceTimersByTime(3000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    act(() => jest.advanceTimersByTime(3000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    fireEvent.mouseLeave(slidesContainer);
    act(() => jest.advanceTimersByTime(3000));
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it("discard slide's click event when slideStopPropagation prop is true", () => {
    rerender(
      <Slider testing ref={ref} advanced={{ slideStopPropagation: false }}>
        <span>
          <button data-testid="buttonInsideSlide" onClick={() => ref.current.goto(2)}>
            click me
          </button>
        </span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    );
    let testButton = getAllByTestId("buttonInsideSlide")[0];
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    userEvent.click(testButton);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    rerender(
      <Slider testing ref={ref} advanced={{ slideStopPropagation: true }}>
        <span>
          <button data-testid="buttonInsideSlide" onClick={() => ref.current.goto(1)}>
            click me
          </button>
        </span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    );
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
    testButton = getAllByTestId("buttonInsideSlide")[0];
    userEvent.click(testButton);
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(2);
  });
});

describe("[Slidish] event callbacks", () => {
  let ref = { current: null },
    getByTestId,
    slidesContainer,
    getByRole,
    getAllByRole;
  const onNext = jest.fn();
  const onPrevious = jest.fn();
  const onSlide = jest.fn();
  const onPlay = jest.fn();
  const onPause = jest.fn();
  const onFullscreen = jest.fn();
  const onFullscreenExit = jest.fn();
  const onIndicatorClick = jest.fn();
  const onThumbClick = jest.fn();
  beforeEach(() => {
    ({ getByRole, getByTestId, getAllByRole } = render(
      <Slider
        ref={ref}
        testing
        handlers={{
          onNext,
          onPrevious,
          onSlide,
          onPlay,
          onPause,
          onFullscreen,
          onFullscreenExit,
          onIndicatorClick,
          onThumbClick,
        }}
      >
        <span>1</span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    ));
    slidesContainer = getByTestId("slidesContainer");
  });
  afterEach(() => {
    ref.current = null;
  });
  it("Should call the event callbacks when clicking the corresponding buttons or calling the corresponding methods", () => {
    const nextButton = getByRole("button", { name: "next slide" });
    const previousButton = getByRole("button", { name: "previous slide" });
    const playButton = getByRole("button", { name: "start slideshow" });
    const fullscreenButton = getByRole("button", { name: "go fullscreen" });
    const indicator = getAllByRole("button", { name: /slide indicator/ })[2];
    const thumbnail = getAllByRole("button", { name: /thumbnail/ })[1];
    userEvent.click(nextButton);
    expect(onNext).toBeCalledTimes(1);
    userEvent.click(previousButton);
    expect(onPrevious).toBeCalledTimes(1);
    userEvent.click(playButton);
    expect(onPlay).toBeCalledTimes(1);
    userEvent.click(playButton);
    expect(onPlay).toBeCalledTimes(1);
    expect(onPause).toBeCalledTimes(1);
    userEvent.click(fullscreenButton);
    expect(onFullscreen).toBeCalledTimes(1);
    userEvent.click(fullscreenButton);
    expect(onFullscreen).toBeCalledTimes(1);
    expect(onFullscreenExit).toBeCalledTimes(1);
    userEvent.click(indicator);
    expect(onIndicatorClick).toBeCalledTimes(1);
    userEvent.click(thumbnail);
    expect(onThumbClick).toBeCalledTimes(1);
    fireEvent.mouseDown(slidesContainer, { clientX: 0 });
    fireEvent.mouseMove(slidesContainer, { clientX: -50 });
    fireEvent.mouseUp(slidesContainer, { clientX: -70 });
    expect(onSlide).toBeCalledTimes(1);
  });
});

describe("[Slidish] thumbnails functionality", () => {
  let thumbsContainer,
    rerender,
    getByTestId,
    getAllByRole,
    ref = { current: null };
  beforeEach(() => {
    ({ rerender, getByTestId, getAllByRole } = render(
      <Slider testing ref={ref}>
        <span>1</span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    ));
    thumbsContainer = getByTestId("thumbsContainer");
  });

  afterEach(() => {
    ref.current = null;
  });

  it("should move to the desired slide on thumbnails' slide", () => {
    let { currentIndex } = ref.current.getState();
    expect(currentIndex).toBe(0);
    fireEvent.mouseDown(thumbsContainer, { clientX: 0 });
    fireEvent.mouseMove(thumbsContainer, { clientX: -50 });
    fireEvent.mouseUp(thumbsContainer, { clientX: -70 });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(1);
    fireEvent.mouseDown(thumbsContainer, { clientX: 0 });
    fireEvent.mouseMove(thumbsContainer, { clientX: 50 });
    fireEvent.mouseUp(thumbsContainer, { clientX: 70 });
    ({ currentIndex } = ref.current.getState());
    expect(currentIndex).toBe(0);
  });

  it("should render placeHolder when thumbnail is not in view in lazy mode", () => {
    class IntersectionObserver {
      constructor(cb) {
        cb([{ isIntersecting: false }]);
      }
      observe() {}
      disconnect() {}
    }
    global.IntersectionObserver = IntersectionObserver;
    rerender(
      <Slider testing ref={ref} lazyLoading={{ enabled: true, thumbPlaceHolder: "loading" }}>
        <span>1</span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    );
    const thumbnail = getAllByRole("button", { name: /thumbnail/ })[0];
    expect(thumbnail).toHaveTextContent("loading");
  });

  it("should render original content when thumbnail is in view in lazy mode", () => {
    class IntersectionObserver {
      constructor(cb) {
        cb([{ isIntersecting: true }]);
      }
      observe() {}
      disconnect() {}
    }
    global.IntersectionObserver = IntersectionObserver;
    rerender(
      <Slider testing ref={ref} lazyLoading={{ enabled: true, thumbPlaceHolder: "loading" }}>
        <span>1</span>
        <iframe title="iframe">2</iframe>
        <div>3</div>
      </Slider>
    );
    const thumbnail = getAllByRole("button", { name: /thumbnail/ })[0];
    expect(thumbnail).toContainHTML("<span>1</span>");
  });
});

describe("[Slidish] Layout", () => {
  let rerender,
    getByTestId,
    getAllByRole,
    getByRole,
    getByText,
    queryByText,
    queryByRole,
    queryAllByRole,
    queryByTestId;
  beforeEach(() => {
    ({
      rerender,
      getByTestId,
      getAllByRole,
      getByRole,
      getByText,
      queryByText,
      queryByRole,
      queryAllByRole,
      queryByTestId,
    } = render(
      <Slider testing options={{ startFullscreen: true }}>
        <span>1</span>
        <span>2</span>
        <div>3</div>
      </Slider>
    ));
  });
  it("should render all components by default", () => {
    const fsButtons = getAllByRole("button", { name: "exit fullscreen" });
    expect(fsButtons).toHaveLength(2);
    const nextButton = getByRole("button", { name: "next slide" });
    const prevButton = getByRole("button", { name: "previous slide" });
    const playButton = getByRole("button", { name: "start slideshow" });
    const indexIndicator = getByText("1 / 3");
    const indicators = getAllByRole("button", { name: /slide indicator/, exact: false });
    expect(indicators).toHaveLength(3);
    const progressBar = getByTestId("progressBar");
    const slidesContainer = getByTestId("slidesContainer");
    const thumbsRoot = getByTestId("thumbsRoot");
  });
  it("should not render any components when all layout prop keys are set to false", () => {
    rerender(
      <Slider
        testing
        options={{ startFullscreen: true }}
        layout={{
          fullscreenButton: false,
          fullscreenCloseButton: false,
          indexIndicator: false,
          indicators: false,
          nextButton: false,
          previousButton: false,
          playButton: false,
          slides: false,
          thumbs: false,
          progressBar: false,
        }}
      >
        <span>1</span>
        <span>2</span>
        <div>3</div>
      </Slider>
    );
    const fsButtons = queryAllByRole("button", { name: "exit fullscreen" });
    expect(fsButtons).toHaveLength(0);
    const nextButton = queryByRole("button", { name: "next slide" });
    const prevButton = queryByRole("button", { name: "previous slide" });
    const playButton = queryByRole("button", { name: "start slideshow" });
    const indexIndicator = queryByText("1 / 3");
    const indicators = queryAllByRole("button", { name: /slide indicator/, exact: false });
    expect(indicators).toHaveLength(0);
    const progressBar = queryByTestId("progressBar");
    const slidesContainer = queryByTestId("slidesContainer");
    const thumbsRoot = queryByTestId("thumbsRoot");
    const isEverythingNull = [
      nextButton,
      prevButton,
      playButton,
      indexIndicator,
      progressBar,
      slidesContainer,
      thumbsRoot,
    ].every((i) => i === null);
    expect(isEverythingNull).toBe(true);
  });
});

describe("[Slidish] Hardware acceleration", () => {
  it("shouldn't contain ant translate3d transformations when hardware acceleration is not set", () => {
    const { getByTestId } = render(
      <Slider advanced={{ hardwareAcceleration: false }}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Slider>
    );
    const slidesContainer = getByTestId("slidesContainer");
    const progressBar = getByTestId("progressBar").firstChild;
    const thumbsContainer = getByTestId("thumbsContainer");
    expect(slidesContainer.style.transform).toMatch(/translate/);
    expect(thumbsContainer.style.transform).toMatch(/translate/);
    expect(progressBar.style.transform).toMatch(/translate/);    
    expect(slidesContainer.style.transform).not.toMatch(/translate3d/);
    expect(thumbsContainer.style.transform).not.toMatch(/translate3d/);
    expect(progressBar.style.transform).not.toMatch(/translate3d/);    
  });
});
