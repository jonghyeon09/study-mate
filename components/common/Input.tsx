import { useEffect, useRef, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';

type Props = {
  type: string;
  placeholder?: string;
  value?: string;
  className?: string;
  maxLength?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

function Input({
  type = 'text',
  placeholder,
  value,
  className,
  maxLength,
  onChange,
  reset,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [buttonPosition, setButtonPosition] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      setButtonPosition(spanWidth);
    }
  }, [value]);

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border-2 border-black rounded drop-shadow-[2px_2px_0_#000] focus:outline-none w-full p-1.5 font-medium ${className}`}
        maxLength={maxLength}
        ref={inputRef}
      />
      <span
        ref={spanRef}
        className="absolute top-0 left-0 whitespace-nowrap opacity-0 pointer-events-none"
      >
        {value}
      </span>
      {value && (
        <span style={{ left: buttonPosition }} className="absolute h-full">
          <CloseIcon onClick={reset} className="my-auto ml-2" />
        </span>
      )}
    </div>
  );
}

export default Input;
