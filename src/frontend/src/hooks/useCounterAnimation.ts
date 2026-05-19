import { useEffect, useRef, useState } from "react";

export function useCounterAnimation(target: number, duration = 800): number {
  const [current, setCurrent] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) {
      setCurrent(0);
      return;
    }

    // Ease-out cubic bezier approximation
    const easeOut = (t: number): number => 1 - (1 - t) ** 3;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      setCurrent(Math.round(easedProgress * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    startTimeRef.current = null;
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return current;
}

export function useFormattedCounter(target: number, duration = 800): string {
  const value = useCounterAnimation(target, duration);
  return value.toLocaleString();
}
