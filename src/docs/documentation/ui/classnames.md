For being fully compatible with SSR (Server Side Rendering), Slidish is shipped with pre-rendered styles which can be
imported directly from the package like below:

```js static
import "slidish/style.css";
```

If you want to change the `className` of any of the Slidish's internal components you can do it by changing the keys of `classNames` prop which is an object with the following keys:

| key                   | type   | default value                         | Will be applied to                                                          |
| --------------------- | ------ | ------------------------------------- | --------------------------------------------------------------------------- |
| root                  | string | "Slidish\_\_root"                     | outermost div container of all slider elements while not in fullscreen mode |
| rootFullscreen        | string | "Slidish\_\_root--fullscreen"         | outermost div container of all slider elements while in fullscreen mode     |
| slidesRoot            | string | "Slidish\_\_slides-root"              | outermost container of slides                                               |
| slidesContainer       | string | "Slidish\_\_slides-container"         | container of slides which moves inside slidesRoot when slides move          |
| slide                 | string | "Slidish\_\_slide"                    | every single slide                                                          |
| thumbsRoot            | string | "Slidish\_\_thumbs-root"              | outermost container of thumbnails                                           |
| thumbsContainer       | string | "Slidish\_\_thumbs-container"         | container of thumbs which moves inside thumbsRoot when thumbs move          |
| thumb                 | string | "Slidish\_\_thumb"                    | every single thumbnail including the active one                             |
| activeThumb           | string | "Slidish\_\_thumb--active"            | currently active slide's thumbnail                                          |
| indexIndicator        | string | "Slidish\_\_index-indicator"          | indexIndicator span                                                         |
| indicatorsContainer   | string | "Slidish\_\_indicators-container"     | container div of indicators                                                 |
| indicator             | string | "Slidish\_\_indicator"                | every single indicator including the active one.                            |
| activeIndicator       | string | "Slidish\_\_indicator--active"        | currently active slide's indicator                                          |
| progressBarContainer  | string | "Slidish\_\_progress-bar-container"   | container div of the progressBar                                            |
| progressBar           | string | "Slidish\_\_progress-bar"             | progressBar                                                                 |
| previousButton        | string | "Slidish\_\_previous-button"          | previous button                                                             |
| nextButton            | string | "Slidish\_\_next-button"              | next button                                                                 |
| playButton            | string | "Slidish\_\_play-button"              | play & pause button                                                         |
| fullscreenCloseButton | string | "Slidish\_\_close-button--fullscreen" | close button of fullscreen mode                                             |
| fullscreenButton      | string | "Slidish\_\_fullscreen-button"        | fullscreen & exit fullscreen button                                         |

In the following example we've used custom classNames which are imported using
[CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)

<a class="previous-section" href="#/Documentation/User%20Interface/Layout">Layout</a>
<a class="next-section" href="#/Documentation/User%20Interface/Inline%20Styles">Inline Styles</a>
