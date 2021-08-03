You can specify the event handlers using the `handlers` prop which is an object with the following keys:

| key              | type                                                                          | default value | explanation                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onNext           | (currentIndex?: number) => void                                               | undefined     | Callback function that will be executed when the user clicks the next button or the next method is fired. @param currentIndex - Index of the current slide before going to the next one (starts from zero)                                                                                                                                            |
| onPrevious       | (currentIndex?: number) => void                                               | undefined     | Callback function that will be executed when the user clicks the previous button or the previous method is fired. @param currentIndex - Index of the current slide before going to the previous one (starts from zero)                                                                                                                                |
| onIndicatorClick | (index?: number) => void                                                      | undefined     | Callback function that will be executed when the user clicks an indicator. @param index - Index of the clicked indicator (starts from zero)                                                                                                                                                                                                           |
| onThumbClick     | (index?: number) => void                                                      | undefined     | Callback function that will be executed when the user clicks a thumbnail. @param index - Index of the clicked thumbnail (starts from zero)                                                                                                                                                                                                            |
| onPlay           | () => void                                                                    | undefined     | Callback function that will be executed when the user clicks the play button or the play method is fired.                                                                                                                                                                                                                                             |
| onPause          | () => void                                                                    | undefined     | Callback function that will be executed when the user clicks the pause button or the pause method is fired.                                                                                                                                                                                                                                           |
| onSlide          | (currentIndex?: number, type?: "next" \| "previous") => void                  | undefined     | Callback function that will be executed when the user slides to the next or previous slide by dragging the current slide. @param currentIndex - Index of the current slide before sliding to the next or previous slide (starts from zero). @param type - Shows if the slider will slide to the next or previous slide (will be "next" or "previous") |
| onSlideChange    | (previousIndex?: number, currentIndex?: number, slidesCount?: number) => void | undefined     | Callback function that will be executed after current slide changes for any reason. @param previousIndex - Index of the active slide before sliding (starts from zero). @param currentIndex - Index of the active slide after sliding (starts from zero). @param slidesCount - Count of total slides                                                  |
| onFullscreen     | () => void                                                                    | undefined     | Callback function that will be executed when the user clicks the fullscreen button or the goFullscreen method is fired.                                                                                                                                                                                                                               |
| onFullscreenExit | () => void                                                                    | undefined     | Callback function that will be executed when the user clicks the exit fullscreen button or the exitFullscreen method is fired.                                                                                                                                                                                                                        |

**_handlers are set in the following example_**

Click on the `VIEW CODE` button below the example and view and edit the full code using the live code editor

```jsx
import React, { useState, useCallback } from "react";
import Slidish from "slidish";
import "slidish/style.css";

const Example = () => {
  const [state, setState] = useState("Slidish is mounted!");
  const [change, setChange] = useState("\nStart changing slides");
  const nextHandler = useCallback((ci) => setState(`Went to the next slide from the slide at index ${ci}`), []);
  const previousHandler = useCallback((ci) => setState(`Went to the previous slide from the slide at index ${ci}`), []);
  const indicatorClickHandler = useCallback((i) => setState(`Clicked on indicator at index ${i}`), []);
  const thumbClickHandler = useCallback((i) => setState(`Clicked on thumb at index ${i}`), []);
  const playHandler = useCallback(() => setState(`Slideshow started`), []);
  const pauseHandler = useCallback(() => setState(`Slideshow paused`), []);
  const fullscreenHandler = useCallback(() => setState(`Went Fullscreen`), []);
  const fullscreenExitHandler = useCallback(() => setState(`Exited Fullscreen`), []);
  const slideHandler = useCallback(
    (ci, type) => setState(`Slided from the slide at index ${ci} to the ${type} slide`),
    []
  );
  const slideChangeHandler = useCallback(
    (pi, ci, sc) => setChange(`${sc} slides, Latest change: From index ${pi} to index ${ci}`),
    []
  );
  return (
    <>
      <Slidish
        handlers={{
          onNext: nextHandler,
          onPrevious: previousHandler,
          onIndicatorClick: indicatorClickHandler,
          onThumbClick: thumbClickHandler,
          onPlay: playHandler,
          onPause: pauseHandler,
          onFullscreen: fullscreenHandler,
          onFullscreenExit: fullscreenExitHandler,
          onSlide: slideHandler,
          onSlideChange: slideChangeHandler,
        }}
      >
        <span style={{ fontSize: "2rem" }}>1</span>
        <span style={{ fontSize: "2rem" }}>2</span>
        <span style={{ fontSize: "2rem" }}>3</span>
        <span style={{ fontSize: "2rem" }}>4</span>
        <span style={{ fontSize: "2rem" }}>5</span>
      </Slidish>
      <div
        style={{
          backgroundColor: "#357",
          color: "#fff",
          padding: "10px",
          fontFamily: "sans-serif",
          fontSize: "1.2rem",
          lineHeight: "2rem",
        }}
      >
        {state}
        <br />
        {change}
      </div>
    </>
  );
};

<Example />;
```

<a class="previous-section" href="#/Documentation/Lazy%20Loading">Lazy Loading</a>
<a class="next-section" href="#/Documentation/Methods">Methods</a>
