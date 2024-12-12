import "../styles/button.css";

export interface Props {
  text: string;
  onClickHandler: (...args: unknown[]) => void;
  disabled?: boolean;
  bgColor: string;
  className?: string;
  icon?: string;
  iconStyle?: { [key: string]: string };
}

export const Button = ({
  text,
  onClickHandler,
  disabled,
  bgColor,
  className,
  icon,
  iconStyle,
}: Props) => {
  return (

      <button
        className={`button ${className}`}
        style={{ backgroundColor: bgColor }}
        onClick={onClickHandler}
        disabled={disabled}
      >
        <span className="iconSpan">
        {icon ? <img src={icon} style={{ ...iconStyle }} alt="" /> : null}
        </span>

        {text}
      </button>
  );
};
