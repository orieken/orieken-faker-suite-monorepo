
<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { fakerSuite } from "@orieken/faker-suite";

const fx = fakerSuite(faker);

const rackSpec = fx.datacenter.rack.spec();
const serverSpec = fx.datacenter.server.spec();
const room = fx.datacenter.layout.room();
const row = fx.datacenter.layout.row();
const rackPos = fx.datacenter.layout.rackPosition();
const temp = fx.datacenter.telemetry.tempSensor();
const power = fx.datacenter.telemetry.powerReading();
</script>

<template>
  <section style="border: 1px solid #ddd; border-radius: 0.75rem; padding: 1rem;">
    <h2 style="font-size: 1.25rem; margin-bottom: 0.75rem;">Datacenter</h2>

    <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">Rack & Server</h3>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ rackSpec }}</pre>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ serverSpec }}</pre>

    <h3 style="font-size: 1rem; margin: 0.75rem 0 0.25rem;">Layout</h3>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ room }}</pre>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ row }}</pre>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ rackPos }}</pre>

    <h3 style="font-size: 1rem; margin: 0.75rem 0 0.25rem;">Telemetry</h3>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ temp }}</pre>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ power }}</pre>
  </section>
</template>
