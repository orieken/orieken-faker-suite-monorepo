import type { FrequencyUnit, FrequencyBand } from './types';

const UNIT_FACTORS: Record<FrequencyUnit, number> = {
  Hz: 1,
  kHz: 1e3,
  MHz: 1e6,
  GHz: 1e9
};

export const toHz = (value: number, unit: FrequencyUnit): number => value * UNIT_FACTORS[unit];
export const fromHz = (hz: number, unit: FrequencyUnit): number => hz / UNIT_FACTORS[unit];

export const defaultUnitForBand = (band: FrequencyBand): FrequencyUnit => {
  switch (band) {
    case 'VHF':
    case 'UHF':
      return 'MHz';
    case 'SHF':
    case 'EHF':
      return 'GHz';
  }
};

