type TimeUntil = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalMilliseconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  totalDays: number;
  totalWeeks: number;
};

const getTimeUntil = (targetDate: Date | string | number): TimeUntil => {
  const now = new Date();
  const target = new Date(targetDate);

  const diffMs = target.getTime() - now.getTime();

  // Полные значения
  const totalMilliseconds = diffMs;
  const totalSeconds = diffMs / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;
  const totalWeeks = totalDays / 7;

  // Разбивка на компоненты (более точная)
  const absDiffMs = Math.abs(diffMs);
  const isNegative = diffMs < 0;

  let remaining = absDiffMs;

  const milliseconds = remaining % 1000;
  remaining = Math.floor(remaining / 1000);

  const seconds = remaining % 60;
  remaining = Math.floor(remaining / 60);

  const minutes = remaining % 60;
  remaining = Math.floor(remaining / 60);

  const hours = remaining % 24;
  remaining = Math.floor(remaining / 24);

  const days = remaining;

  // Приблизительный расчёт для месяцев и лет
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  return {
    years: isNegative ? -years : years,
    months: isNegative ? -months : months,
    days: isNegative ? -days : days,
    hours: isNegative ? -hours : hours,
    minutes: isNegative ? -minutes : minutes,
    seconds: isNegative ? -seconds : seconds,
    milliseconds: isNegative ? -milliseconds : milliseconds,
    totalMilliseconds,
    totalSeconds,
    totalMinutes,
    totalHours,
    totalDays,
    totalWeeks,
  };
};

export { getTimeUntil, type TimeUntil };
