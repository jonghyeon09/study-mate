import { useState, useEffect } from 'react';

type ReturnType<T> = [
  T,
  // eslint-disable-next-line no-unused-vars
  (value: T) => void,
];

function useLocalStorage<T>(key: string, initialValue: T): ReturnType<T> {
  const readValueFromLocalStorage = (): T => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(readValueFromLocalStorage);

  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  useEffect(() => {
    const onChange = (e: StorageEvent) => {
      if (e.storageArea === window.localStorage && e.key === key) {
        setStoredValue(readValueFromLocalStorage());
      }
    };

    window.addEventListener('storage', onChange);
    return () => window.removeEventListener('storage', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
