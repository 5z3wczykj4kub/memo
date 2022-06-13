import { configureStore } from '@reduxjs/toolkit';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import '../../../index.css';
import memoReducer from '../../../rtk/memoSlice';
import TechnologyName from '../../../utils/constants';
import Memo from '../Memo';

const store = configureStore({
  reducer: {
    memo: memoReducer,
  },
});

export default {
  title: 'Memo/Card',
  component: Memo.Card,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Memo.Grid
          style={{
            display: 'block',
            margin: 0,
            padding: 0,
          }}
        >
          <Story />
        </Memo.Grid>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Memo.Card>;

const Template: ComponentStory<typeof Memo.Card> = (args) => (
  <Memo.Card {...args} />
);

export const Default = Template.bind({});

Default.args = {
  id: store.getState().memo.cards[0].id,
  name: 'React.js',
  fileName: 'react' as TechnologyName,
  src: './images/react.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
};
