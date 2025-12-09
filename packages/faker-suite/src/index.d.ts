import { createSeededFrequencyFx, FrequencyFxConfig } from '../../faker-frequency/src/index';
import { createSeededHardwareFx, HardwareFxConfig } from '../../faker-hardware/src/index';
import { generateScenario, DatacenterScenarioOptions } from '../../faker-datacenter/src/index';
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
            generate: (options?: DatacenterScenarioOptions) => ReturnType<typeof generateScenario>;
        };
    };
    seed?: number | string;
}
export declare const fakerSuite: (faker: any, config?: FakerSuiteConfig) => FakerSuiteFx;
