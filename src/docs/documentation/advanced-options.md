You can specify the advanced options using the `advanced` prop which is an object with the following keys:

| key                            | type    | default value                 | explanation                                                                                                                                                                                                        |
| ------------------------------ | ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hardwareAcceleration           | boolean | true                          | If set to false translate will be used instead of translate3d for transitioning between slides. @see [translate vs translate3d](https://stackoverflow.com/questions/22111256/translate3d-vs-translate-performance) |
| slideStopPropagation           | boolean | true                          | If set to false click events will be propagated to slides otherwise click events will be discarded.                                                                                                                |
| thumbStopPropagation           | boolean | true                          | If set to false click events will be propagated to thumbnails otherwise click events will be discarded.                                                                                                            |
| slidingSensitivity             | number  | 10                            | Sliding sensitivity in pixels for going to next or previous slide. If mouse or touch movement will be below this number no sliding will occur.                                                                     |
| thumbsSlidingSensitivity       | number  | 10                            | Sliding sensitivity in pixels for going to next or previous slide while dragging thumbs. If mouse or touch movement will be below this number no sliding will occur.                                               |
| transitionTimingFunction       | string  | "cubic-bezier(.1, .3, .5, 1)" | Timing function that will be used while transitioning between slides.                                                                                                                                              |
| thumbsTransitionTimingFunction | string  | "cubic-bezier(.1, .3, .5, 1)" | Timing function that will be used while transitioning between thumbs.                                                                                                                                              |

_Click on the next button to see how slides and thumbs transition._

_Drag and release the slides to check the increased sliding sensitivity.
(Now you should drag the slides more than 150px to go to the next or previous slide)_

Click on the `VIEW CODE` button below the example and view and edit the full code using the live code editor

```jsx
<Slidish
  advanced={{
    hardwareAcceleration: true,
    slideStopPropagation: true,
    thumbStopPropagation: true,
    slidingSensitivity: 150,
    thumbsSlidingSensitivity: 10,
    transitionTimingFunction: "cubic-bezier(0.5,1.5,0.5,1.5)",
    thumbsTransitionTimingFunction: "cubic-bezier(.53,-0.78,.41,1.09)",
  }}
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
```

<a class="previous-section" href="#/Documentation/Main%20Options">Main Options</a>
<a class="next-section" href="#/Documentation/Slideshow">Slideshow</a>
