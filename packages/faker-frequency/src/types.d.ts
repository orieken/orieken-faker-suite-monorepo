export type FrequencyBand = 'VHF' | 'UHF' | 'SHF' | 'EHF';
export type FrequencyUnit = 'Hz' | 'kHz' | 'MHz' | 'GHz';
export interface BandRange {
    minHz: number;
    maxHz: number;
}
export interface FrequencyOptions {
    band: FrequencyBand;
    unit?: FrequencyUnit;
    min?: number;
    max?: number;
}
export interface ChannelOptions extends FrequencyOptions {
    bandwidthHz?: number;
}
export interface ChannelSpec {
    band: FrequencyBand;
    centerHz: number;
    bandwidthHz: number;
    center: number;
    unit: FrequencyUnit;
}
export interface FrequencyFx {
    generateFrequency(options: FrequencyOptions): number;
    generateChannel(options: ChannelOptions): ChannelSpec;
}
export interface FrequencyFxConfig {
    seed?: number | string;
    bandOverrides?: Partial<Record<FrequencyBand, {
        minHz: number;
        maxHz: number;
    }>>;
}
export interface Seeded<Fx> {
    config: FrequencyFxConfig;
    fx: Fx;
}
