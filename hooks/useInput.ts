import { useState, useCallback } from 'react';

type ReturnProps = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

function useInput(initialValue: string = ''): ReturnProps {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const reset = useCallback(() => {
    setValue('');
  }, []);

  return { value, onChange, reset };
}

export default useInput;
