import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import memoSlice from '../../rtk/memoSlice';
import Main from './Main';
import { angularCard1, cards, reactCard1 } from './Main.test.utils';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

const getAllHearts = () => screen.getAllByTestId('heart');

const getGameLostModalHeading = () =>
  screen.getByRole('heading', {
    name: /what a bummer 😥/i,
  });

const getGameWonModalHeading = () =>
  screen.getByRole('heading', {
    name: /congratulations!/i,
  });

const getCloseButtons = () =>
  screen.getAllByRole('button', {
    name: /close/i,
  });

const getPlayAgainNavbarButton = () =>
  screen.getAllByRole('button', {
    name: /play again/i,
  })[1];

const getPlayAgainModalButton = () => getCloseButtons()[1].nextSibling;

const expectAllCardsToBeUnflipped = () =>
  cards.forEach((card) => card.expectToBeUnflipped());

const expectGameIsStarted = () => {
  expectAllCardsToBeUnflipped();
  expect(getAllHearts()).toHaveLength(5);
};

const expectGameIsLost = async () => {
  const user = userEvent.setup();

  for (let i = 5; i > 0; i--) {
    await user.click(reactCard1.getCard());
    await user.click(angularCard1.getCard());
    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 400))
    );
    await waitFor(() => expect(getAllHearts()).toHaveLength(i));
  }

  await waitFor(() => expect(getGameLostModalHeading()).toBeVisible());
  await waitFor(() => expect(getGameLostModalHeading()).toBeInTheDocument());
  await waitFor(() => expect(getPlayAgainModalButton()).toBeVisible());
  await waitFor(() => expect(getPlayAgainModalButton()).toBeInTheDocument());
};

const expectGameIsWon = async () => {
  const user = userEvent.setup();

  for await (const [index] of cards.entries()) {
    if (index % 2 !== 0) continue;
    await user.click(cards[index].getCard());
    await user.click(cards[index + 1].getCard());
    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 400))
    );
  }

  await waitFor(() => expect(getGameWonModalHeading()).toBeVisible());
  await waitFor(() => expect(getGameWonModalHeading()).toBeInTheDocument());
  await waitFor(() => expect(getPlayAgainModalButton()).toBeVisible());
  await waitFor(() => expect(getPlayAgainModalButton()).toBeInTheDocument());
};

beforeEach(() => {
  render(
    <Provider
      store={configureStore({
        reducer: {
          memo: memoSlice,
        },
      })}
    >
      <Main />
    </Provider>
  );
});

describe('<Main />', () => {
  test('game is started', () => expectGameIsStarted());

  test('game is lost', async () => await expectGameIsLost());

  test('game is won', async () => await expectGameIsWon());

  test("game restarts after loss on modal's play again button click", async () => {
    const user = userEvent.setup();
    await expectGameIsLost();
    await waitFor(() => user.click(getPlayAgainModalButton() as Element));
    expectGameIsStarted();
  });

  test("game restarts after loss on navbar's play again button click", async () => {
    const user = userEvent.setup();
    await expectGameIsLost();
    await waitFor(() => user.click(getCloseButtons()[1] as Element));
    await waitFor(() => user.click(getPlayAgainNavbarButton() as Element));
    expectGameIsStarted();
  });

  test("game restarts after win on modal's play again button click", async () => {
    const user = userEvent.setup();
    await expectGameIsWon();
    await waitFor(() => user.click(getPlayAgainModalButton() as Element));
    expectGameIsStarted();
  });

  test("game restarts after win on navbar's play again button click", async () => {
    const user = userEvent.setup();
    await expectGameIsWon();
    await waitFor(() => user.click(getCloseButtons()[1] as Element));
    await waitFor(() => user.click(getPlayAgainNavbarButton() as Element));
    expectGameIsStarted();
  });
});
