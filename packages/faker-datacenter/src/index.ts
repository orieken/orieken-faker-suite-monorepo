export interface RackPosition { rackIndex: number; unitIndex: number; }
export interface RackScenario { id: string; servers: number; telemetry: TelemetrySample[]; }
export interface RowScenario { id: string; racks: RackScenario[]; }
export interface RoomScenario { id: string; rows: RowScenario[]; }
export interface TelemetrySample { timestamp: string; temperatureC: number; humidityPct: number; powerKW: number; }
export interface CoolingUnit { id: string; capacityKW: number; status: 'online' | 'standby' | 'offline'; }
export interface Cable { id: string; fromRackId: string; toRackId: string; lengthM: number; }
export interface NetworkFabric { cables: Cable[]; }

export interface DatacenterFx {
  room(rows?: number, racksPerRow?: number): RoomScenario;
  telemetrySamples(count?: number): TelemetrySample[];
  coolingUnits(count?: number): CoolingUnit[];
  networkFabric(room: RoomScenario): NetworkFabric;
}

export const createDatacenterFx = (faker: {
  string: { uuid: () => string };
  number: { int: (o: { min: number; max: number }) => number; float: (o: { min: number; max: number }) => number };
  date: { anytime: () => Date };
}): DatacenterFx => {
  const telemetrySample = (): TelemetrySample => ({
    timestamp: faker.date.anytime().toISOString(),
    temperatureC: faker.number.float({ min: 15, max: 40 }),
    humidityPct: faker.number.float({ min: 30, max: 70 }),
    powerKW: faker.number.float({ min: 0.5, max: 15 })
  });

  const telemetrySamples = (count: number = 10): TelemetrySample[] => Array.from({ length: count }, telemetrySample);

  const rackScenario = (): RackScenario => ({
    id: faker.string.uuid(),
    servers: faker.number.int({ min: 5, max: 40 }),
    telemetry: telemetrySamples(5)
  });

  const rowScenario = (racksPerRow: number): RowScenario => ({
    id: faker.string.uuid(),
    racks: Array.from({ length: racksPerRow }, rackScenario)
  });

  const room = (rows: number = 2, racksPerRow: number = 4): RoomScenario => ({
    id: faker.string.uuid(),
    rows: Array.from({ length: rows }, () => rowScenario(racksPerRow))
  });

  const coolingUnit = (): CoolingUnit => ({
    id: faker.string.uuid(),
    capacityKW: faker.number.float({ min: 50, max: 500 }),
    status: faker.number.int({ min: 0, max: 10 }) > 1 ? 'online' : 'standby'
  });
  const coolingUnits = (count: number = 3): CoolingUnit[] => Array.from({ length: count }, coolingUnit);

  const networkFabric = (room: RoomScenario): NetworkFabric => {
    const rackIds: string[] = room.rows.flatMap(r => r.racks.map(rk => rk.id));
    const cables: Cable[] = [];
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

export interface DatacenterScenario {
  rooms: RoomScenario[];
  cooling: CoolingUnit[];
  fabric: NetworkFabric;
  generatedAt: string;
  seed?: number | string;
}

export interface DatacenterScenarioOptions {
  seed?: number | string;
  rooms?: number;
  rowsPerRoom?: number;
  racksPerRow?: number;
  coolingUnits?: number;
}

export const generateScenario = (
  faker: any,
  options: DatacenterScenarioOptions = {}
): DatacenterScenario => {
  const { seed, rooms = 1, rowsPerRoom = 2, racksPerRow = 4, coolingUnits = 3 } = options;
  if (seed !== undefined && typeof faker.seed === 'function') {
    faker.seed(typeof seed === 'number' ? seed : Array.from(String(seed)).map(ch => ch.charCodeAt(0)));
  }
  const fx = createDatacenterFx(faker);
  const roomList: RoomScenario[] = Array.from({ length: rooms }, () => fx.room(rowsPerRoom, racksPerRow));
  const cooling = fx.coolingUnits(coolingUnits);
  // Build fabric using all racks across rooms (merge rooms temporarily)
  const pseudoRoom: RoomScenario = { id: 'all', rows: roomList.flatMap(r => r.rows) };
  const fabric = fx.networkFabric(pseudoRoom);
  return {
    rooms: roomList,
    cooling,
    fabric,
    generatedAt: new Date().toISOString(),
    seed
  };
};
