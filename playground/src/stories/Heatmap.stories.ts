
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import HeatmapView from "../components/HeatmapView.vue";
import { faker } from "@faker-js/faker";
import { fakerSuite } from "@orieken/faker-suite";

const fx = fakerSuite(faker);
const scenario = fx.datacenter.scenario.generate();

const meta: Meta<typeof HeatmapView> = {
  title: "Faker Suite/Heatmap",
  component: HeatmapView
};

export default meta;
export type Story = StoryObj<typeof HeatmapView>;

export const Temperature: Story = {
  args: {
    title: "Temperature Heatmap",
    rooms: scenario.rooms,
    mode: "temp"
  }
};

export const Power: Story = {
  args: {
    title: "Power Heatmap",
    rooms: scenario.rooms,
    mode: "power"
  }
};
