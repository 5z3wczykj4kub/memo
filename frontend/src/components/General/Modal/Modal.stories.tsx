import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../index.css';
import { Modal } from './Modal';

export default {
  title: 'General/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...(args as any)} />
);

export const Light = Template.bind({});

Light.args = {
  isVisible: true,
  setIsVisible: () => {},
  variant: 'light',
  heading: <b>Light modal heading.</b>,
  children: (
    <>
      <b>Light modal body.</b> Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Beatae similique accusantium incidunt hic, aliquid in
      labore distinctio deleniti minima alias.
    </>
  ),
};

export const Dark = Template.bind({});

Dark.args = {
  isVisible: true,
  setIsVisible: () => {},
  variant: 'dark',
  heading: <b>Dark modal heading.</b>,
  children: (
    <>
      <b>Dark modal body.</b> Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Beatae similique accusantium incidunt hic, aliquid in
      labore distinctio deleniti minima alias.
    </>
  ),
};
