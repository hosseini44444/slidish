If you want to change the inline style of any of the Slidish's internal components you can do it by changing the keys of
`styles` prop which is an object with the following keys:

| key                   | type                | default value | Will be applied to                                                              |
| --------------------- | ------------------- | ------------- | ------------------------------------------------------------------------------- |
| root                  | React.CSSProperties | {}            | the outermost div container of all slider elements while not in fullscreen mode |
| rootFullscreen        | React.CSSProperties | {}            | the outermost div container of all slider elements while in fullscreen mode     |
| slidesRoot            | React.CSSProperties | {}            | the outermost container of slides                                               |
| slidesContainer       | React.CSSProperties | {}            | the container of slides which moves inside slidesRoot when slides move          |
| slide                 | React.CSSProperties | {}            | every single slide                                                              |
| thumbsRoot            | React.CSSProperties | {}            | the outermost container of thumbnails                                           |
| thumbsContainer       | React.CSSProperties | {}            | the container of thumbs which moves inside thumbsRoot when thumbs move          |
| thumb                 | React.CSSProperties | {}            | every single thumbnail including the active one                                 |
| activeThumb           | React.CSSProperties | {}            | the currently active slide's thumbnail                                          |
| indexIndicator        | React.CSSProperties | {}            | the indexIndicator span                                                         |
| indicatorsContainer   | React.CSSProperties | {}            | the container div of indicators                                                 |
| indicator             | React.CSSProperties | {}            | every single indicator including the active one                                 |
| activeIndicator       | React.CSSProperties | {}            | the currently active slide's indicator                                          |
| progressBarContainer  | React.CSSProperties | {}            | the container div of the progressBar                                            |
| progressBar           | React.CSSProperties | {}            | the progressBar                                                                 |
| previousButton        | React.CSSProperties | {}            | the previous button                                                             |
| nextButton            | React.CSSProperties | {}            | the next button                                                                 |
| playButton            | React.CSSProperties | {}            | the play & pause button                                                         |
| fullscreenCloseButton | React.CSSProperties | {}            | the close button of fullscreen mode                                             |
| fullscreenButton      | React.CSSProperties | {}            | the fullscreen & exit fullscreen button                                         |

<a class="previous-section" href="#/Documentation/User%20Interface/ClassNames">ClassNames</a>
<a class="next-section" href="#/Documentation/Developer%20Guide/Browser%20Support">Browser Support</a>
