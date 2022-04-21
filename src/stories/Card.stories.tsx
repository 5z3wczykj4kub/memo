import { configureStore } from '@reduxjs/toolkit';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import Memo from '../components/Memo/Memo';
import memoSlice from '../rtk/memoSlice';
import TechnologyName from '../utils/constants';

const store = configureStore({
  reducer: {
    memo: memoSlice,
  },
});

export default {
  title: 'Memo/Card',
  component: Memo.Card,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof Memo.Card>;

const Template: ComponentStory<typeof Memo.Card> = (args) => (
  <Memo.Grid
    style={{
      display: 'block',
      margin: 0,
      padding: 0,
    }}
  >
    <Memo.Card {...args} />
  </Memo.Grid>
);

export const Default = Template.bind({});

Default.args = {
  id: 'React.js8',
  name: 'React.js',
  fileName: 'react' as TechnologyName,
  src: './images/react.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
};
