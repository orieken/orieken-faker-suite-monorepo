import { createSeededFrequencyFx, FrequencyFxConfig } from '@orieken/faker-frequency';
import { createSeededHardwareFx, HardwareFxConfig, ServerSpec } from '@orieken/faker-hardware';
import { createDatacenterFx, DatacenterScenarioOptions as RawOptions } from '@orieken/faker-datacenter';

export interface DatacenterScenarioOptions {
  rooms?: number;
  rowsPerRoom?: number;
  racksPerRow?: number;
  telemetryPerRack?: number;
}

export interface EngineTelemetrySample {
  timestamp: string;
  temperatureC: number;
  humidityPct: number;
  powerKW: number;
}

export interface EngineRackScenario {
  id: string;
  servers: ServerSpec[];
  telemetry: EngineTelemetrySample[];
}
export interface EngineRowScenario { id: string; racks: EngineRackScenario[]; }
export interface EngineRoomScenario { id: string; rows: EngineRowScenario[]; }
export interface DatacenterScenario { rooms: EngineRoomScenario[]; generatedAt: string }

export interface FakerSuiteConfig {
  seed?: number | string;
  frequency?: FrequencyFxConfig;
  hardware?: HardwareFxConfig;
  datacenter?: DatacenterScenarioOptions;
}

export interface FakerSuiteFx {
  frequency: ReturnType<typeof createSeededFrequencyFx>['fx'];
  hardware: ReturnType<typeof createSeededHardwareFx>['fx'];
  datacenter: {
    scenario: {
      generate: (options?: DatacenterScenarioOptions) => DatacenterScenario;
    }
  };
  seed?: number | string;
}

export const fakerSuite = (faker: any, config: FakerSuiteConfig = {}): FakerSuiteFx => {
  const seed = config.seed;
  if (seed !== undefined && typeof faker.seed === 'function') {
    faker.seed(typeof seed === 'number' ? seed : Array.from(String(seed)).map(ch => ch.charCodeAt(0)));
  }
  const frequency = createSeededFrequencyFx(faker, { seed, ...(config.frequency || {}) }).fx;
  const hardwareSeed = createSeededHardwareFx(faker, { seed, ...(config.hardware || {}) });
  const hardware = hardwareSeed.fx;

  const datacenter = {
    scenario: {
      generate: (options: DatacenterScenarioOptions = {}): DatacenterScenario => {
        const { rooms = 1, rowsPerRoom = 2, racksPerRow = 4, telemetryPerRack = 5 } = { ...(config.datacenter || {}), ...options };
        const dcf = createDatacenterFx(faker);
        // Build room skeletons
        const skeletonRooms = Array.from({ length: rooms }, () => dcf.room(rowsPerRoom, racksPerRow));
        // Fill racks with servers and telemetry
        const roomsOut: EngineRoomScenario[] = skeletonRooms.map(room => ({
          id: room.id,
          rows: room.rows.map(row => ({
            id: row.id,
            racks: row.racks.map(rk => {
              const serverCount = rk.servers; // numeric count from datacenter skeleton
              return {
                id: rk.id,
                servers: Array.from({ length: serverCount }, () => hardware.server()),
                telemetry: dcf.telemetrySamples(telemetryPerRack)
              };
            })
          }))
        }));
        return { rooms: roomsOut, generatedAt: new Date().toISOString() };
      }
    }
  };
  return { frequency, hardware, datacenter, seed };
};
