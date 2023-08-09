type Props = {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: () => void;
  className?: string;
};

function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-2 border-black rounded drop-shadow-[2px_2px_0_#000] focus:outline-none w-full p-1.5 font-medium ${className}`}
    />
  );
}

export default Input;
