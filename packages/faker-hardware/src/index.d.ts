export interface RackSpec {
    uHeight: number;
    depthMm: number;
    vendor: string;
}
export interface ServerSpec {
    cpuSockets: number;
    ramGB: number;
    nvmeSlots: number;
}
export interface PowerSupplySpec {
    wattage: number;
    redundancy: 'N' | 'N+1' | '2N';
}
export interface StorageDevice {
    type: 'HDD' | 'SSD' | 'NVMe';
    capacityGB: number;
}
export interface NetworkGear {
    kind: 'switch' | 'router' | 'firewall';
    ports: number;
    throughputGbps: number;
}
export interface HardwareFx {
    rack(): RackSpec;
    server(): ServerSpec;
    powerSupply(): PowerSupplySpec;
    storageArray(count?: number): StorageDevice[];
    networkGear(): NetworkGear;
}
export declare const createHardwareFx: (faker: {
    number: {
        int: (o: {
            min: number;
            max: number;
        }) => number;
    };
    helpers: {
        arrayElement: <T>(arr: T[]) => T;
    };
}) => HardwareFx;
export interface ServerProfileStrategy {
    name: string;
    generate(faker: {
        number: {
            int: (o: {
                min: number;
                max: number;
            }) => number;
        };
    }): ServerSpec;
}
export declare const SERVER_STRATEGIES: ServerProfileStrategy[];
export interface HardwareFxConfig {
    seed?: number | string;
    serverStrategy?: string;
}
export interface SeededHardwareFx {
    config: HardwareFxConfig;
    fx: HardwareFx & {
        strategy: ServerProfileStrategy;
    };
}
export declare const createSeededHardwareFx: (baseFaker: any, config?: HardwareFxConfig) => SeededHardwareFx;
