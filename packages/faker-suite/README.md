
# @orieken/faker-suite

Meta package that wires together:

- `@orieken/faker-frequency`
- `@orieken/faker-hardware`
- `@orieken/faker-datacenter`

and adds a **datacenter scenario generator** on top.

## Usage

```ts
import { faker } from "@faker-js/faker";
import { fakerSuite } from "@orieken/faker-suite";

const fx = fakerSuite(faker);

const freq = fx.frequency.uhf.MHz();
const server = fx.hardware.server();
const rackSpec = fx.datacenter.rack.spec();

const scenario = fx.datacenter.scenario.generate();
console.log(scenario.rooms[0].rows[0].racks[0]);
```

## Mermaid Overview

```mermaid
graph TD
  FAKER["@faker-js/faker"] --> SUITE[fakerSuite(faker)]
  SUITE --> FREQ[@orieken/faker-frequency]
  SUITE --> HW[@orieken/faker-hardware]
  SUITE --> DC[@orieken/faker-datacenter]

  DC --> SCENARIO[datacenter.scenario.generate()]
```
