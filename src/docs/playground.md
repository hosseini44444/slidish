### Basic - Using default settings (No props are set)

"Click on the `VIEW CODE` button below the example and view and edit the full code using the live code editor",

```jsx
import React from "react";
import Slidish from "slidish";
import "slidish/style.css";

<Slidish>
  <img src="images/1.jpg" alt="space shuttle failure" />
  <img src="images/2.jpg" alt="space shuttle lunch" />
  <img src="images/3.jpg" alt="space shuttle lunch 2" />
  <img src="images/4.jpg" alt="North America's night from above" />
  <img src="images/5.jpg" alt="astronomical image 1" />
  <img src="images/6.jpg" alt="astronomical image 2" />
  <img src="images/7.jpg" alt="astronomical image 3" />
  <img src="images/8.jpg" alt="astronomical image 4" />
  <img src="images/9.jpg" alt="astronomical image 5" />
</Slidish>;
```

### Advanced - Pre-populated with default props (except thumbs and ref)

Click on the `VIEW CODE` button below the example and view and edit the full code using the live code editor

```jsx
import React, { useRef, useState } from "react";
import Slidish from "slidish";
import "slidish/style.css";

const Example = () => {
  const slidishRef = useRef(null);
  const [slidishState, setSlidishState] = useState(null);
  const bStyle = {
    display: "inline-block",
    padding: "10px 15px",
    margin: "5px",
    border: "2px solid #0a6",
    backgroundColor: "#fff",
    cursor: "pointer",
  };
  return (
    <React.Fragment>
      <Slidish
        ref={slidishRef}
        layout={{
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
        }}
        options={{
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
        }}
        advanced={{
          hardwareAcceleration: true,
          slideStopPropagation: true,
          thumbStopPropagation: true,
          slidingSensitivity: 10,
          thumbsSlidingSensitivity: 10,
          transitionTimingFunction: "cubic-bezier(.1, .3, .5, 1)",
          thumbsTransitionTimingFunction: "cubic-bezier(.1, .3, .5, 1)",
        }}
        slideshow={{
          autoplay: false,
          playInterval: 3,
          stopOnPrev: false,
          pauseOnHover: false,
        }}
        lazyLoading={{
          enabled: false,
          preloadCount: 1,
          placeHolder: "Loading...",
          thumbPlaceHolder: "Loading thumb...",
        }}
        handlers={{
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
        }}
        classNames={{
          root: "Slidish__root",
          rootFullscreen: "Slidish__root--fullscreen",
          slidesRoot: "Slidish__slides-root",
          slidesContainer: "Slidish__slides-container",
          slide: "Slidish__slide",
          thumbsRoot: "Slidish__thumbs-root",
          thumbsContainer: "Slidish__thumbs-container",
          thumb: "Slidish__thumb",
          activeThumb: "Slidish__thumb--active",
          indexIndicator: "Slidish__index-indicator",
          indicatorsContainer: "Slidish__indicators-container",
          indicator: "Slidish__indicator",
          activeIndicator: "Slidish__indicator--active",
          progressBarContainer: "Slidish__progress-bar-container",
          progressBar: "Slidish__progress-bar",
          previousButton: "Slidish__previous-button",
          nextButton: "Slidish__next-button",
          playButton: "Slidish__play-button",
          fullscreenCloseButton: "Slidish__close-button--fullscreen",
          fullscreenButton: "Slidish__fullscreen-button",
        }}
        styles={{
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
        }}
        thumbs={[
          <span style={{ color: "#08d" }}>1</span>,
          <span style={{ color: "#08d" }}>2</span>,
          <span style={{ color: "#08d" }}>3</span>,
          <span style={{ color: "#08d" }}>4</span>,
          <span style={{ color: "#08d" }}>5</span>,
          <span style={{ color: "#08d" }}>6</span>,
          <span style={{ color: "#08d" }}>7</span>,
          <span style={{ color: "#08d" }}>8</span>,
          <span style={{ color: "#08d" }}>9</span>,
        ]}
      >
        <img src="images/1.jpg" alt="space shuttle failure" />
        <img src="images/2.jpg" alt="space shuttle lunch" />
        <img src="images/3.jpg" alt="space shuttle lunch 2" />
        <img src="images/4.jpg" alt="North America's night from above" />
        <img src="images/5.jpg" alt="astronomical image 1" />
        <img src="images/6.jpg" alt="astronomical image 2" />
        <img src="images/7.jpg" alt="astronomical image 3" />
        <img src="images/8.jpg" alt="astronomical image 4" />
        <img src="images/9.jpg" alt="astronomical image 5" />
      </Slidish>

      <button style={bStyle} onClick={() => slidishRef.current.next()}>
        NEXT SLIDE
      </button>
      <button style={bStyle} onClick={() => slidishRef.current.previous()}>
        PREVIOUS SLIDE
      </button>
      <button style={bStyle} onClick={() => slidishRef.current.goto(4)}>
        GO TO 5TH SLIDE
      </button>
      <button style={bStyle} onClick={() => slidishRef.current.play()}>
        START SLIDESHOW
      </button>
      <button style={bStyle} onClick={() => slidishRef.current.pause()}>
        PAUSE SLIDESHOW
      </button>
      <button style={bStyle} onClick={() => slidishRef.current.goFullscreen()}>
        GO FULLSCREEN
      </button>
      <button style={bStyle} onClick={() => setSlidishState(JSON.stringify(slidishRef.current.getState()))}>
        GET STATE
      </button>

      {slidishState && <div>Latest grabbed state: {slidishState}</div>}
    </React.Fragment>
  );
};
<Example />;
```

<a href="#/Fancy%20Demo"
style="display: inline-block; padding: 10px 15px; border: 2px solid #06d; margin: 0 10px 10px 0; font-family: sans-serif; font-weight: bold;">
FANCY DEMO</a>
<a href="#/Documentation/Getting%20Started"
style="display: inline-block; padding: 10px 15px; border: 2px solid #06d;
font-family: sans-serif; font-weight: bold;">Getting Started</a>
