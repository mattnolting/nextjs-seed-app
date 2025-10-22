import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "PatternFly/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
    },
    className: {
      control: { type: "text" },
    },
    component: {
      control: { type: "text" },
    },
    isClicked: {
      control: { type: "boolean" },
    },
    isBlock: {
      control: { type: "boolean" },
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    isAriaDisabled: {
      control: { type: "boolean" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    spinnerAriaValueText: {
      control: { type: "text" },
    },
    spinnerAriaLabel: {
      control: { type: "text" },
    },
    spinnerAriaLabelledBy: {
      control: { type: "text" },
    },
    inoperableEvents: {
      control: { type: "text" },
    },
    isInline: {
      control: { type: "boolean" },
    },
    isFavorite: {
      control: { type: "boolean" },
    },
    isFavorited: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "text" },
    },
    type: {
      control: { type: "text" },
    },
    variant: {
      control: { type: "text" },
    },
    state: {
      control: { type: "text" },
    },
    hasNoPadding: {
      control: { type: "boolean" },
    },
    iconPosition: {
      control: { type: "text" },
    },
    'aria-label': {
      control: { type: "text" },
    },
    icon: {
      control: { type: "text" },
    },
    tabIndex: {
      control: { type: "number" },
    },
    isDanger: {
      control: { type: "boolean" },
    },
    isExpanded: {
      control: { type: "boolean" },
    },
    isSettings: {
      control: { type: "boolean" },
    },
    isHamburger: {
      control: { type: "boolean" },
    },
    hamburgerVariant: {
      control: { type: "text" },
    },
    innerRef: {
      control: { type: "text" },
      description: "Forwarded ref",
    },
    countOptions: {
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
    children: "Default Button",
  },
};

