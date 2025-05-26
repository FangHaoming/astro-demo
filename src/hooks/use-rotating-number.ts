import { useState, useEffect, useRef } from "react";

export function useRotatingNumber({
  count = 2,
  gap = 5000,
  onChange,
}: {
  count: number;
  gap?: number;
  onChange?: (val?: number) => void;
}) {
  const [rotatingNumber, setRotatingNumber] = useState(1);
  const interval = useRef<NodeJS.Timeout>();

  const startCount = () => {
    if (interval.current) {
      clearTimeout(interval.current);
    }
    interval.current = setInterval(() => {
      setRotatingNumber((prevNumber) => {
        const newVal = prevNumber >= count ? 1 : prevNumber + 1;
        onChange?.(newVal);
        return newVal;
      });
    }, gap);
    return () => clearInterval(interval.current);
  };

  useEffect(startCount, [count, gap, rotatingNumber, onChange]);

  return {
    rotatingNumber,
    setRotatingNumber,
    startCount,
  };
}
