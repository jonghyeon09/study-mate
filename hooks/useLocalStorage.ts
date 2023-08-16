import { useState } from 'react';

function isString(value: any): value is string {
  return typeof value === 'string';
}

function useLocalStorage<T>(key: string, initialValue?: T) {
  // 로컬 스토리지에서 값을 가져와 상태를 초기화합니다.
  const storedValue =
    typeof window != 'undefined' ? localStorage.getItem(key) : null;
  const initial = storedValue
    ? isString(initialValue)
      ? storedValue
      : JSON.parse(storedValue)
    : initialValue;

  const [value, setValue] = useState<T | undefined>(initial);

  // 값이 변경될 때마다 로컬 스토리지를 업데이트합니다.
  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    const valueToStore = isString(newValue)
      ? newValue
      : JSON.stringify(newValue);
    localStorage.setItem(key, valueToStore);
  };

  // 값 삭제 기능
  const removeStoredValue = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, setStoredValue, removeStoredValue] as const;
}

export default useLocalStorage;
