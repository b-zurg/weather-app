/**
 * Generates an array of steps from a starting point with a given interval, bounded by a stopping point
 */
export const generateTicks = ({
  start,
  step,
  stop,
}: {
  start: number;
  step: number;
  stop: number;
}): number[] => {
  const ticks: number[] = [];
  for (let i = start; i < stop; i = i + step) {
    ticks.push(i);
  }
  return ticks;
};
