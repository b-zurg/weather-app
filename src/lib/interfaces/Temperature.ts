export interface TemperatureSnapshot {
  current: number;
  high: number;
  low: number;
}

export enum TemperatureUnit {
  Centigrade,
  Farenheit,
}
