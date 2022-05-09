import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../index.css';
import Button from './Button';

export default {
  title: 'General/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...(args as any)} />
);

export const Light = Template.bind({});

Light.args = {
  children: 'Button',
};

export const Dark = Template.bind({});

Dark.args = {
  variant: 'dark',
  children: 'Button',
};
