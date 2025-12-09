import type { FrequencyFx, FrequencyFxConfig } from './types';
import { BAND_RANGES } from './bands';
export declare const createFrequencyFx: (faker: {
    number: {
        float: (o: {
            min: number;
            max: number;
        }) => number;
    };
}) => FrequencyFx;
export declare const createSeededFrequencyFx: (baseFaker: any, config?: FrequencyFxConfig) => {
    config: FrequencyFxConfig;
    fx: FrequencyFx;
};
export declare const frequencyBands: (keyof typeof BAND_RANGES)[];
