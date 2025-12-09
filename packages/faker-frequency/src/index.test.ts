import { describe, it, expect } from 'vitest';
import { createSeededFrequencyFx, toHz, fromHz } from './index';
import { faker } from '@faker-js/faker';

describe('frequency faker', () => {
  it('produces deterministic frequency for same seed', () => {
    const { fx: fxA } = createSeededFrequencyFx(faker, { seed: 123 });
    const valA = fxA.generateFrequency({ band: 'VHF' });
    faker.seed(123); // reset seed
    const { fx: fxB } = createSeededFrequencyFx(faker, { seed: 123 });
    const valB = fxB.generateFrequency({ band: 'VHF' });
    expect(valA).toBe(valB);
  });

  it('applies band overrides', () => {
    const overrideMin = 50e6; // 50 MHz
    const overrideMax = 55e6; // 55 MHz
    const { fx } = createSeededFrequencyFx(faker, {
      seed: 'override-test',
      bandOverrides: { VHF: { minHz: overrideMin, maxHz: overrideMax } }
    });
    const val = fx.generateFrequency({ band: 'VHF', unit: 'MHz' });
    expect(val).toBeGreaterThanOrEqual(overrideMin / 1e6);
    expect(val).toBeLessThanOrEqual(overrideMax / 1e6);
  });

  it('derives channel bandwidth if not provided', () => {
    const { fx } = createSeededFrequencyFx(faker, { seed: 999 });
    const channel = fx.generateChannel({ band: 'UHF' });
    // UHF span = 3e9 - 3e8 = 2.7e9 -> 1% = 27e6
    expect(channel.bandwidthHz).toBeCloseTo((3e9 - 300e6) * 0.01, -2); // allow rounding tolerance
  });

  it('converts units correctly', () => {
    const hz = toHz(1, 'GHz');
    expect(hz).toBe(1e9);
    const ghz = fromHz(2e9, 'GHz');
    expect(ghz).toBe(2);
  });

  it('throws on invalid override ranges', () => {
    expect(() => createSeededFrequencyFx(faker, {
      bandOverrides: { SHF: { minHz: 10, maxHz: 5 } }
    })).toThrow();
  });

  it('throws when min equals max (invalid range)', () => {
    const { fx } = createSeededFrequencyFx(faker, { seed: 1 });
    expect(() => fx.generateFrequency({ band: 'VHF', unit: 'MHz', min: 100, max: 100 })).toThrow();
  });

  it('does not mutate overrides object passed in', () => {
    const overrides = { VHF: { minHz: 31e6, maxHz: 32e6 } } as const;
    const snapshot = JSON.parse(JSON.stringify(overrides));
    const { fx } = createSeededFrequencyFx(faker, { seed: 2, bandOverrides: overrides });
    fx.generateFrequency({ band: 'VHF', unit: 'MHz' });
    expect(overrides).toEqual(snapshot);
  });
});
