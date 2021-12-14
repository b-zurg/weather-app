/**
 * Joins a number array with a provided suffix. Also trims whitespace from the end of the resulting string.
 */
export const joinWith = (values: number[], suffix: string) =>
  values.join(suffix) + suffix.trim();
