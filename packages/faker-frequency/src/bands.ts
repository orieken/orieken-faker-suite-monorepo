import type { BandRange, FrequencyBand, FrequencyFxConfig } from './types';

export const BAND_RANGES: Record<FrequencyBand, BandRange> = {
  VHF: { minHz: 30e6, maxHz: 300e6 },
  UHF: { minHz: 300e6, maxHz: 3e9 },
  SHF: { minHz: 3e9, maxHz: 30e9 },
  EHF: { minHz: 30e9, maxHz: 300e9 }
};

export const assertRange = (min: number, max: number) => {
  if (min >= max) throw new Error(`Invalid range: min (${min}) must be < max (${max})`);
};

export const applyOverrides = (overrides: FrequencyFxConfig['bandOverrides']): Record<FrequencyBand, BandRange> => {
  if (!overrides) return { ...BAND_RANGES };
  const copy: Record<FrequencyBand, BandRange> = { ...BAND_RANGES } as Record<FrequencyBand, BandRange>;
  for (const band of Object.keys(overrides) as FrequencyBand[]) {
    const ov = overrides[band];
    if (!ov) continue;
    if (ov.minHz >= ov.maxHz) throw new Error(`Override for band ${band} invalid: minHz >= maxHz`);
    copy[band] = { minHz: ov.minHz, maxHz: ov.maxHz };
  }
  return copy;
};

