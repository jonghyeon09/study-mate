import { useRef, useEffect } from 'react';

const useIntersection = (callback: () => void) => {
  const target = useRef(null);

  useEffect(() => {
    if (!target.current) return;

    const observer = new IntersectionObserver(
      (entries, observe) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      {
        threshold: 1,
      }
    );

    observer.observe(target.current);

    return () => observer.disconnect();
  }, [callback]);

  return target;
};

export default useIntersection;
