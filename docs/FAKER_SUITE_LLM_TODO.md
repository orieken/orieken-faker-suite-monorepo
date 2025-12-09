
# 🧠 LLM-Optimized TODO — Orieken Faker Suite Monorepo

This file is optimized for **LLM context efficiency**, minimal tokens, and high recall.  
All steps are atomic, independent, and designed for deterministic regeneration.

---

## 0 — Monorepo Bootstrap
- Create monorepo `orieken-faker-suite`
- Add workspaces: `packages/*`, `playground`
- Folders:
  - `packages/faker-suite`
  - `packages/faker-frequency`
  - `packages/faker-hardware`
  - `packages/faker-datacenter`
  - `playground`
  - `docs`
- Root files:
  - `package.json` (npm workspaces)
  - `.gitignore`
  - `README.md`

---

## 1 — Faker Packages (Domain Modules)

### 1.1 @orieken/faker-frequency
- Bands: VHF, UHF, SHF, EHF  
- Unit conversions: Hz/kHz/MHz/GHz  
- Center frequency + bandwidth  
- Optional min/max override  
- Pure TS functions only  
- No shared state

### 1.2 @orieken/faker-hardware
- Rack specs  
- Server specs  
- PSU specs  
- Storage devices  
- Network devices  
- Use factories + strategy pattern  

### 1.3 @orieken/faker-datacenter
- Layout: room, row, rack  
- Cooling  
- Power telemetry  
- Temperature sensors  
- Cables + optics  
- Pure structured data

---

## 2 — Meta Package

### 2.1 @orieken/faker-suite
- Export `fakerSuite(faker)`
- Compose modules: frequency + hardware + datacenter  
- Add:
  - `fx.datacenter.scenario.generate()`
- Pattern: **Facade**

---

## 3 — Scenario & Visualization

### 3.1 Scenario Generator
- Output:
```
DatacenterScenario {
  rooms: RoomScenario[]
  generatedAt: string
}
```
- rooms → rows → racks → servers → telemetry  
- Seed-deterministic  
- No randomness outside faker

### 3.2 HeatmapView (Vue 3)
- Props: `rooms`, `mode="temp|power"`  
- Render grid of racks  
- Color via hue-scale  
- Pure visual component

---

## 4 — Playground (Vite + Vue)

### 4.1 Vite App
- Panels:
  - FrequencyPanel
  - HardwarePanel
  - DatacenterPanel
  - HeatmapView
- Responsive grid layout

### 4.2 Storybook
- Stories for all components  
- Two stories for heatmap (Temp/Power)

---

## 5 — Documentation

### 5.1 Clean Coding
- Cyclomatic < 7  
- Function length ≤ 30 LOC  
- Strict TS  
- Pure functions  
- No duplication  
- Tests for logic

### 5.2 Architecture
- Mermaid diagrams  
- Monorepo overview  
- Flow diagrams

### 5.3 Design Patterns
- Facade  
- Factory  
- Strategy  
- Adapter  

### 5.4 Agent Guidelines
- Maintain architecture  
- Avoid breaking changes  
- Update docs  
- Deterministic code only  

---

## 6 — ADR (Optional)
- Template  
- ADR-0001 Monorepo  
- ADR-0002 Faker Suite Architecture

---

## 7 — Packaging
- Build all packages  
- Build playground  
- Bundle everything into a zip  

---

## END  
Minimal. Deterministic. LLM-friendly.
