import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { fakerSuite } from '@orieken/faker-suite';

describe('fakerSuite facade integration (playground)', () => {
  it('produces deterministic frequency values with same seed', () => {
    const fx1 = fakerSuite(faker, { seed: 321 });
    const v1 = fx1.frequency.generateFrequency({ band: 'VHF', unit: 'MHz' });
    faker.seed(321);
    const fx2 = fakerSuite(faker, { seed: 321 });
    const v2 = fx2.frequency.generateFrequency({ band: 'VHF', unit: 'MHz' });
    expect(v1).toBe(v2);
  });

  it('can generate a small datacenter scenario', () => {
    const fx = fakerSuite(faker, { seed: 'play' });
    const scenario = fx.datacenter.scenario.generate({ rooms: 1, rowsPerRoom: 1, racksPerRow: 2 });
    expect(scenario.rooms).toHaveLength(1);
    expect(scenario.rooms[0].rows).toHaveLength(1);
    expect(scenario.rooms[0].rows[0].racks).toHaveLength(2);
  });
});
