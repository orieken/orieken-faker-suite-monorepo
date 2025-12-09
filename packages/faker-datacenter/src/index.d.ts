export interface RackPosition {
    rackIndex: number;
    unitIndex: number;
}
export interface RackScenario {
    id: string;
    servers: number;
    telemetry: TelemetrySample[];
}
export interface RowScenario {
    id: string;
    racks: RackScenario[];
}
export interface RoomScenario {
    id: string;
    rows: RowScenario[];
}
export interface TelemetrySample {
    timestamp: string;
    temperatureC: number;
    humidityPct: number;
    powerKW: number;
}
export interface CoolingUnit {
    id: string;
    capacityKW: number;
    status: 'online' | 'standby' | 'offline';
}
export interface Cable {
    id: string;
    fromRackId: string;
    toRackId: string;
    lengthM: number;
}
export interface NetworkFabric {
    cables: Cable[];
}
export interface DatacenterFx {
    room(rows?: number, racksPerRow?: number): RoomScenario;
    telemetrySamples(count?: number): TelemetrySample[];
    coolingUnits(count?: number): CoolingUnit[];
    networkFabric(room: RoomScenario): NetworkFabric;
}
export declare const createDatacenterFx: (faker: {
    string: {
        uuid: () => string;
    };
    number: {
        int: (o: {
            min: number;
            max: number;
        }) => number;
        float: (o: {
            min: number;
            max: number;
        }) => number;
    };
    date: {
        anytime: () => Date;
    };
}) => DatacenterFx;
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
export declare const generateScenario: (faker: any, options?: DatacenterScenarioOptions) => DatacenterScenario;
