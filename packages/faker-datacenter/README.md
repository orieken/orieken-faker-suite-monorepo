# @orieken/faker-datacenter

Composable datacenter scenario generation (rooms → rows → racks + telemetry, cooling, fabric).

## Installation

```bash
npm install @orieken/faker-datacenter
```

## Usage

```typescript
import { faker } from '@faker-js/faker';
import { generateDatacenter } from '@orieken/faker-datacenter';

const datacenter = generateDatacenter(faker, {
  rooms: 1,
  rowsPerRoom: 2,
  racksPerRow: 3
});

console.log(datacenter);
```
