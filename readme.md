# Reslide - React component for building full-featured sliders

Reslide is a ready to use, simple, highly customizable, responsive React component for building sliders of all types of
components including images, videos, etc.

![npm](https://img.shields.io/npm/v/reslide?style=for-the-badge)

<a href="https://hosseini44444.github.io/reslide/"
style="display: inline-block; padding: 10px 15px; border: 2px solid #06d; margin: 10px 10px 20px 0;
font-family: sans-serif; font-weight: bold;">DOCUMENTATION</a>
<a href="https://hosseini44444.github.io/reslide/#/Playground"
style="display: inline-block; padding: 10px 15px; border: 2px solid #06d; margin: 0 10px 20px 0;
font-family: sans-serif; font-weight: bold;">PLAYGROUND</a>
<a href="https://hosseini44444.github.io/reslide/#/Fancy%20Demo"
style="display: inline-block; padding: 10px 15px; margin: 0 10px 20px 0; border: 2px solid #06d; font-family: sans-serif; font-weight: bold;">
FANCY DEMO</a>

## Features

- Ready to use (No customization is needed unless you want more control)
- Fully responsive
- Fully accessible
- Highly customizable
- SSR (Server Side Rendering) ready
- Lazy loading
- Mouse and Touch Compatible
- Keyboard navigation
- Hardware acceleration
- Event handlers (through props)
- On demand Methods for external control (`getState`, `next`, `previous`, `goto`, `play`, `pause`, `goFullscreen`, `exitFullscreen`)
- Supports images, videos and every possible component you can imagine
- Customizable thumbnails
- Slideshow support
- FullScreen support (via browser api or by using css)
- Contains builtin TypeScript declaration files
- Tested on all major web browsers including mobile versions (Chrome, Safari, Firefox, Edge, Opera, IE 11)
- Fully documented with examples for every option (https://hosseini44444.github.io/reslide/)

## Getting started

1. Install the package by running the following command in your project's root folder:

```bash
npm install --save reslide
```

2. Import the default export and styles from the installed package:

```js static
import Reslide from "reslide";
import "reslide/style.css";
```

3. Start using the package in your react components like below:

```jsx static
import React from "react";
import Reslide from "reslide";
import "reslide/style.css";

const MyComponent = (props) => {
  return (
    <div id="reslide-container">
      <Reslide>
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
    </div>
  );
};

export default MyComponent;
```

4. Enjoy the result

### [Click here for Reslide's full documentation with examples and more](https://hosseini44444.github.io/reslide/)
