# @orieken/faker-hardware

Hardware component generation including racks, servers, power supplies, storage arrays, and network gear with strategy profiles.

## Installation

```bash
npm install @orieken/faker-hardware
```

## Usage

```typescript
import { faker } from '@faker-js/faker';
import { generateServer } from '@orieken/faker-hardware';

const server = generateServer(faker, { strategy: 'high-performance' });

console.log(server);
```
