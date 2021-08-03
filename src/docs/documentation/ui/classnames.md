For being fully compatible with SSR (Server Side Rendering), Reslide is shipped with pre-rendered styles which can be
imported directly from the package like below:

```js static
import "reslide/style.css";
```

If you want to change the `className` of any of the Reslide's internal components you can do it by changing the keys of `classNames` prop which is an object with the following keys:

| key                   | type   | default value                         | Will be applied to                                                          |
| --------------------- | ------ | ------------------------------------- | --------------------------------------------------------------------------- |
| root                  | string | "Reslide\_\_root"                     | outermost div container of all slider elements while not in fullscreen mode |
| rootFullscreen        | string | "Reslide\_\_root--fullscreen"         | outermost div container of all slider elements while in fullscreen mode     |
| slidesRoot            | string | "Reslide\_\_slides-root"              | outermost container of slides                                               |
| slidesContainer       | string | "Reslide\_\_slides-container"         | container of slides which moves inside slidesRoot when slides move          |
| slide                 | string | "Reslide\_\_slide"                    | every single slide                                                          |
| thumbsRoot            | string | "Reslide\_\_thumbs-root"              | outermost container of thumbnails                                           |
| thumbsContainer       | string | "Reslide\_\_thumbs-container"         | container of thumbs which moves inside thumbsRoot when thumbs move          |
| thumb                 | string | "Reslide\_\_thumb"                    | every single thumbnail including the active one                             |
| activeThumb           | string | "Reslide\_\_thumb--active"            | currently active slide's thumbnail                                          |
| indexIndicator        | string | "Reslide\_\_index-indicator"          | indexIndicator span                                                         |
| indicatorsContainer   | string | "Reslide\_\_indicators-container"     | container div of indicators                                                 |
| indicator             | string | "Reslide\_\_indicator"                | every single indicator including the active one.                            |
| activeIndicator       | string | "Reslide\_\_indicator--active"        | currently active slide's indicator                                          |
| progressBarContainer  | string | "Reslide\_\_progress-bar-container"   | container div of the progressBar                                            |
| progressBar           | string | "Reslide\_\_progress-bar"             | progressBar                                                                 |
| previousButton        | string | "Reslide\_\_previous-button"          | previous button                                                             |
| nextButton            | string | "Reslide\_\_next-button"              | next button                                                                 |
| playButton            | string | "Reslide\_\_play-button"              | play & pause button                                                         |
| fullscreenCloseButton | string | "Reslide\_\_close-button--fullscreen" | close button of fullscreen mode                                             |
| fullscreenButton      | string | "Reslide\_\_fullscreen-button"        | fullscreen & exit fullscreen button                                         |

In the following example we've used custom classNames which are imported using
[CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)

<a class="previous-section" href="#/Documentation/User%20Interface/Layout">Layout</a>
<a class="next-section" href="#/Documentation/User%20Interface/Inline%20Styles">Inline Styles</a>
