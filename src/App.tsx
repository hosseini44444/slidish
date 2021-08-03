import { useEffect, useRef, useState } from "react";
import YTPlayer from "react-youtube";

import Slider from "components/slider";
import classes from "./App.module.scss";

import type { Methods } from "components/slider";

const App: React.FC<{}> = function () {
  const reslideRef = useRef<Methods>(null);
  const youtubePlayer = useRef<YT.Player | null>(null);
  const [stopOnPrev, setStopOnPrev] = useState(true);
  const [showSlider, setShowSlider] = useState(true);
  const [thumbs, setThumbs] = useState<number[]>([]);

  const slidesCount = reslideRef.current?.getState().slidesCount;

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
          ref={reslideRef}
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
            root: classes["Reslide__root"],
            rootFullscreen: classes["Reslide__root--fullscreen"],
            slidesRoot: classes["Reslide__slides-root"],
            slidesContainer: classes["Reslide__slides-container"],
            slide: classes["Reslide__slide"],
            thumbsRoot: classes["Reslide__thumbs-root"],
            thumbsContainer: classes["Reslide__thumbs-container"],
            thumb: classes["Reslide__thumb"],
            activeThumb: classes["Reslide__thumb--active"],
            indexIndicator: classes["Reslide__index-indicator"],
            indicatorsContainer: classes["Reslide__indicators-container"],
            indicator: classes["Reslide__indicator"],
            activeIndicator: classes["Reslide__indicator--active"],
            progressBarContainer: classes["Reslide__progress-bar-container"],
            progressBar: classes["Reslide__progress-bar"],
            previousButton: classes["Reslide__previous-button"],
            nextButton: classes["Reslide__next-button"],
            playButton: classes["Reslide__play-button"],
            fullscreenCloseButton: classes["Reslide__close-button--fullscreen"],
            fullscreenButton: classes["Reslide__fullscreen-button"],
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
            onEnd={() => youtubePlayer.current?.stopVideo() && reslideRef.current?.next()}
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
          <button onClick={() => reslideRef.current?.exitFullscreen()}>EXIT FULLSCREEN</button> */}
        </Slider>
      ) : null}
      {/* <button onClick={() => reslideRef.current?.next()}>NEXT</button>
      <button onClick={() => reslideRef.current?.previous()}>BACK</button>
      <button onClick={() => reslideRef.current?.play()}>PLAY</button>
      <button onClick={() => reslideRef.current?.pause()}>PAUSE</button>
      <button onClick={() => reslideRef.current?.goFullscreen()}>GO FULLSCREEN</button>
      <button onClick={() => console.log(reslideRef.current?.getState())}>GET STATE</button>
      <button onClick={() => setStopOnPrev(!stopOnPrev)}>TOGGLE STOP ON PREV</button>
      <button onClick={() => setShowSlider(!showSlider)}>TOGGLE SLIDER COMPONENT</button> */}
    </>
  );
};

export default App;
