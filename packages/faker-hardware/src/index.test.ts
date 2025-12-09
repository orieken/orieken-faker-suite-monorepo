import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { createSeededHardwareFx, SERVER_STRATEGIES } from './index';

describe('hardware faker', () => {
  it('produces deterministic rack specs with same seed', () => {
    const { fx: fxA } = createSeededHardwareFx(faker, { seed: 42 });
    const rackA = fxA.rack();
    faker.seed(42);
    const { fx: fxB } = createSeededHardwareFx(faker, { seed: 42 });
    const rackB = fxB.rack();
    expect(rackA).toEqual(rackB);
  });

  it('enforces server strategy bounds (high-performance)', () => {
    const { fx } = createSeededHardwareFx(faker, { seed: 777, serverStrategy: 'high-performance' });
    const server = fx.server();
    expect(server.cpuSockets).toBeGreaterThanOrEqual(2);
    expect(server.cpuSockets).toBeLessThanOrEqual(4);
    expect(server.ramGB).toBeGreaterThanOrEqual(128);
    expect(server.ramGB).toBeLessThanOrEqual(1024);
    expect(server.nvmeSlots).toBeGreaterThanOrEqual(4);
    expect(server.nvmeSlots).toBeLessThanOrEqual(16);
  });

  it('falls back to general-purpose strategy when unknown', () => {
    const { fx } = createSeededHardwareFx(faker, { seed: 1, serverStrategy: 'non-existent' });
    expect(fx.strategy.name).toBe('general-purpose');
  });

  it('storage array respects bounds', () => {
    const { fx } = createSeededHardwareFx(faker, { seed: 999 });
    const arr = fx.storageArray(10);
    expect(arr).toHaveLength(10);
    for (const dev of arr) {
      expect(dev.capacityGB).toBeGreaterThanOrEqual(256);
      expect(dev.capacityGB).toBeLessThanOrEqual(16384);
    }
  });

  it('network gear ports and throughput within bounds', () => {
    const { fx } = createSeededHardwareFx(faker, { seed: 1234 });
    const gear = fx.networkGear();
    expect(gear.ports).toBeGreaterThanOrEqual(8);
    expect(gear.ports).toBeLessThanOrEqual(128);
    expect(gear.throughputGbps).toBeGreaterThanOrEqual(1);
    expect(gear.throughputGbps).toBeLessThanOrEqual(400);
  });

  it('exports all server strategies', () => {
    const names = SERVER_STRATEGIES.map(s => s.name).sort();
    expect(names).toEqual(['general-purpose', 'high-performance', 'storage-optimized'].sort());
  });
});

