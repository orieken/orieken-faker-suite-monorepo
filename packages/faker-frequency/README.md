# @orieken/faker-frequency

Pure, seedable frequency generators with clean separation of concerns:
- `types.ts`: shared types and interfaces
- `units.ts`: unit conversions and band default units
- `bands.ts`: canonical band ranges and validation
- `fx.ts`: factories that compose the domain utilities
- `index.ts`: barrel exports for a stable public API

## Usage
```ts
import { faker } from '@faker-js/faker';
import { createSeededFrequencyFx, toHz, fromHz } from '@orieken/faker-frequency';

const { fx } = createSeededFrequencyFx(faker, { seed: 123 });
const mhz = fx.generateFrequency({ band: 'VHF', unit: 'MHz' });
const channel = fx.generateChannel({ band: 'UHF' });
```

## Notes
- Deterministic when seeded; side-effect free APIs.
- Band overrides are validated and do not mutate input config.
- Barrel exports keep imports stable while allowing internal refactors.

