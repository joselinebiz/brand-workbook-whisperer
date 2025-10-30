import { useState, useEffect } from 'react';

export const useCountdown = (targetDate: Date | null) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({ hours: 0, minutes: 0, seconds: 0, expired: true });

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0, expired: true });
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft((prev) => {
          if (!prev.expired) {
            return { hours: 0, minutes: 0, seconds: 0, expired: true };
          }
          return prev;
        });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft((prev) => {
        if (prev.hours !== hours || prev.minutes !== minutes || prev.seconds !== seconds) {
          return { hours, minutes, seconds, expired: false };
        }
        return prev;
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};
