import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import memoReducer from '../../../rtk/memoSlice';
import TechnologyName from '../../../utils/constants';
import Card from './Card';
import TestCard from '../../../utils/tests/TestCard.class';

const testCard = new TestCard({
  id: 'React.js8',
  name: 'React.js',
  fileName: 'react' as TechnologyName,
  src: './images/react.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
});

beforeEach(() =>
  render(
    <Provider
      store={configureStore({
        reducer: {
          memo: memoReducer,
        },
      })}
    >
      <Card {...testCard} />
    </Provider>
  )
);

describe('<Card />', () => {
  test('renders', () => testCard.expectToBeUnflipped());

  test('focuses on tab', async () => {
    const user = userEvent.setup();
    expect(testCard.getCard()).not.toHaveFocus();
    await user.tab();
    expect(testCard.getCard()).toHaveFocus();
  });

  test('flips on click', async () => {
    const user = userEvent.setup();
    testCard.expectToBeUnflipped();
    await user.click(testCard.getCard());
    testCard.expectToBeFlipped();
  });

  test('flips on tab + enter', async () => {
    const user = userEvent.setup();
    testCard.expectToBeUnflipped();
    await user.keyboard('{Tab}{Enter}');
    testCard.expectToBeFlipped();
  });
});
