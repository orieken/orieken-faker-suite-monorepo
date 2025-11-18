
<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { fakerSuite } from "@orieken/faker-suite";

const fx = fakerSuite(faker);

const rack = fx.hardware.rack();
const server = fx.hardware.server();
const psu = fx.hardware.psu();
const storage = fx.hardware.storage();
</script>

<template>
  <section style="border: 1px solid #ddd; border-radius: 0.75rem; padding: 1rem;">
    <h2 style="font-size: 1.25rem; margin-bottom: 0.75rem;">Hardware</h2>

    <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">Rack</h3>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ rack }}</pre>

    <h3 style="font-size: 1rem; margin: 0.75rem 0 0.25rem;">Server</h3>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ server }}</pre>

    <h3 style="font-size: 1rem; margin: 0.75rem 0 0.25rem;">Power Supply</h3>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ psu }}</pre>

    <h3 style="font-size: 1rem; margin: 0.75rem 0 0.25rem;">Storage Device</h3>
    <pre style="font-size: 0.8rem; background: #fafafa; padding: 0.5rem; border-radius: 0.5rem;">{{ storage }}</pre>
  </section>
</template>
