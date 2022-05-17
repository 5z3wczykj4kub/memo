import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import memoSlice from '../../../rtk/memoSlice';
import { ICard } from '../../../rtk/types';
import TechnologyName from '../../../utils/constants';
import {
  getCard,
  getCardImageByName,
  getCodeImage,
} from '../../../utils/tests/queries';
import Card from './Card';

const props: ICard = {
  id: 'React.js8',
  name: 'React.js',
  fileName: 'react' as TechnologyName,
  src: './images/react.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
};

beforeEach(() =>
  render(
    <Provider
      store={configureStore({
        reducer: {
          memo: memoSlice,
        },
      })}
    >
      <Card {...props} />
    </Provider>
  )
);

const getCardImage = () => getCardImageByName(props.name as 'React.js');

describe('<Card />', () => {
  test('renders', () => {
    expect(getCodeImage()).toBeInTheDocument();
    expect(getCodeImage()).toBeVisible();

    expect(getCardImage()).toBeInTheDocument();
    expect(getCardImage()).not.toBeVisible();

    expect(getCard()).toBeInTheDocument();
    expect(getCard()).toBeVisible();
  });

  test('focuses on tab', async () => {
    const user = userEvent.setup();

    expect(getCard()).not.toHaveFocus();

    await user.tab();

    expect(getCard()).toHaveFocus();
  });

  test('flips on click', async () => {
    const user = userEvent.setup();

    await user.click(getCard());

    expect(getCodeImage()).not.toBeVisible();

    expect(getCardImage()).toBeVisible();
  });

  test('flips on tab + enter', async () => {
    const user = userEvent.setup();

    await user.keyboard('{Tab}{Enter}');

    expect(getCodeImage()).not.toBeVisible();

    expect(getCardImage()).toBeVisible();
  });
});
