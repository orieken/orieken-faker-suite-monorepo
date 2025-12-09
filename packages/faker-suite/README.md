# @orieken/faker-suite

A unified facade for the Orieken Faker Suite, aggregating frequency, hardware, and datacenter generation capabilities into a single API.

## Installation

```bash
npm install @orieken/faker-suite
```

## Usage

```typescript
import { faker } from '@faker-js/faker';
import { fakerSuite } from '@orieken/faker-suite';

const fx = fakerSuite(faker, { seed: 123 });

// Access different modules
const freq = fx.frequency.generateFrequency({ band: 'VHF', unit: 'MHz' });
const server = fx.hardware.server();
const scenario = fx.datacenter.scenario.generate({ rooms: 1 });
```
