import { useState, useEffect } from 'react';

type RetunType<T> = [value: T, setValue: React.Dispatch<T>];

function useLocalStorage<T = string>(
  key: string,
  initialValue = ''
): RetunType<T> {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(initialValue)
      );
    } catch (error) {
      currentValue = initialValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
