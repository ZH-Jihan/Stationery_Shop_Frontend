"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: Date;
  onComplete?: () => void;
  className?: string;
}

export function CountdownTimer({
  endTime,
  onComplete,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        onComplete?.();
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="text-center">
        <div className="text-2xl font-bold">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-sm text-muted-foreground">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-sm text-muted-foreground">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-sm text-muted-foreground">Seconds</div>
      </div>
    </div>
  );
}
