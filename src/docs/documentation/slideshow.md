You can specify the slideshow options using the `slideshow` prop which is an object with the following keys:

| key          | type    | default value | explanation                                                                                                         |
| ------------ | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------- |
| autoplay     | boolean | false         | If set to true slideshow will start automatically on mount                                                          |
| playInterval | number  | 3             | Interval in seconds between each slide while playing                                                                |
| stopOnPrev   | boolean | false         | If set to true the slideshow will stop if user goes to previous slideshow                                           |
| pauseOnHover | boolean | false         | If set to true the slideshow will pause when mouse hovers over slides and will play again after leaving the slides. |

Click on the `VIEW CODE` button below the example and view and edit the full code using the live code editor

```jsx
<Reslide slideshow={{ autoplay: true, playInterval: 1.5, stopOnPrev: true, pauseOnHover: false }}>
  <span style={{ fontSize: "3rem" }}>1</span>
  <span style={{ fontSize: "3rem" }}>2</span>
  <span style={{ fontSize: "3rem" }}>3</span>
  <span style={{ fontSize: "3rem" }}>4</span>
  <span style={{ fontSize: "3rem" }}>5</span>
  <span style={{ fontSize: "3rem" }}>6</span>
  <span style={{ fontSize: "3rem" }}>7</span>
  <span style={{ fontSize: "3rem" }}>8</span>
</Reslide>
```

<a class="previous-section" href="#/Documentation/Advanced%20Options">Advanced Options</a>
<a class="next-section" href="#/Documentation/Custom%20Thumbnails">Custom Thumbnails</a>
