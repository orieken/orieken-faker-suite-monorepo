import type { BandRange, FrequencyBand, FrequencyFxConfig } from './types';
export declare const BAND_RANGES: Record<FrequencyBand, BandRange>;
export declare const assertRange: (min: number, max: number) => void;
export declare const applyOverrides: (overrides: FrequencyFxConfig["bandOverrides"]) => Record<FrequencyBand, BandRange>;
