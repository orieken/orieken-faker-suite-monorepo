
<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { fakerSuite } from "@orieken/faker-suite";

const fx = fakerSuite(faker);

const samples = Array.from({ length: 5 }).map(() => ({
  mhz: fx.frequency.uhf.MHz(),
  ghz: fx.frequency.uhf.GHz(),
  center: fx.frequency.uhf.center({ minBandwidth: 5, maxBandwidth: 50 })
}));
</script>

<template>
  <section style="border: 1px solid #ddd; border-radius: 0.75rem; padding: 1rem;">
    <h2 style="font-size: 1.25rem; margin-bottom: 0.75rem;">Frequency (UHF)</h2>
    <ul style="font-size: 0.9rem; list-style: none; padding: 0; margin: 0;">
      <li v-for="(s, i) in samples" :key="i" style="margin-bottom: 0.5rem;">
        <strong>{{ s.mhz.toFixed(3) }} MHz</strong>
        ({{ s.ghz.toFixed(3) }} GHz)
        • center {{ s.center.center.toFixed(2) }} MHz /
        bw {{ s.center.bandwidth.toFixed(2) }} MHz
      </li>
    </ul>
  </section>
</template>
