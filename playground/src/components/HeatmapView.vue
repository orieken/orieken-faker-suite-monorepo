
<script setup lang="ts">
const props = defineProps<{
  title: string;
  rooms: any[];
  mode: "temp" | "power";
}>();

const colorForValue = (v: number) => {
  const clamped = Math.max(0, Math.min(1, v));
  const hue = (1 - clamped) * 240; // blue -> red
  return `hsl(${hue}, 90%, 55%)`;
};
</script>

<template>
  <section style="border: 1px solid #ddd; padding: 1rem; border-radius: 1rem;">
    <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">
      {{ title }}
    </h2>

    <div
      v-for="room in rooms"
      :key="room.id"
      style="margin-bottom: 1.5rem;"
    >
      <h3 style="margin-bottom: 0.5rem;">Room: {{ room.id }}</h3>

      <div
        v-for="row in room.rows"
        :key="row.id"
        style="display: flex; margin-bottom: 0.5rem;"
      >
        <div
          v-for="rack in row.racks"
          :key="rack.id"
          :title="
            mode === 'temp'
              ? rack.temp.tempC + ' °C'
              : rack.power.kw + ' kW'
          "
          :style="{
            width: '20px',
            height: '20px',
            marginRight: '4px',
            background: colorForValue(
              mode === 'temp'
                ? rack.temp.tempC / 40
                : rack.power.kw / 12
            ),
            borderRadius: '4px',
            cursor: 'pointer'
          }"
        />
      </div>
    </div>
  </section>
</template>
