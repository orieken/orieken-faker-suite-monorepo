import type { ChannelOptions, ChannelSpec, FrequencyFx, FrequencyFxConfig, FrequencyOptions } from './types';
import { BAND_RANGES, applyOverrides, assertRange } from './bands';
import { fromHz, toHz, defaultUnitForBand } from './units';

export const createFrequencyFx = (faker: { number: { float: (o: { min: number; max: number }) => number } }): FrequencyFx => {
  const generateFrequency = (options: FrequencyOptions): number => {
    const unit = options.unit || defaultUnitForBand(options.band);
    const bandRange = BAND_RANGES[options.band];
    const bandMinUnit = fromHz(bandRange.minHz, unit);
    const bandMaxUnit = fromHz(bandRange.maxHz, unit);
    const min = options.min ?? bandMinUnit;
    const max = options.max ?? bandMaxUnit;
    assertRange(min, max);
    return faker.number.float({ min, max });
  };

  const generateChannel = (options: ChannelOptions): ChannelSpec => {
    const unit = options.unit || defaultUnitForBand(options.band);
    const center = generateFrequency(options);
    const centerHz = toHz(center, unit);
    const bandRange = BAND_RANGES[options.band];
    const spanHz = bandRange.maxHz - bandRange.minHz;
    const bandwidthHz = options.bandwidthHz ?? spanHz * 0.01;
    return { band: options.band, centerHz, bandwidthHz, center, unit };
  };

  return { generateFrequency, generateChannel };
};

export const createSeededFrequencyFx = (
  baseFaker: any,
  config: FrequencyFxConfig = {}
): { config: FrequencyFxConfig; fx: FrequencyFx } => {
  const { seed } = config;
  let fakerInstance = baseFaker;
  if (seed !== undefined && typeof baseFaker.seed === 'function') {
    fakerInstance = baseFaker;
    baseFaker.seed(typeof seed === 'number' ? seed : Array.from(String(seed)).map(ch => ch.charCodeAt(0)));
  }
  const overriddenRanges = applyOverrides(config.bandOverrides);

  const generateFrequency = (options: FrequencyOptions): number => {
    const unit = options.unit || defaultUnitForBand(options.band);
    const bandRange = overriddenRanges[options.band];
    const bandMinUnit = fromHz(bandRange.minHz, unit);
    const bandMaxUnit = fromHz(bandRange.maxHz, unit);
    const min = options.min ?? bandMinUnit;
    const max = options.max ?? bandMaxUnit;
    assertRange(min, max);
    return fakerInstance.number.float({ min, max });
  };

  const generateChannel = (options: ChannelOptions): ChannelSpec => {
    const unit = options.unit || defaultUnitForBand(options.band);
    const center = generateFrequency(options);
    const centerHz = toHz(center, unit);
    const bandRange = overriddenRanges[options.band];
    const spanHz = bandRange.maxHz - bandRange.minHz;
    const bandwidthHz = options.bandwidthHz ?? spanHz * 0.01;
    return { band: options.band, centerHz, bandwidthHz, center, unit };
  };

  return { config, fx: { generateFrequency, generateChannel } };
};

export const frequencyBands = Object.keys(BAND_RANGES) as (keyof typeof BAND_RANGES)[];

