type ScaleInputFunction<I, O> = (input: I) => O;
type ScaleFunction<D, R> = (
  params: DomainAndRange<D, R>
) => ScaleInputFunction<D, R>;
type DomainAndRange<D, R> = {
  from: [D, D];
  to: [R, R];
};

/**
 * Returns a scale function that will take in a single number input. Given a value from the domain, this function will return a scaled value from the range.
 * @param domain min/max bound of possible input values to the scale function
 * @param range min/max bound of possible output values to the scale function
 * @returns
 */
export const scaleLinear: ScaleFunction<number, number> = ({ from, to }) => {
  if (from[1] < from[0] || to[1] < to[0]) {
    throw new Error(
      "Scale failed, domain and range must each consist of two values where the second is larger than the first"
    );
  }
  const scale = (to[1] - to[0]) / (from[1] - from[0]);

  return (input) => {
    const capped = Math.min(from[1], Math.max(from[0], input)) - from[0];
    return capped * scale + to[0];
  };
};

/**
 * Returns a scale function that will take in a single date input. Given a value from the domain, this function will return a scaled value from the range.
 * @param domain min/max bound of possible input values to the scale function
 * @param range min/max bound of possible output values to the scale function
 * @returns
 */
export const scaleTime: ScaleFunction<Date, number> = ({ from, to }) => {
  const domainAsMs = from.map((date) => date.valueOf()) as [number, number];
  const scale = scaleLinear({
    from: domainAsMs as [number, number],
    to,
  });
  return (input) => {
    return scale(input.valueOf());
  };
};

export const scaleTimeInvert: ScaleFunction<number, Date> = ({ from, to }) => {
  const rangeAsMs = to.map((date) => date.valueOf()) as [number, number];
  const scale = scaleLinear({ from, to: rangeAsMs });
  return (input) => new Date(scale(input));
};
