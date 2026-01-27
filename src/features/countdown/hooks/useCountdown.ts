import { useState, useEffect } from "react";
import { getTimeUntil, TimeUntil } from "shared/lib";

type UseCountdownOptions = {
  targetDate: Date | string | number;
  interval?: number;
  onComplete?: () => void;
};

const useCountdown = ({ targetDate, interval = 1000, onComplete }: UseCountdownOptions) => {
  const [timeUntil, setTimeUntil] = useState<TimeUntil>(() => getTimeUntil(targetDate));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTimeUntil(targetDate);
      setTimeUntil(newTime);

      if (newTime.totalMilliseconds <= 0 && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [targetDate, interval, isComplete, onComplete]);

  return { timeUntil, isComplete };
};

export { useCountdown };
