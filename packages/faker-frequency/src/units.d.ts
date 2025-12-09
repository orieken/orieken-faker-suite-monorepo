import type { FrequencyUnit, FrequencyBand } from './types';
export declare const toHz: (value: number, unit: FrequencyUnit) => number;
export declare const fromHz: (hz: number, unit: FrequencyUnit) => number;
export declare const defaultUnitForBand: (band: FrequencyBand) => FrequencyUnit;
