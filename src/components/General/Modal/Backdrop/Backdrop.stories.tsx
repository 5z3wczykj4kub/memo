import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../index.css';
import { Backdrop } from './Backdrop';

export default {
  title: 'General/Backdrop',
  component: Backdrop,
} as ComponentMeta<typeof Backdrop>;

const Template: ComponentStory<typeof Backdrop> = (args) => (
  <Backdrop {...args} />
);

export const Invisible = Template.bind({});

Invisible.args = {
  isVisible: true,
  opacity: 0,
};

/**
 * TODO:
 * Add variant prop.
 */
export const Light = Template.bind({});

Light.args = {
  isVisible: true,
  opacity: 0.75,
};

export const Dark = Template.bind({});

Dark.args = {
  isVisible: true,
  opacity: 0.75,
};
