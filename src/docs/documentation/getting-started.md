1- Install the package by running the following command in your project's root folder:

```bash
npm install --save slidish
```

2- Import the default export and styles from the installed package:

```js static
import Slidish from "slidish";
import "slidish/style.css";
```

3- Start using the package in your react components like below:

```jsx static
import React from "react";
import Slidish from "slidish";
import "slidish/style.css";

const MyComponent = (props) => {
  return (
    <div id="slidish-container">
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
      </Slidish>
    </div>
  );
};

export default MyComponent;
```

4- Enjoy the result

```jsx
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
</Slidish>
```

**_Tip:_**

- Every direct child of the `Slidish` will become a unique slide .

- Here we've used images as slides.

- You could insert videos, embedded YouTube videos, divs and any other elements or React components.

**_Tip:_**

You can also map data to components and pass them as slides and or thumbs like below:

```jsx static
import React from "react";
import Slidish from "slidish";
import "slidish/style.css";

const images = [
  { url: "images/1.jpg", description: "space shuttle failure" },
  { url: "images/2.jpg", description: "space shuttle lunch" },
  { url: "images/3.jpg", description: "space shuttle lunch 2" },
  { url: "images/4.jpg", description: "North America's night from above" },
];

const containerStyle = { position: "relative", maxWidth: "100%", maxHeight: "100%" };
const imgStyle = { maxWidth: "100%", maxHeight: "100%" };
const descriptionStyle = {
  position: "absolute",
  bottom: 50,
  left: 0,
  width: "100%",
  textAlign: "center",
  backgroundColor: "#7777",
  color: "#fff",
  fontFamily: "sans-serif",
  padding: "10px",
};

const thumbnails = images.map((data) => <img src={data.url} alt={data.description} />);

const slides = images.map((data) => (
  <div style={containerStyle}>
    <img style={imgStyle} src={data.url} alt={data.description} />
    <span style={descriptionStyle}>{data.description}</span>
  </div>
));

const Example = () => <Slidish thumbs={thumbnails}>{slides}</Slidish>;

export default Example;
```

```jsx
const images = [
  { url: "images/1.jpg", description: "space shuttle failure" },
  { url: "images/2.jpg", description: "space shuttle lunch" },
  { url: "images/3.jpg", description: "space shuttle lunch 2" },
  { url: "images/4.jpg", description: "North America's night from above" },
];

const containerStyle = { position: "relative", maxWidth: "100%", maxHeight: "100%" };
const imgStyle = { maxWidth: "100%", maxHeight: "100%" };
const descriptionStyle = {
  position: "absolute",
  bottom: 50,
  left: 0,
  width: "100%",
  textAlign: "center",
  backgroundColor: "#7777",
  color: "#fff",
  fontFamily: "sans-serif",
  padding: "10px",
};

const thumbnails = images.map((data) => <img src={data.url} alt={data.description} />);

const slides = images.map((data) => (
  <div style={containerStyle}>
    <img style={imgStyle} src={data.url} alt={data.description} />
    <span style={descriptionStyle}>{data.description}</span>
  </div>
));

<Slidish thumbs={thumbnails}>{slides}</Slidish>;
```

<a class="previous-section" href="#/Features">Features</a>
<a class="next-section" href="#/Documentation/Main%20Options">Main Options</a>
