
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DatacenterPanel from "../components/DatacenterPanel.vue";

const meta: Meta<typeof DatacenterPanel> = {
  title: "Faker Suite/Datacenter Panel",
  component: DatacenterPanel
};

export default meta;
export type Story = StoryObj<typeof DatacenterPanel>;

export const Default: Story = {};
