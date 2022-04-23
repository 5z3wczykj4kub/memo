import { ComponentMeta, ComponentStory } from '@storybook/react';
import ThemeToggler from '../components/ThemeToggler/ThemeToggler';

/**
 * TODO:
 * Disable `color` control
 * when `reverse` is true.
 */
export default {
  title: 'General/ThemeToggler',
  component: ThemeToggler,
} as ComponentMeta<typeof ThemeToggler>;

const Template: ComponentStory<typeof ThemeToggler> = (args) => (
  <ThemeToggler {...args} />
);

export const Light = Template.bind({});

Light.args = {
  color: 'light',
};

export const Dark = Template.bind({});

Dark.args = {
  color: 'dark',
};

export const Reversible = Template.bind({});

Reversible.args = {
  reverse: true,
};
