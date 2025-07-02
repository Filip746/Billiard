import { useEffect, useState } from 'react';

const calcTimeLeft = (endTime: number): number => {
  if (!endTime) return 0;

  const left = endTime - new Date().getTime();
  return left < 0 ? 0 : left;
};

export default function useCountdown(initialEndTime: number): [number, (newEndTime: number) => void] {
  const [endTime, setEndTime] = useState<number>(initialEndTime);
  const [timeLeft, setTimeLeft] = useState<number>(() => calcTimeLeft(initialEndTime));

  useEffect(() => {
    setTimeLeft(calcTimeLeft(endTime));

    const timer = setInterval(() => {
      const remaining = calcTimeLeft(endTime);
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return [timeLeft, setEndTime];
}
