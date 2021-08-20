Slidish's layout consists of the following components which can be disabled by setting the keys in the `layout` prop to false

<div style="overflow-x: auto;">

| key                   | type    | default value | explanation                                                                      |
| --------------------- | ------- | ------------- | -------------------------------------------------------------------------------- |
| slides                | boolean | true          | If set to false, slides will be removed from the DOM                             |
| thumbs                | boolean | true          | If set to false, thumbs will be removed from the DOM                             |
| nextButton            | boolean | true          | If set to false, next button will be removed from the DOM                        |
| previousButton        | boolean | true          | If set to false, previous button will be removed from the DOM                    |
| playButton            | boolean | true          | If set to false, play button will be removed from the DOM                        |
| fullscreenButton      | boolean | true          | If set to false, fullscreen button will be removed from the DOM                  |
| fullscreenCloseButton | boolean | true          | If set to false, close button (while in fullscreen) will be removed from the DOM |
| indexIndicator        | boolean | true          | If set to false, indexIndicator will be removed from the DOM                     |
| indicators            | boolean | true          | If set to false, indicators will be removed from the DOM                         |
| progressBar           | boolean | true          | If set to false, progressBar will be removed from the DOM                        |

</div>

```jsx
import React, { useState } from "react";
import Slidish from "slidish";
import "slidish/style.css";

const Example = () => {
  const [layoutState, setLayoutState] = useState({
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
  });

  const toggleItem = (event) => {
    const itemName = event.target.value;
    setLayoutState((previousLayout) => ({ ...previousLayout, [itemName]: !previousLayout[itemName] }));
  };

  return (
    <>
      {Object.keys(layoutState).map((itemName) => (
        <span
          style={{
            display: "inline-block",
            boxSizing: "border-box",
            padding: "10px",
            border: "2px solid #0b7",
            borderRadius: "5px",
            margin: "5px",
          }}
          key={itemName}
        >
          <label htmlFor={itemName}>Hide {itemName}</label>
          <input type="checkbox" value={itemName} id={itemName} onClick={toggleItem} />
        </span>
      ))}

      <Slidish layout={layoutState}>
        <span style={{ fontSize: "3rem" }}>1</span>
        <span style={{ fontSize: "3rem" }}>2</span>
        <span style={{ fontSize: "3rem" }}>3</span>
        <span style={{ fontSize: "3rem" }}>4</span>
      </Slidish>
    </>
  );
};

<Example />;
```

<a class="previous-section" href="#/Documentation/Methods">Methods</a>
<a class="next-section" href="#/Documentation/User%20Interface/ClassNames">ClassNames</a>
