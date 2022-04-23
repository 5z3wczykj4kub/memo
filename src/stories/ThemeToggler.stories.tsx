import { ComponentMeta, ComponentStory } from '@storybook/react';
import ThemeToggler from '../components/General/ThemeToggler/ThemeToggler';

export default {
  title: 'General/ThemeToggler',
  component: ThemeToggler,
} as ComponentMeta<typeof ThemeToggler>;

const Template: ComponentStory<typeof ThemeToggler> = (args) => (
  <ThemeToggler {...args} />
);

export const Light = Template.bind({});

Light.args = {
  variant: 'light',
};

export const Dark = Template.bind({});

Dark.args = {
  variant: 'dark',
};

export const Inverse = Template.bind({});

Inverse.args = {
  variant: 'inverse',
};
