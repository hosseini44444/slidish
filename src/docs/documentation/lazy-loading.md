By enabling lazy loading a placeholder will be shown instead of the slides and thumbnails which are not loaded yet.

It's recommended not to use lazy loading when you are using SSR (Server Side rendering) because a place holder will be
rendered instead of the actual contents of your slides

It is highly recommended to use custom thumbs when lazy loading is enabled otherwise a visible thumb will cause the
actual slide to be loaded even if the slide is not supposed to be loaded yet.

You can specify the lazy loading options using the `lazyLoading` prop which is an object with the following keys:

| key              | type | default value      | explanation                                                                                                                                                                                                                           |
| ---------------- | ---- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled          |      | false              | If set to true a place holder will be shown instead of the actual slide or thumbnail when the slide is not loaded or the thumb is not in the view. If thumbs prop is not set, visible thumb will cause the actual slide to be loaded. |
| preloadCount     |      | 1                  | This property will set the number of slides to be preloaded.                                                                                                                                                                          |
| placeHolder      |      | "Loading..."       | Placeholder JSX node to be shown instead of the actual slide before loading.                                                                                                                                                          |
| thumbPlaceHolder |      | "Loading thumb..." | Placeholder JSX node to be shown instead of the actual thumbnail before loading.                                                                                                                                                      |

To see the effect of lazy loading drag the slides to the right or left to see the custom placeholder and then release it
so the actual slide will be loaded.

Remember that you should use custom thumbnails, otherwise the actual slide will be loaded as soon as thumb is in the
view and lazy loading will become ineffective.

Also remember that once a slide loads for the first time, the placeholder will not be shown instead of that slide
afterward.

Click on the `VIEW CODE` button below the example and view and edit the full code using the live code editor

```jsx
<Reslide
  lazyLoading={{
    enabled: true,
    preloadCount: 0,
    placeHolder: <span style={{ fontSize: "4rem" }}>Custom slide placeholder</span>,
    thumbPlaceHolder: <span style={{ fontSize: "2rem" }}>Custom thumb placeholder</span>,
  }}
  thumbs={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
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

<a class="previous-section" href="#/Documentation/Custom%20Thumbnails">Custom Thumbnails</a>
<a class="next-section" href="#/Documentation/Event%20Handlers">Event Handlers</a>
