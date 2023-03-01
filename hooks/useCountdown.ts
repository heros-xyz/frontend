import { useState, useEffect } from "react";

export default function useCountdown(mins: number) {
  const [secs, decrement] = useState(mins * 60);
  const [progress, increment] = useState(0);

  useEffect(() => {
    if (secs > 0) {
      const progressLevel = setInterval(() => {
        increment(progress + 100 / (mins * 60));
        decrement(secs - 1);
      }, 1000);
      return () => clearInterval(progressLevel);
    }
  }, [progress, secs, mins]);

  const min = Math.trunc(secs / 60);
  const sec = secs % 60;
  const minutes = min < 10 ? "0" + min : min;
  const seconds = sec < 10 ? "0" + sec : sec;

  const reset = () => {
    decrement(mins * 60);
    increment(0);
  };

  return {
    minutes,
    seconds,
    reset,
  };
}
