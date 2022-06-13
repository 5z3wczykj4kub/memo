import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import memoReducer from '../../../rtk/memoSlice';
import TechnologyName from '../../../utils/constants';
import TestCard from '../../../utils/tests/TestCard.class';
import Game from './Game';

const reactCard1 = new TestCard({
  id: 'React.js8',
  name: 'React.js',
  fileName: 'react' as TechnologyName,
  src: './images/react.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
});

const reactCard2 = new TestCard({
  id: 'React.js17',
  name: 'React.js',
  fileName: 'react' as TechnologyName,
  src: './images/react.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
});

const angularCard1 = new TestCard({
  id: 'Angular.js0',
  name: 'Angular.js',
  fileName: 'angular' as TechnologyName,
  src: './images/angular.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
});

const angularCard2 = new TestCard({
  id: 'Angular.js9',
  name: 'Angular.js',
  fileName: 'angular' as TechnologyName,
  src: './images/angular.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
});

const cards = [reactCard1, reactCard2, angularCard1, angularCard2];

const expectAllCardsToBeUnflipped = () =>
  cards.forEach((card) => card.expectToBeUnflipped());

const expectAllCardsToBeFlipped = () =>
  cards.forEach((card) => card.expectToBeFlipped());

beforeEach(() =>
  render(
    <Provider
      store={configureStore({
        reducer: {
          memo: memoReducer,
        },
      })}
    >
      <Game />
    </Provider>
  )
);

describe('<Game />', () => {
  test('renders', () => expectAllCardsToBeUnflipped());

  test('cards are disabled during flip transition', async () => {
    const user = userEvent.setup();

    expectAllCardsToBeUnflipped();

    await user.click(reactCard1.getCard());

    reactCard1.expectToBeFlipped();
    reactCard2.expectToBeUnflipped();
    angularCard1.expectToBeUnflipped();
    angularCard2.expectToBeUnflipped();

    await user.click(angularCard1.getCard());

    reactCard1.expectToBeFlipped();
    reactCard2.expectToBeUnflipped();
    angularCard1.expectToBeFlipped();
    angularCard2.expectToBeUnflipped();

    await user.click(reactCard2.getCard());
    await user.click(angularCard2.getCard());

    reactCard1.expectToBeFlipped();
    reactCard2.expectToBeUnflipped();
    angularCard1.expectToBeFlipped();
    angularCard2.expectToBeUnflipped();
  });

  test('cards stay flipped when chosen correctly', async () => {
    const user = userEvent.setup();

    expectAllCardsToBeUnflipped();

    await user.click(reactCard1.getCard());

    reactCard1.expectToBeFlipped();
    reactCard2.expectToBeUnflipped();
    angularCard1.expectToBeUnflipped();
    angularCard2.expectToBeUnflipped();

    await user.click(reactCard2.getCard());

    reactCard1.expectToBeFlipped();
    reactCard2.expectToBeFlipped();
    angularCard1.expectToBeUnflipped();
    angularCard2.expectToBeUnflipped();

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 400)) // https://tinyurl.com/5n6sj9cn
    );

    await user.click(angularCard1.getCard());

    reactCard1.expectToBeFlipped();
    reactCard2.expectToBeFlipped();
    angularCard1.expectToBeFlipped();
    angularCard2.expectToBeUnflipped();

    await user.click(angularCard2.getCard());

    expectAllCardsToBeFlipped();
  });

  test('cards flip back when chosen incorrectly', async () => {
    const user = userEvent.setup();

    expectAllCardsToBeUnflipped();

    await user.click(reactCard1.getCard());

    reactCard1.expectToBeFlipped();
    reactCard2.expectToBeUnflipped();
    angularCard1.expectToBeUnflipped();
    angularCard2.expectToBeUnflipped();

    await user.click(angularCard1.getCard());

    reactCard1.expectToBeFlipped();
    reactCard2.expectToBeUnflipped();
    angularCard1.expectToBeFlipped();
    angularCard2.expectToBeUnflipped();

    await waitFor(() => expectAllCardsToBeUnflipped());
  });
});
