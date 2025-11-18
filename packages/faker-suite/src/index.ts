
import { faker as baseFaker } from "@faker-js/faker";
import { frequencyModule } from "@orieken/faker-frequency";
import { hardwareModule } from "@orieken/faker-hardware";
import { datacenterModule as baseDatacenterModule } from "@orieken/faker-datacenter";

type BaseFaker = typeof baseFaker;

export interface DatacenterScenarioRack {
  id: string;
  rack: any;
  server: any;
  power: any;
  temp: any;
}

export interface DatacenterScenarioRow {
  id: string;
  racks: DatacenterScenarioRack[];
}

export interface DatacenterScenarioRoom {
  id: string;
  rows: DatacenterScenarioRow[];
}

export interface DatacenterScenario {
  rooms: DatacenterScenarioRoom[];
  generatedAt: string;
}

export interface FakerWithSuite extends BaseFaker {
  frequency: ReturnType<typeof frequencyModule>;
  hardware: ReturnType<typeof hardwareModule>;
  datacenter: ReturnType<typeof baseDatacenterModule> & {
    scenario: {
      generate: () => DatacenterScenario;
    };
  };
}

const generateDatacenterScenario = (dc: any): DatacenterScenario => {
  const rooms: DatacenterScenarioRoom[] = [];

  // Simple, predictable scenario: 1–2 rooms, 2–4 rows, 5–10 racks per row
  const roomCount = 1 + Math.floor(Math.random() * 2);

  for (let r = 0; r < roomCount; r++) {
    const rows: DatacenterScenarioRow[] = [];
    const rowCount = 2 + Math.floor(Math.random() * 3);

    for (let i = 0; i < rowCount; i++) {
      const racks: DatacenterScenarioRack[] = [];
      const rackCount = 5 + Math.floor(Math.random() * 6);

      for (let j = 0; j < rackCount; j++) {
        const rack = dc.rack.spec();
        const server = dc.server.spec();
        const power = dc.telemetry.powerReading();
        const temp = dc.telemetry.tempSensor();

        racks.push({
          id: `room-${r}-row-${i}-rack-${j}`,
          rack,
          server,
          power,
          temp
        });
      }

      rows.push({
        id: `room-${r}-row-${i}`,
        racks
      });
    }

    rooms.push({
      id: `room-${r}`,
      rows
    });
  }

  return {
    rooms,
    generatedAt: new Date().toISOString()
  };
};

export const fakerSuite = (fakerInstance: BaseFaker = baseFaker): FakerWithSuite => {
  const anyFaker: any = fakerInstance as any;

  anyFaker.frequency = frequencyModule(anyFaker);
  anyFaker.hardware = hardwareModule(anyFaker);

  const dc = baseDatacenterModule(anyFaker);
  dc.scenario = {
    generate: () => generateDatacenterScenario(dc)
  };
  anyFaker.datacenter = dc;

  return anyFaker as FakerWithSuite;
};
