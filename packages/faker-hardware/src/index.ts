export interface RackSpec { uHeight: number; depthMm: number; vendor: string; }
export interface ServerSpec { cpuSockets: number; ramGB: number; nvmeSlots: number; }
export interface PowerSupplySpec { wattage: number; redundancy: 'N' | 'N+1' | '2N'; }
export interface StorageDevice { type: 'HDD' | 'SSD' | 'NVMe'; capacityGB: number; }
export interface NetworkGear { kind: 'switch' | 'router' | 'firewall'; ports: number; throughputGbps: number; }

export interface HardwareFx {
  rack(): RackSpec;
  server(): ServerSpec;
  powerSupply(): PowerSupplySpec;
  storageArray(count?: number): StorageDevice[];
  networkGear(): NetworkGear;
}

const vendors = ['Dell', 'HPE', 'Lenovo', 'Supermicro', 'Cisco'];

export const createHardwareFx = (faker: {
  number: { int: (o: { min: number; max: number }) => number };
  helpers: { arrayElement: <T>(arr: T[]) => T };
}): HardwareFx => {
  const rack = (): RackSpec => ({
    uHeight: faker.number.int({ min: 24, max: 54 }),
    depthMm: faker.number.int({ min: 800, max: 1200 }),
    vendor: faker.helpers.arrayElement(vendors)
  });
  const server = (): ServerSpec => ({
    cpuSockets: faker.number.int({ min: 1, max: 4 }),
    ramGB: faker.number.int({ min: 32, max: 1024 }),
    nvmeSlots: faker.number.int({ min: 0, max: 16 })
  });
  const powerSupply = (): PowerSupplySpec => ({
    wattage: faker.number.int({ min: 400, max: 2000 }),
    redundancy: faker.helpers.arrayElement(['N', 'N+1', '2N'])
  });
  const storageArray = (count: number = faker.number.int({ min: 4, max: 24 })): StorageDevice[] => {
    const types: StorageDevice['type'][] = ['HDD', 'SSD', 'NVMe'];
    return Array.from({ length: count }, () => ({
      type: faker.helpers.arrayElement(types),
      capacityGB: faker.number.int({ min: 256, max: 16384 })
    }));
  };
  const networkGear = (): NetworkGear => ({
    kind: faker.helpers.arrayElement(['switch', 'router', 'firewall']),
    ports: faker.number.int({ min: 8, max: 128 }),
    throughputGbps: faker.number.int({ min: 1, max: 400 })
  });

  return { rack, server, powerSupply, storageArray, networkGear };
};

export interface ServerProfileStrategy {
  name: string;
  generate(faker: { number: { int: (o: { min: number; max: number }) => number } }): ServerSpec;
}

const generalPurposeStrategy: ServerProfileStrategy = {
  name: 'general-purpose',
  generate: (faker) => ({
    cpuSockets: faker.number.int({ min: 1, max: 2 }),
    ramGB: faker.number.int({ min: 32, max: 256 }),
    nvmeSlots: faker.number.int({ min: 0, max: 4 })
  })
};

const highPerformanceStrategy: ServerProfileStrategy = {
  name: 'high-performance',
  generate: (faker) => ({
    cpuSockets: faker.number.int({ min: 2, max: 4 }),
    ramGB: faker.number.int({ min: 128, max: 1024 }),
    nvmeSlots: faker.number.int({ min: 4, max: 16 })
  })
};

const storageOptimizedStrategy: ServerProfileStrategy = {
  name: 'storage-optimized',
  generate: (faker) => ({
    cpuSockets: faker.number.int({ min: 1, max: 2 }),
    ramGB: faker.number.int({ min: 64, max: 512 }),
    nvmeSlots: faker.number.int({ min: 8, max: 24 })
  })
};

export const SERVER_STRATEGIES: ServerProfileStrategy[] = [
  generalPurposeStrategy,
  highPerformanceStrategy,
  storageOptimizedStrategy
];

export interface HardwareFxConfig {
  seed?: number | string;
  serverStrategy?: string; // name of strategy
}

export interface SeededHardwareFx {
  config: HardwareFxConfig;
  fx: HardwareFx & { strategy: ServerProfileStrategy };
}

export const createSeededHardwareFx = (
  baseFaker: any,
  config: HardwareFxConfig = {}
): SeededHardwareFx => {
  const { seed, serverStrategy } = config;
  if (seed !== undefined && typeof baseFaker.seed === 'function') {
    baseFaker.seed(typeof seed === 'number' ? seed : Array.from(String(seed)).map(ch => ch.charCodeAt(0)));
  }
  const strategy = SERVER_STRATEGIES.find(s => s.name === serverStrategy) || generalPurposeStrategy;
  const core = createHardwareFx(baseFaker);
  // Wrap server method to use strategy
  const server = () => strategy.generate(baseFaker);
  return { config, fx: { ...core, server, strategy } };
};
