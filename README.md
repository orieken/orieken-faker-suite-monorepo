
# Orieken Faker Suite Monorepo

This monorepo contains:

- `@orieken/faker-suite` – meta package wiring your faker packages together
- `faker-suite-playground` – Vite + Vue 3 + Storybook playground for interactive exploration

## Architecture Overview

```mermaid
graph TD
  subgraph NPM Packages
    FREQ[@orieken/faker-frequency]
    HW[@orieken/faker-hardware]
    DC[@orieken/faker-datacenter]
    SUITE[@orieken/faker-suite]
  end

  subgraph Playground
    ViteApp[Vite + Vue 3 App]
    Storybook[Storybook]
  end

  FREQ --> SUITE
  HW --> SUITE
  DC --> SUITE

  SUITE --> ViteApp
  SUITE --> Storybook
```

## Datacenter Scenario & Heatmap Flow

```mermaid
flowchart TD
  A[FakerSuite(faker)] --> B[fx.datacenter.scenario.generate()]
  B --> C[Generate Rooms / Rows / Racks]
  C --> D[Attach Servers, PDUs, Temp, Power]
  D --> E[{ rooms: [...], generatedAt }]

  E --> H1[HeatmapView (Temperature)]
  E --> H2[HeatmapView (Power)]

  H1 --> UI[Vue UI]
  H2 --> UI
```

---

## Packages

- `packages/faker-suite`: meta package exposing `fakerSuite(faker)`
- `playground`: Vite + Vue 3 SPA plus Storybook, using `@orieken/faker-suite`

See each package README for more details.
