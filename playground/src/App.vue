
<script setup lang="ts">
import FrequencyPanel from "./components/FrequencyPanel.vue";
import HardwarePanel from "./components/HardwarePanel.vue";
import DatacenterPanel from "./components/DatacenterPanel.vue";
import HeatmapView from "./components/HeatmapView.vue";

import { faker } from "@faker-js/faker";
import { fakerSuite } from "@orieken/faker-suite";

const fx = fakerSuite(faker);
const scenario = fx.datacenter.scenario.generate();
</script>

<template>
  <main
    style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 1.5rem; max-width: 1200px; margin: 0 auto;"
  >
    <h1 style="font-size: 2rem; margin-bottom: 1rem;">@orieken/faker-suite Playground</h1>

    <section class="grid">
      <FrequencyPanel />
      <HardwarePanel />
      <DatacenterPanel />
    </section>

    <section class="grid" style="margin-top: 2rem;">
      <HeatmapView title="Temperature Heatmap" :rooms="scenario.rooms" mode="temp" />
      <HeatmapView title="Power Heatmap" :rooms="scenario.rooms" mode="power" />
    </section>
  </main>
</template>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}
</style>
