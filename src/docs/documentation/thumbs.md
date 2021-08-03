Slidish uses it's `children` as thumbnails by default.

If you want to set custom thumbnails for your slides you can do it by setting the `thumbs` prop and passing an array of
React Nodes like below:

```jsx static
import React from "react";
import Slidish from "slidish";
import "slidish/style.css";

const Example = (props) => {
  return (
    <div id="slidish-container">
      <Slidish
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
    </div>
  );
};

export default Example;
```

You can also set thumbs by mapping an array of images to an array of `img` elements like this:

```jsx static
import React from "react";
import Slidish from "slidish";
import "slidish/style.css";

const images = [
  { url: "images/thumb1.jpg", alt: "thumbnail #1" },
  { url: "images/thumb1.jpg", alt: "thumbnail #2" },
  { url: "images/thumb1.jpg", alt: "thumbnail #3" },
];

const thumbnails = images.map((data) => <img src={data.url} alt={data.alt} />);

const Example = (props) => {
  return (
    <Slidish thumbs={thumbnails}>
      <img src="images/1.jpg" alt="space shuttle failure" />
      <img src="images/2.jpg" alt="space shuttle lunch" />
      <img src="images/3.jpg" alt="space shuttle lunch 2" />
    </Slidish>
  );
};

export default Example;
```

Click on VIEW CODE button below the example and view and edit the full code using the live code editor

```jsx
<Slidish
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
```

<a class="previous-section" href="#/Documentation/Slideshow">Slideshow</a>
<a class="next-section" href="#/Documentation/Lazy%20Loading">Lazy Loading</a>
