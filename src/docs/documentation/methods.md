You can use the Slidish's methods by using a `ref` like below:

```jsx static
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
      <Slidish ref={slidishRef}>
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

export default Example;
```

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
      <Slidish ref={slidishRef} advanced={{ slideStopPropagation: false }}>
        <button style={bStyle} onClick={() => slidishRef.current.exitFullscreen()}>
          EXIT FULLSCREEN
        </button>
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

<a class="previous-section" href="#/Documentation/Event%20Handlers">Event Handlers</a>
<a class="next-section" href="#/Documentation/User%20Interface/Layout">Layout</a>
