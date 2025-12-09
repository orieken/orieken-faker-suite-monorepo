export type FrequencyBand = 'VHF' | 'UHF' | 'SHF' | 'EHF';
export type FrequencyUnit = 'Hz' | 'kHz' | 'MHz' | 'GHz';

export interface BandRange { minHz: number; maxHz: number; }

export interface FrequencyOptions {
  band: FrequencyBand;
  unit?: FrequencyUnit; // default MHz for VHF/UHF, GHz for SHF/EHF
  min?: number; // expressed in chosen unit
  max?: number; // expressed in chosen unit
}

export interface ChannelOptions extends FrequencyOptions {
  bandwidthHz?: number; // if omitted derive proportionally
}

export interface ChannelSpec {
  band: FrequencyBand;
  centerHz: number;
  bandwidthHz: number;
  center: number; // in requested unit
  unit: FrequencyUnit;
}

export interface FrequencyFx {
  generateFrequency(options: FrequencyOptions): number; // value in requested unit
  generateChannel(options: ChannelOptions): ChannelSpec;
}

export interface FrequencyFxConfig {
  seed?: number | string; // optional seed for deterministic behavior
  bandOverrides?: Partial<Record<FrequencyBand, { minHz: number; maxHz: number }>>;
}

export interface Seeded<Fx> {
  config: FrequencyFxConfig;
  fx: Fx;
}
