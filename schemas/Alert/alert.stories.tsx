import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "PatternFly/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    actionClose: {
      control: { type: "text" },
    },
    actionLinks: {
      control: { type: "text" },
    },
    children: {
      control: { type: "text" },
    },
    className: {
      control: { type: "text" },
    },
    customIcon: {
      control: { type: "text" },
    },
    id: {
      control: { type: "text" },
    },
    isExpandable: {
      control: { type: "boolean" },
    },
    isInline: {
      control: { type: "boolean" },
    },
    isLiveRegion: {
      control: { type: "boolean" },
    },
    isPlain: {
      control: { type: "boolean" },
    },
    onTimeout: {
      control: { type: "text" },
    },
    timeout: {
      control: { type: "boolean" },
    },
    timeoutAnimation: {
      control: { type: "number" },
    },
    title: {
      control: { type: "text" },
    },
    component: {
      control: { type: "text" },
    },
    toggleAriaLabel: {
      control: { type: "text" },
    },
    tooltipPosition: {
      control: { type: "text" },
    },
    truncateTitle: {
      control: { type: "number" },
    },
    variant: {
      control: { type: "text" },
    },
    variantLabel: {
      control: { type: "text" },
    },
    ouiaId: {
      control: { type: "text" },
    },
    ouiaSafe: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Alert",
  },
};

