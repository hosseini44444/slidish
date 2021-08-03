Reslide contains builtin TypeScript declarations, the only type you may need to import from the package is the `Methods`
interface which is used when you need to call the on demand methods of the Reslide like below:

```tsx static
import React, { useRef } from "react";

import Reslide from "reslide";
import "reslide/style.css";
import type { Methods } from "reslide";

const Example: React.FC<{}> = () => {
  const reslideRef = useRef<Methods>(null);
  return (
    <React.Fragment>
      <Reslide ref={reslideRef}>
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
      <button onClick={() => sliderRef.current?.next()}>NEXT</button>
    </React.Fragment>
  );
};

export default Example;
```

<a class="previous-section" href="#/Documentation/Developer%20Guide/Browser%20Support">Browser Support</a>
<a class="next-section" href="#/Documentation/Developer%20Guide/Server%20Side%20Rendering">Server Side Rendering</a>
