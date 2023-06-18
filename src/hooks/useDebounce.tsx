import { useRef } from 'react';

const useDebounce = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = (callback: () => void, delay: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback();
    }, delay);
  };

  return { debounce };
};

export default useDebounce;
