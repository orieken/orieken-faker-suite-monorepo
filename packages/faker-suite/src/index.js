import { createSeededFrequencyFx } from '../../faker-frequency/src/index';
import { createSeededHardwareFx } from '../../faker-hardware/src/index';
import { generateScenario } from '../../faker-datacenter/src/index';
export const fakerSuite = (faker, config = {}) => {
    const seed = config.seed;
    if (seed !== undefined && typeof faker.seed === 'function') {
        faker.seed(typeof seed === 'number' ? seed : Array.from(String(seed)).map(ch => ch.charCodeAt(0)));
    }
    const frequency = createSeededFrequencyFx(faker, { seed, ...(config.frequency || {}) }).fx;
    const hardware = createSeededHardwareFx(faker, { seed, ...(config.hardware || {}) }).fx;
    const datacenter = {
        scenario: {
            generate: (options = {}) => generateScenario(faker, { seed, ...(config.datacenter || {}), ...options })
        }
    };
    return { frequency, hardware, datacenter, seed };
};
