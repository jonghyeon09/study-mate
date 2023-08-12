type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

function SaveButton({
  children,
  disabled = false,
  className = '',
  onClick,
}: Props) {
  return (
    <button
      className={`w-full h-[48px] border-2 border-black rounded-md my-[24px] ${
        disabled ? 'bg-[#7C7C7C]' : 'bg-black'
      }`}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      <p
        className={`font-bold text-white ${
          disabled ? `opacity-20 text-black` : ''
        } ${className}`}
      >
        {children}
      </p>
    </button>
  );
}

export default SaveButton;
