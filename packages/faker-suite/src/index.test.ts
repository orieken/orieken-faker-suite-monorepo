import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { fakerSuite } from './index';

describe('fakerSuite facade', () => {
  it('provides frequency, hardware, datacenter modules', () => {
    const fx = fakerSuite(faker, { seed: 101 });
    expect(fx.frequency.generateFrequency).toBeDefined();
    expect(fx.hardware.server).toBeDefined();
    expect(fx.datacenter.scenario.generate).toBeDefined();
  });

  it('generates deterministic scenario through facade', () => {
    const fxA = fakerSuite(faker, { seed: 202 });
    const scenarioA = fxA.datacenter.scenario.generate({ rooms: 1, rowsPerRoom: 1, racksPerRow: 2 });
    faker.seed(202);
    const fxB = fakerSuite(faker, { seed: 202 });
    const scenarioB = fxB.datacenter.scenario.generate({ rooms: 1, rowsPerRoom: 1, racksPerRow: 2 });
    expect(scenarioA.rooms[0].rows[0].racks.map(r => r.id)).toEqual(
      scenarioB.rooms[0].rows[0].racks.map(r => r.id)
    );
  });

  it('applies nested config overrides (frequency unit override)', () => {
    const fx = fakerSuite(faker, { seed: 303, frequency: { bandOverrides: { VHF: { minHz: 40e6, maxHz: 41e6 } } } });
    const valueMHz = fx.frequency.generateFrequency({ band: 'VHF', unit: 'MHz' });
    expect(valueMHz).toBeGreaterThanOrEqual(40);
    expect(valueMHz).toBeLessThanOrEqual(41);
  });
});

