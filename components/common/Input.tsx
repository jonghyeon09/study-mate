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
  className = '',
  maxLength,
  onChange,
  reset,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [buttonPosition, setButtonPosition] = useState(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  let focusClor = 'text-indigo';

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  useEffect(() => {
    if (spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      setButtonPosition(spanWidth + 12);
    }
  }, [value]);

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={
          isFocused ? `input text-indigo ${className}` : `input ${className}`
        }
        maxLength={maxLength}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span
        ref={spanRef}
        className="absolute top-0 left- whitespace-nowrap opacity-0 pointer-events-none"
      >
        {value}
      </span>
      {value && isFocused ? (
        <span style={{ left: buttonPosition }} className="absolute">
          <CloseIcon onClick={reset} className="my-auto" />
        </span>
      ) : null}
    </div>
  );
}

export default Input;
