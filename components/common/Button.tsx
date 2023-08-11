type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

function Button({
  children,
  disabled = false,
  className = '',
  onClick,
}: Props) {
  return (
    <button
      className={`w-full h-[48px] my-[24px] border-shadow bg-[var(--color-indigo)] ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
