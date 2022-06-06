import { ComponentMeta, ComponentStory } from '@storybook/react';
import ThemeProvider from '../../../../providers/ThemeProvider';
import '../../../../index.css';
import Heart from './Heart';

export default {
  title: 'Memo/Heart',
  component: Heart,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof Heart>;

const Template: ComponentStory<typeof Heart> = (args) => <Heart />;

export const Default = Template.bind({});

Default.args = {};
