import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../index.css';
import ThemeProvider from '../../../providers/ThemeProvider';
import ThemeToggler from './ThemeToggler';

export default {
  title: 'General/ThemeToggler',
  component: ThemeToggler,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
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
