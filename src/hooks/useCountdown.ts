import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  dDay: number; // 달력 날짜 기준 남은 일수 (당일 0)
  isExpired: boolean;
}

export function useCountdown(targetDate: string): CountdownResult {
  const [countdown, setCountdown] = useState<CountdownResult>(
    calculateCountdown(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}

function calculateCountdown(targetDate: string): CountdownResult {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  // 시간 차이가 아니라 날짜 차이로 계산해야 오후에도 D-day가 하루 줄지 않음
  const startOfDay = (t: number) => new Date(t).setHours(0, 0, 0, 0);
  const dDay = Math.round((startOfDay(target) - startOfDay(now)) / (1000 * 60 * 60 * 24));

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, dDay, isExpired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    dDay,
    isExpired: false,
  };
}
