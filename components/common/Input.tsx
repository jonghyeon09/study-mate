type Props = {
  type: string;
  placeholder?: string;
  value?: string;
  className?: string;
  maxLength?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  type = 'text',
  placeholder,
  value,
  className,
  maxLength,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-2 border-black rounded drop-shadow-[2px_2px_0_#000] focus:outline-none w-full p-1.5 font-medium ${className}`}
      maxLength={maxLength}
    />
  );
}

export default Input;
