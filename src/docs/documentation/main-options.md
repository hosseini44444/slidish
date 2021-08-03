You can specify the main options using the `options` prop which is an object with the following keys:

| key                      | type           | default value | explanation                                                                                                                                                                            |
| ------------------------ | -------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| height                   | string\|number | "500px"       | Total height of the slider component                                                                                                                                                   |
| width                    | string\|number | "100%"        | Total width of the slider component                                                                                                                                                    |
| thumbWidth               | number         | 120           | Width of every single thumbnail in pixels (should be of type number so it can be used in calculating the thumbs position).                                                             |
| thumbHeight              | string\|number | "20%"         | Height of every single thumbnail.                                                                                                                                                      |
| thumbMargin              | number         | 4             | Margin between every thumbnail in pixels (should be of type number so it can be used in calculating the thumbs position).                                                              |
| startIndex               | number         | 0             | Index of first slide to show on mount (starts from zero)                                                                                                                               |
| infinite                 | boolean        | true          | If set to false after reaching the last slide, clicking the next button or calling the next method will have no effect, also slideshow will stop on last slide                         |
| startFullscreen          | boolean        | false         | If set to true slider will start in fullscreen mode on mount (browser fullscreen mode is disabled on mount)                                                                            |
| useBrowserFullscreen     | boolean        | true          | If set to false browser's fullscreen mode will not be used on fullscreen                                                                                                               |
| keyboardNavigation       | boolean        | true          | If set to false keyboard navigation using left and right arrows will be disabled                                                                                                       |
| transitionDuration       | number         | 0.45          | Transition duration in seconds when switching to next or previous slide                                                                                                                |
| repeatTransitionDuration | number         | 2             | Duration of transitioning between last and first slide in seconds. In conjunction with `transitionDuration` property this will be used to calculate transitioning time between slides. |

Click on the `VIEW CODE` button below the example and view and edit the full code using the live code editor

```jsx
<Reslide
  options={{
    height: "400px",
    width: "50%",
    thumbWidth: 150,
    thumbHeight: "30%",
    thumbMargin: 10,
    startIndex: 4,
    infinite: true,
    startFullscreen: false,
    useBrowserFullscreen: false,
    keyboardNavigation: true,
    transitionDuration: 1,
    repeatTransitionDuration: 5,
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
</Reslide>
```

<a class="previous-section" href="#/Documentation/Getting%20Started">Getting Started</a>
<a class="next-section" href="#/Documentation/Advanced%20Options">Advanced Options</a>
