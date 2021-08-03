Slidish contains builtin TypeScript declarations, the only type you may need to import from the package is the `Methods`
interface which is used when you need to call the on demand methods of the Slidish like below:

```tsx static
import React, { useRef } from "react";

import Slidish from "slidish";
import "slidish/style.css";
import type { Methods } from "slidish";

const Example: React.FC<{}> = () => {
  const slidishRef = useRef<Methods>(null);
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
      <button onClick={() => sliderRef.current?.next()}>NEXT</button>
    </React.Fragment>
  );
};

export default Example;
```

<a class="previous-section" href="#/Documentation/Developer%20Guide/Browser%20Support">Browser Support</a>
<a class="next-section" href="#/Documentation/Developer%20Guide/Server%20Side%20Rendering">Server Side Rendering</a>
