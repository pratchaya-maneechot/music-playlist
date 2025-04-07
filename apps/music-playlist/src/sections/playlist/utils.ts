export function calculateTotalDurationFromStrings(
  durations: { duration: string }[]
): string {
  const totalSeconds = durations.reduce((sum, item) => {
    const [minutes, seconds] = item.duration.split(':').map(Number);
    return sum + minutes * 60 + seconds;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  if (hours > 0) {
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${hours}:${minutesStr}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
