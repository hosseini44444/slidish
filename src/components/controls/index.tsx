import PreviousButton from "./previousButton";
import NextButton from "./nextButton";
import PlayButton from "./playButton";
import FullscreenButton from "./fullscreenButton";

import type { Props as FullscreenButtonProps } from "./fullscreenButton";
import type { Props as NextButtonProps } from "./nextButton";
import type { Props as PlayButtonProps } from "./playButton";
import type { Props as PreviousButtonProps } from "./previousButton";

interface Props {
  hideNextButton: boolean;
  hidePreviousButton: boolean;
  hidePlayButton: boolean;
  hideFullscreenButton: boolean;
  nextButtonProps: NextButtonProps;
  previousButtonProps: PreviousButtonProps;
  playButtonProps: PlayButtonProps;
  fullscreenButtonProps: FullscreenButtonProps;
}

const Controls: React.FC<Props> = ({
  hideNextButton,
  hidePreviousButton,
  hidePlayButton,
  hideFullscreenButton,
  nextButtonProps,
  previousButtonProps,
  playButtonProps,
  fullscreenButtonProps,
}) => {
  return (
    <>
      {hidePreviousButton ? null : <PreviousButton {...previousButtonProps} />}
      {hideNextButton ? null : <NextButton {...nextButtonProps} />}
      {hidePlayButton ? null : <PlayButton {...playButtonProps} />}
      {hideFullscreenButton ? null : <FullscreenButton {...fullscreenButtonProps} />}
    </>
  );
};

export default Controls;
