export interface Props {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
  hide: boolean;
}

const CloseButton: React.FC<Props> = ({ hide, ...otherProps }) =>
  hide ? null : (
    <button aria-label="exit fullscreen" {...otherProps}>
      <svg viewBox="0 0 100 100">
        <path d="M 75 15 L 85 25 L 60 50 L 85 75 L 75 85 L 50 60 L 25 85 L 15 75 L 40 50 L 15 25 L 25 15 L 50 40 L 75 15 Z"></path>
      </svg>
    </button>
  );

export default CloseButton;
