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

  const totalMilliseconds = diffMs;
  const totalSeconds = diffMs / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;
  const totalWeeks = totalDays / 7;

  const absDiffMs = Math.abs(diffMs);

  const milliseconds = absDiffMs % 1000;
  const seconds = Math.floor(absDiffMs / 1000) % 60;
  const minutes = Math.floor(absDiffMs / (1000 * 60)) % 60;
  const hours = Math.floor(absDiffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24)) % 30;
  const months = Math.floor(absDiffMs / (1000 * 60 * 60 * 24 * 30)) % 12;
  const years = Math.floor(absDiffMs / (1000 * 60 * 60 * 24 * 365));

  return {
    years: diffMs < 0 ? -years : years,
    months: diffMs < 0 ? -months : months,
    days: diffMs < 0 ? -days : days,
    hours: diffMs < 0 ? -hours : hours,
    minutes: diffMs < 0 ? -minutes : minutes,
    seconds: diffMs < 0 ? -seconds : seconds,
    milliseconds: diffMs < 0 ? -milliseconds : milliseconds,
    totalMilliseconds,
    totalSeconds,
    totalMinutes,
    totalHours,
    totalDays,
    totalWeeks,
  };
};

export { getTimeUntil };
