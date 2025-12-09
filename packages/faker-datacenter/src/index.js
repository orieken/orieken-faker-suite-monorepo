export const createDatacenterFx = (faker) => {
    const telemetrySample = () => ({
        timestamp: faker.date.anytime().toISOString(),
        temperatureC: faker.number.float({ min: 15, max: 40 }),
        humidityPct: faker.number.float({ min: 30, max: 70 }),
        powerKW: faker.number.float({ min: 0.5, max: 15 })
    });
    const telemetrySamples = (count = 10) => Array.from({ length: count }, telemetrySample);
    const rackScenario = () => ({
        id: faker.string.uuid(),
        servers: faker.number.int({ min: 5, max: 40 }),
        telemetry: telemetrySamples(5)
    });
    const rowScenario = (racksPerRow) => ({
        id: faker.string.uuid(),
        racks: Array.from({ length: racksPerRow }, rackScenario)
    });
    const room = (rows = 2, racksPerRow = 4) => ({
        id: faker.string.uuid(),
        rows: Array.from({ length: rows }, () => rowScenario(racksPerRow))
    });
    const coolingUnit = () => ({
        id: faker.string.uuid(),
        capacityKW: faker.number.float({ min: 50, max: 500 }),
        status: faker.number.int({ min: 0, max: 10 }) > 1 ? 'online' : 'standby'
    });
    const coolingUnits = (count = 3) => Array.from({ length: count }, coolingUnit);
    const networkFabric = (room) => {
        const rackIds = room.rows.flatMap(r => r.racks.map(rk => rk.id));
        const cables = [];
        // Simple pair wiring: connect each rack to next one to form a chain
        for (let i = 0; i < rackIds.length - 1; i++) {
            const from = rackIds[i];
            const to = rackIds[i + 1];
            cables.push({
                id: faker.string.uuid(),
                fromRackId: from,
                toRackId: to,
                lengthM: faker.number.float({ min: 2, max: 30 })
            });
        }
        return { cables };
    };
    return { room, telemetrySamples, coolingUnits, networkFabric };
};
export const generateScenario = (faker, options = {}) => {
    const { seed, rooms = 1, rowsPerRoom = 2, racksPerRow = 4, coolingUnits = 3 } = options;
    if (seed !== undefined && typeof faker.seed === 'function') {
        faker.seed(typeof seed === 'number' ? seed : Array.from(String(seed)).map(ch => ch.charCodeAt(0)));
    }
    const fx = createDatacenterFx(faker);
    const roomList = Array.from({ length: rooms }, () => fx.room(rowsPerRoom, racksPerRow));
    const cooling = fx.coolingUnits(coolingUnits);
    // Build fabric using all racks across rooms (merge rooms temporarily)
    const pseudoRoom = { id: 'all', rows: roomList.flatMap(r => r.rows) };
    const fabric = fx.networkFabric(pseudoRoom);
    return {
        rooms: roomList,
        cooling,
        fabric,
        generatedAt: new Date().toISOString(),
        seed
    };
};
