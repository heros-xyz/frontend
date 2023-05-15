import { useState, useEffect } from "react";

export default function useCountdown(dfSecs: number) {
  const [secs, decrement] = useState(dfSecs);
  const [progress, increment] = useState(0);

  useEffect(() => {
    if (secs > 0) {
      const progressLevel = setInterval(() => {
        increment(progress + 100 / dfSecs);
        decrement(secs - 1);
      }, 1000);
      return () => clearInterval(progressLevel);
    }
  }, [progress, secs, dfSecs]);

  const min = Math.trunc(secs / 60);
  const sec = secs % 60;
  const minutes = min < 10 ? "0" + min : min;
  const seconds = sec < 10 ? "0" + sec : sec;

  const reset = () => {
    decrement(5 * 60);
    increment(0);
  };

  return {
    minutes,
    seconds,
    reset,
  };
}
