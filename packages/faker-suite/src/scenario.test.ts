import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { fakerSuite } from './index';

describe('scenario engine', () => {
  it('generates rooms→rows→racks→servers→telemetry with generatedAt', () => {
    const fx = fakerSuite(faker, { seed: 42 });
    const s = fx.datacenter.scenario.generate({ rooms: 1, rowsPerRoom: 1, racksPerRow: 2, telemetryPerRack: 3 });
    expect(s.generatedAt).toBeDefined();
    expect(s.rooms).toHaveLength(1);
    expect(s.rooms[0].rows).toHaveLength(1);
    expect(s.rooms[0].rows[0].racks).toHaveLength(2);
    const rack = s.rooms[0].rows[0].racks[0];
    expect(Array.isArray(rack.servers)).toBe(true);
    expect(Array.isArray(rack.telemetry)).toBe(true);
    expect(rack.telemetry).toHaveLength(3);
  });

  it('is deterministic with the same seed', () => {
    const a = fakerSuite(faker, { seed: 111 });
    const sa = a.datacenter.scenario.generate({ rooms: 1, rowsPerRoom: 1, racksPerRow: 2 });
    faker.seed(111);
    const b = fakerSuite(faker, { seed: 111 });
    const sb = b.datacenter.scenario.generate({ rooms: 1, rowsPerRoom: 1, racksPerRow: 2 });
    const rackIdsA = sa.rooms[0].rows[0].racks.map(r => r.id);
    const rackIdsB = sb.rooms[0].rows[0].racks.map(r => r.id);
    expect(rackIdsA).toEqual(rackIdsB);
    expect(sa.rooms[0].rows[0].racks[0].servers.length).toEqual(sb.rooms[0].rows[0].racks[0].servers.length);
  });
});

