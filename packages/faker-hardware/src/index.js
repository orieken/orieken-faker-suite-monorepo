const vendors = ['Dell', 'HPE', 'Lenovo', 'Supermicro', 'Cisco'];
export const createHardwareFx = (faker) => {
    const rack = () => ({
        uHeight: faker.number.int({ min: 24, max: 54 }),
        depthMm: faker.number.int({ min: 800, max: 1200 }),
        vendor: faker.helpers.arrayElement(vendors)
    });
    const server = () => ({
        cpuSockets: faker.number.int({ min: 1, max: 4 }),
        ramGB: faker.number.int({ min: 32, max: 1024 }),
        nvmeSlots: faker.number.int({ min: 0, max: 16 })
    });
    const powerSupply = () => ({
        wattage: faker.number.int({ min: 400, max: 2000 }),
        redundancy: faker.helpers.arrayElement(['N', 'N+1', '2N'])
    });
    const storageArray = (count = faker.number.int({ min: 4, max: 24 })) => {
        const types = ['HDD', 'SSD', 'NVMe'];
        return Array.from({ length: count }, () => ({
            type: faker.helpers.arrayElement(types),
            capacityGB: faker.number.int({ min: 256, max: 16384 })
        }));
    };
    const networkGear = () => ({
        kind: faker.helpers.arrayElement(['switch', 'router', 'firewall']),
        ports: faker.number.int({ min: 8, max: 128 }),
        throughputGbps: faker.number.int({ min: 1, max: 400 })
    });
    return { rack, server, powerSupply, storageArray, networkGear };
};
const generalPurposeStrategy = {
    name: 'general-purpose',
    generate: (faker) => ({
        cpuSockets: faker.number.int({ min: 1, max: 2 }),
        ramGB: faker.number.int({ min: 32, max: 256 }),
        nvmeSlots: faker.number.int({ min: 0, max: 4 })
    })
};
const highPerformanceStrategy = {
    name: 'high-performance',
    generate: (faker) => ({
        cpuSockets: faker.number.int({ min: 2, max: 4 }),
        ramGB: faker.number.int({ min: 128, max: 1024 }),
        nvmeSlots: faker.number.int({ min: 4, max: 16 })
    })
};
const storageOptimizedStrategy = {
    name: 'storage-optimized',
    generate: (faker) => ({
        cpuSockets: faker.number.int({ min: 1, max: 2 }),
        ramGB: faker.number.int({ min: 64, max: 512 }),
        nvmeSlots: faker.number.int({ min: 8, max: 24 })
    })
};
export const SERVER_STRATEGIES = [
    generalPurposeStrategy,
    highPerformanceStrategy,
    storageOptimizedStrategy
];
export const createSeededHardwareFx = (baseFaker, config = {}) => {
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
