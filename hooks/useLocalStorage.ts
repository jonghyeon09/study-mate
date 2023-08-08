import { useState, useEffect } from 'react';

type RetunType<T> = {
  storage: T;
  setStorage: React.Dispatch<T>;
};

function useLocalStorage<T>(key: string, initialValue = ''): RetunType<T> {
  const [storage, setStorage] = useState(() => {
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
    localStorage.setItem(key, JSON.stringify(storage));
  }, [key, storage]);

  return { storage, setStorage };
}

export default useLocalStorage;
