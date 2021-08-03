**_Enjoy the following slideshow to the fullest extent by enabling the fullscreen mode!_**

Click on the `VIEW CODE` button below the example and view and edit the full code using the live code editor

```jsx
import classes from "src/App.module.scss";

<Slidish
  slideshow={{ autoplay: true }}
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
>
  <img src="images/1.jpg" className={classes.image} alt="" />
  <img src="images/2.jpg" className={classes.image} alt="" />
  <img src="images/3.jpg" className={classes.image} alt="" />
  <img src="images/4.jpg" className={classes.image} alt="" />
  <img src="images/5.jpg" className={classes.image} alt="" />
  <img src="images/6.jpg" className={classes.image} alt="" />
  <img src="images/7.jpg" className={classes.image} alt="" />
  <img src="images/8.jpg" className={classes.image} alt="" />
  <img src="images/9.jpg" className={classes.image} alt="" />
</Slidish>;
```

<a href="#/Playground"
style="display: inline-block; padding: 10px 15px; border: 2px solid #06d; margin: 0 10px 20px 0; font-family: sans-serif; font-weight: bold;">
PLAYGROUND</a>
<a href="#/Documentation/Getting%20Started"
style="display: inline-block; padding: 10px 15px; border: 2px solid #06d;
font-family: sans-serif; font-weight: bold;">Getting Started</a>

src/App.module.scss

```scss
// do not remove width: 100% props (ae used for positioning reasons)

$film-color: #3e0f06;

@keyframes beat {
  0% {
    transform: scale(0, 0);
  }
  50% {
    transform: scale(2, 2);
  }
  100% {
    transform: scale(0.85, 0.85);
  }
}
@keyframes simple {
  0% {
    transform: scale(0, 0);
  }
  100% {
    transform: scale(1.5, 1.5);
  }
}

@keyframes cinema {
  0% {
    transform: translate3d(0%, 0, 0);
  }
  10% {
    transform: translate3d(25%, 0, 0);
  }
  17% {
    transform: translate3d(21%, 0, 0);
  }
  33% {
    transform: translate3d(34%, 0, 0);
  }
  39% {
    transform: translate3d(11%, 0, 0);
  }
  54% {
    transform: translate3d(77%, 0, 0);
  }
  60% {
    transform: translate3d(45%, 0, 0);
  }
  68% {
    transform: translate3d(90%, 0, 0);
  }
  85% {
    transform: translate3d(40%, 0, 0) rotate3d(0, 0, 10deg);
  }
  90% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 10deg);
  }
  100% {
    transform: translate3d(60%, 0, 0) rotate3d(0, 0, 10deg);
  }
}

@keyframes shadow {
  0% {
    box-shadow: inset 0px 0px 25px 0px #000d;
  }
  20% {
    box-shadow: inset 0px 0px 30px 5px #000d;
  }
  40% {
    box-shadow: inset 0px 0px 30px 5px #000d;
  }
  65% {
    box-shadow: inset 0px 0px 300px 5px #000d;
  }
  90% {
    box-shadow: inset 0px 0px 25px 0px #000d;
  }
}

%focus-effect {
  &:active,
  &:focus-visible,
  &:focus {
    outline: none;
    overflow: hidden;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -50%;
      margin-top: -50%;
      width: 100%;
      padding-top: 100%;
      border-radius: 50%;
      transform: scale(0, 0);
      background-color: #fff5;
    }
  }
  &:focus-visible {
    &::after {
      animation: beat 1s ease-out infinite alternate !important;
    }
  }
  &:focus {
    &::after {
      animation: simple 0.3s cubic-bezier(0.55, 0.38, 0.67, 0.99) 1;
    }
  }
  &:active {
    &::after {
      animation: none;
    }
  }
}

%button {
  display: block;
  width: 48px;
  height: 48px;
  position: absolute;
  background: #0004;
  border: none;
  padding: 2px;
  fill: #fff;
  outline: none;
  cursor: pointer;
  z-index: 1;
  @extend %focus-effect;
}

%noise {
  overflow: hidden;
  &::before {
    pointer-events: none;
    content: "";
    display: block;
    width: 100%;
    height: calc(100% - 120px);
    border-left: 3px double #fff8;
    position: absolute;
    top: 0;
    left: 0;
    animation: cinema 1.5s steps(1) 1s infinite alternate both;
    z-index: 1;
  }
  &::after {
    pointer-events: none;
    content: "";
    display: block;
    width: 100%;
    height: calc(100% - 120px);
    border-left: 2px dotted #fff8;
    position: absolute;
    left: 0;
    top: 0;
    animation: cinema 1s steps(3) 2s infinite alternate both;
  }
}

.Slidish__root {
  @extend %noise;
  // for positioning controls, indicators, progressBar, ...
  position: relative;
  width: 100%;
  height: 100%;
  // for positioning slider center when the width option is set
  margin: auto;
  display: flex;
  // for letting slides fill full height excluding thumbs height using flex css property
  flex-direction: column;
  // to remove outline while focused because of tabIndex (for keyboard navigation to work only from inside the slider)
  outline: none;
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
}
.Slidish__root--fullscreen {
  @extend .Slidish__root;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 2147483647;
  height: 100% !important;
  background-color: #000;
}
.Slidish__close-button {
  display: none;
}
.Slidish__close-button--fullscreen {
  @extend %button;
  display: block;
  top: 0;
  right: 0;
  z-index: 2147483647;
}
.Slidish__slides-root {
  // for positioning slides` children
  position: relative;
  width: 100%;
  // to fill remaining height (excluding thumbs height)
  flex: 1;
  overflow: hidden;
  background-color: #fff;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    // box-shadow: inset 0px 0px 50px 20px #000;
    animation: shadow 1s steps(3) 2s infinite alternate both;
    pointer-events: none;
  }
}
.Slidish__slides-container {
  display: flex;
  height: 100%;
  width: 100%;
}
.Slidish__slide {
  display: flex;
  // to avoid fitting it's content's width
  width: 100%;
  height: 100%;
  padding: 50px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  user-select: none;
  & > img {
    max-width: 100%;
    max-height: 100%;
    filter: contrast(80%) brightness(140%);
  }
}
.Slidish__next-button {
  @extend %button;
  top: 0;
  right: 0;
  height: 100%;
}
.Slidish__previous-button {
  @extend %button;
  top: 0;
  left: 0;
  height: 100%;
}
.Slidish__play-button {
  @extend %button;
  bottom: 0;
}
.Slidish__fullscreen-button {
  @extend %button;
  bottom: 0;
  right: 0;
}
.Slidish__index-indicator {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  padding: 5px 10px;
  width: fit-content;
  margin: auto;
  background-color: #0004;
  color: #fff;
  border-radius: 5px;
  user-select: none;
  z-index: 1;
}
.Slidish__indicators-container {
  /* To avoid covering slide content (like YouTube controls) and disabling slide pointer-events*/
  pointer-events: none;
  position: absolute;
  bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  padding-right: 0;
  justify-content: space-around;
  width: 100%;
  height: 25px;
  padding: 0 56px;
  z-index: 1;
}
.Slidish__indicator {
  /* to allow pointer-events on indicators while it is disabled in indicators' container div */
  pointer-events: auto;
  display: inline-flex;
  margin: 4px;
  width: 12px;
  height: 25px;
  border: 2px solid #f008;
  background-color: #000;
  box-shadow: inset 0px 0px 4px #f00;
  cursor: pointer;
  transition: transform 0.3s;
  width: "35px";
  height: "10px";
  &:focus {
    outline: none;
  }
  &:focus-visible {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: -5px;
      left: -5px;
      // border-radius: 50%;
      border: 3px solid #0009;
      width: 18px;
      height: 31px;
      animation: beat 1s ease-out infinite alternate;
    }
    &::after {
      content: "";
      position: absolute;
      top: -2px;
      left: -2px;
      border-radius: 50%;
      border: 3px solid #fff7;
      width: 12px;
      height: 12px;
      animation: beat 1s ease-out infinite alternate;
    }
  }
}
.Slidish__indicator--active {
  background-color: #a00;
  border-color: #f00;
  transform: rotateZ(180deg) scaleY(1.5);
}
.Slidish__thumbs-root {
  position: relative;
  height: 120px !important;
  width: 100%;
  padding: 24px 0;
  overflow: hidden;
  background-color: $film-color;
  color: #fff;
  &::before {
    content: "";
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    height: 104px;
    border-top: 8px dashed #fff;
    border-bottom: 8px dashed #fff;
  }
}
.Slidish__thumbs-container {
  display: flex;
  height: 100%;
}
.Slidish__thumb {
  position: relative;
  @extend %focus-effect;
  // for centering small thumbs
  display: flex;
  align-items: center;
  justify-content: center;
  // to stop shrinking thumbs
  flex-shrink: 0;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    filter: invert(100%) sepia(50%) contrast(70%);
    // opacity: 75%;
    &:hover {
      filter: brightness(200%);
      opacity: 100%;
    }
  }
}
.Slidish__thumb--active {
  @extend .Slidish__thumb;
  img {
    filter: none;
    opacity: 100%;
  }
}
.Slidish__progress-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 1;
}
.Slidish__progress-bar {
  height: 6px;
  width: 100%;
  border: 1px solid transparent;
  border-width: 1px 0px;
  border-image: linear-gradient(to right, #000, #f00) 1 round;
  background-image: linear-gradient(to right, #f00, #000);
}
```
