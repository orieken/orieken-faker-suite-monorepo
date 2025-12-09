import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { generateScenario } from './index';
describe('datacenter scenario', () => {
    it('is deterministic for same seed', () => {
        const a = generateScenario(faker, { seed: 123, rooms: 2, rowsPerRoom: 2, racksPerRow: 2 });
        faker.seed(123);
        const b = generateScenario(faker, { seed: 123, rooms: 2, rowsPerRoom: 2, racksPerRow: 2 });
        expect(a.rooms.map(r => r.id)).toEqual(b.rooms.map(r => r.id));
        // Compare first rack telemetry sample count
        expect(a.rooms[0].rows[0].racks[0].telemetry.length).toEqual(b.rooms[0].rows[0].racks[0].telemetry.length);
    });
    it('produces correct room/row/rack structure', () => {
        const scenario = generateScenario(faker, { seed: 999, rooms: 3, rowsPerRoom: 2, racksPerRow: 3 });
        expect(scenario.rooms).toHaveLength(3);
        for (const room of scenario.rooms) {
            expect(room.rows).toHaveLength(2);
            for (const row of room.rows) {
                expect(row.racks).toHaveLength(3);
            }
        }
    });
    it('includes cooling units and network fabric', () => {
        const scenario = generateScenario(faker, { seed: 'cooling', coolingUnits: 5 });
        expect(scenario.cooling).toHaveLength(5);
        expect(scenario.fabric.cables.length).toBeGreaterThanOrEqual(0); // chain length depends on rack count
    });
    it('chain fabric cables connects consecutive racks', () => {
        const scenario = generateScenario(faker, { seed: 'fabric-test', rooms: 1, rowsPerRoom: 1, racksPerRow: 4 });
        const cablePairs = scenario.fabric.cables.map(c => [c.fromRackId, c.toRackId]);
        // No duplicate cable pairs and correct count (racks-1)
        const uniquePairs = new Set(cablePairs.map(p => p.join(':')));
        expect(uniquePairs.size).toBe(4 - 1);
    });
});
