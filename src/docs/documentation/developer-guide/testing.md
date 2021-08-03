If you want to test something that depends on this component then you need to set the `testing` prop to `true`.

```jsx static
import Reslide from "reslide";

<Reslide testing={true}>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</Reslide>;
```

Also you might need to mock `css` imports because **Reslide** exports it's styles using a `style.css` file.

You might also need to mock `ResizeObserver` and `IntersectionObserver` if you want to enable the `lazyLoading` option.

jest configuration via `"jest"` key in `package.json`:

```json static
{
  "jest": {
    "moduleNameMapper": {
      "\\.(css)$": "<rootDir>/__mocks__/styleMock.js"
    },
    "setupFilesAfterEnv": ["<rootDir>/setupTests.js"]
  }
}
```

\_\_mocks\_\_/styleMock.js

```js static
module.exports = {};
```

setupTests.js

```js static
class mockResizeObserver {
  constructor(cb) {
    cb([{ contentRect: { width: 100 } }]);
  }
  observe() {}
  disconnect() {}
}
global.ResizeObserver = mockResizeObserver;
```

<a class="previous-section" href="#/Documentation/Developer%20Guide/Server%20Side%20Rendering">Server Side Rendering</a>
