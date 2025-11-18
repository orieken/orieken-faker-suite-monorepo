
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import FrequencyPanel from "../components/FrequencyPanel.vue";

const meta: Meta<typeof FrequencyPanel> = {
  title: "Faker Suite/Frequency Panel",
  component: FrequencyPanel
};

export default meta;
export type Story = StoryObj<typeof FrequencyPanel>;

export const Default: Story = {};
