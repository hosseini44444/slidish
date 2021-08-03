import { useEffect, useRef, useState } from "react";
import YTPlayer from "react-youtube";

import Slider from "components/slider";
import classes from "./App.module.scss";

import type { Methods } from "components/slider";

const App: React.FC<{}> = function () {
  const slidishRef = useRef<Methods>(null);
  const youtubePlayer = useRef<YT.Player | null>(null);
  const [stopOnPrev, setStopOnPrev] = useState(true);
  const [showSlider, setShowSlider] = useState(true);
  const [thumbs, setThumbs] = useState<number[]>([]);

  const slidesCount = slidishRef.current?.getState().slidesCount;

  // useEffect(
  //   () =>
  //     setThumbs(
  //       Array(slidesCount)
  //         .fill(1)
  //         .map((d, i) => i)
  //     ),
  //   [slidesCount]
  // );

  return (
    <>
      {showSlider ? (
        <Slider
          ref={slidishRef}
          layout={
            {
              // slides: true,
              // thumbs: false,
              // nextButton: false,
              // previousButton: false,
              // playButton: false,
              // fullscreenButton: false,
              // fullscreenCloseButton: false,
              // indexIndicator: false,
              // indicators: false,
              // progressBar: false,
            }
          }
          options={
            {
              // height: "400px",
              // thumbWidth: 150,
              // thumbHeight: "30%",
              thumbMargin: 10,
              // startIndex: 1,
              // infinite: false,
              // startFullscreen: true,
              // useBrowserFullscreen: false,
              // keyboardNavigation: false,
              // transitionDuration: 1,
              // repeatTransitionDuration: 4,
            }
          }
          handlers={{
            // onNext: (ci) => console.log(ci),
            // onPrevious: (ci) => console.log(ci),
            // onSlide: (ci, t) => console.log("slide", ci, t),
            onSlideChange: (pi, ci, sc) => {
              ci === 0 ? youtubePlayer.current?.playVideo() : youtubePlayer.current?.pauseVideo();
              console.log("slide changed", pi, ci, sc);
            },
            // onIndicatorClick: (i) => console.log("indicator", i),
            // onThumbClick: (i) => console.log("thumb", i),
            // onPlay: () => console.log("Started the slideshow"),
            // onPause: () => console.log("slideshow paused"),
            // onFullscreen: () => console.log("Entered fullscreen mode"),
            // onFullscreenExit: () => console.log("Exited fullscreen mode"),
          }}
          advanced={{
            // hardwareAcceleration: false,
            slideStopPropagation: false,
            thumbStopPropagation: false,
            // slidingSensitivity: 150,
            // thumbsSlidingSensitivity: 50,
            // transitionTimingFunction: "cubic-bezier(0.5,1.5,0.5,1.5)",
            // thumbsTransitionTimingFunction: "cubic-bezier(.53,-0.78,.41,1.09)",
          }}
          slideshow={{
            // autoplay: true,
            // playInterval: 5,
            stopOnPrev: stopOnPrev,
            // pauseOnHover: true,
          }}
          lazyLoading={
            {
              // enabled: true,
              // preloadCount: 0,
              // placeHolder: "Slide PlaceHolder",
              // thumbPlaceHolder: "Thumb PlaceHolder",
            }
          }
          classNames={{
            root: classes["Slidish__root"],
            rootFullscreen: classes["Slidish__root--fullscreen"],
            slidesRoot: classes["Slidish__slides-root"],
            slidesContainer: classes["Slidish__slides-container"],
            slide: classes["Slidish__slide"],
            thumbsRoot: classes["Slidish__thumbs-root"],
            thumbsContainer: classes["Slidish__thumbs-container"],
            thumb: classes["Slidish__thumb"],
            activeThumb: classes["Slidish__thumb--active"],
            indexIndicator: classes["Slidish__index-indicator"],
            indicatorsContainer: classes["Slidish__indicators-container"],
            indicator: classes["Slidish__indicator"],
            activeIndicator: classes["Slidish__indicator--active"],
            progressBarContainer: classes["Slidish__progress-bar-container"],
            progressBar: classes["Slidish__progress-bar"],
            previousButton: classes["Slidish__previous-button"],
            nextButton: classes["Slidish__next-button"],
            playButton: classes["Slidish__play-button"],
            fullscreenCloseButton: classes["Slidish__close-button--fullscreen"],
            fullscreenButton: classes["Slidish__fullscreen-button"],
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
          // thumbs={thumbs}
        >
          {/* <YTPlayer
            videoId={"Qx_c1X3zfEc"}
            opts={{ height: "100%", width: "100%", playerVars: { controls: 1, rel: 0 } }}
            containerClassName={classes.YTContainer}
            className={classes.YTPlayer}
            onReady={(event: YT.PlayerEvent) => {
              const player = event.target;
              youtubePlayer.current = player;
            }}
            onEnd={() => youtubePlayer.current?.stopVideo() && slidishRef.current?.next()}
          /> */}
          <img src="images/1.jpg" className={classes.image} alt="" />
          <img src="images/2.jpg" className={classes.image} alt="" />
          <img src="images/3.jpg" className={classes.image} alt="" />
          <img src="images/4.jpg" className={classes.image} alt="" />
          <img src="images/5.jpg" className={classes.image} alt="" />
          <img src="images/6.jpg" className={classes.image} alt="" />
          <img src="images/7.jpg" className={classes.image} alt="" />
          <img src="images/8.jpg" className={classes.image} alt="" />
          <img src="images/9.jpg" className={classes.image} alt="" />
          {/* <a href="https://www.npmjs.com/~hosseini44444">I&apos;m a link</a>
          <span className={classes.notImg}>span 1</span>
          <span className={classes.notImg}>span 2</span>
          <span className={classes.notImg} onClick={() => alert("span 1")}>
            I&apos;m a span. click me please!
          </span>
          <span className={classes.notImg} style={{ fontSize: 360, color: "red" }}>
            overflowed content
          </span>
          <button onClick={() => slidishRef.current?.exitFullscreen()}>EXIT FULLSCREEN</button> */}
        </Slider>
      ) : null}
      {/* <button onClick={() => slidishRef.current?.next()}>NEXT</button>
      <button onClick={() => slidishRef.current?.previous()}>BACK</button>
      <button onClick={() => slidishRef.current?.play()}>PLAY</button>
      <button onClick={() => slidishRef.current?.pause()}>PAUSE</button>
      <button onClick={() => slidishRef.current?.goFullscreen()}>GO FULLSCREEN</button>
      <button onClick={() => console.log(slidishRef.current?.getState())}>GET STATE</button>
      <button onClick={() => setStopOnPrev(!stopOnPrev)}>TOGGLE STOP ON PREV</button>
      <button onClick={() => setShowSlider(!showSlider)}>TOGGLE SLIDER COMPONENT</button> */}
    </>
  );
};

export default App;
