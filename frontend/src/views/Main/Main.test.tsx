import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { Route, Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { api } from '../../rtk/api';
import authReducer from '../../rtk/authSlice';
import memoReducer from '../../rtk/memoSlice';
import { IAuthenticateFormValues } from '../../rtk/types';
import Home from '../Home/Home';
import Main from './Main';
import { angularCard1, cards, reactCard1 } from './Main.test.utils';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

let hasGameModeErrorResponse = false;

const server = setupServer(
  rest.post<IAuthenticateFormValues>(
    `${process.env.REACT_APP_API_BASE_URL_ENDPOINT}/auth/sign-in`,
    (req, res, ctx) => {
      const { username } = req.body;

      return res(
        ctx.status(200),
        ctx.json({
          username: 'correctUser',
          id: '62a1d6b62dbd0a71cd326b8e',
          token: 'validToken',
        })
      );
    }
  ),
  rest.post(
    `${process.env.REACT_APP_API_BASE_URL_ENDPOINT}/me`,
    (req, res, ctx) => {
      return !hasGameModeErrorResponse
        ? res(
            ctx.status(200),
            ctx.json({
              username: 'correctUser',
              id: '62a1d6b62dbd0a71cd326b8e',
              token: 'validToken',
              experience: 1200,
              earnedExperience: 600,
            })
          )
        : res(
            ctx.status(400),
            ctx.json({
              errors: [
                {
                  message: 'Must be either easy, medium, hard or extreme',
                  param: 'difficultyLevel',
                },
              ],
            })
          );
    }
  )
);

const getAllHearts = () => screen.getAllByTestId('heart');

const getGameLostModalHeading = () =>
  screen.getByRole('heading', {
    name: /game lost 😥/i,
  });

const getGameWonModalHeading = () =>
  screen.getByRole('heading', {
    name: /game won! 🎉/i,
  });

const getPlayAgainModalButton = () => getCloseButtons()[1].nextSibling;

const getCloseButtons = () =>
  screen.getAllByRole('button', {
    name: /close/i,
  });

const getPlayAgainNavbarButton = () =>
  screen.getAllByRole('button', {
    name: /play again/i,
  })[1];

const getGameResultsButton = () =>
  screen.getByRole('button', {
    name: /results/i,
  });

const getSignInLink = () =>
  screen.getByRole('link', {
    name: /sign in/i,
  });

const getUsernameTextfield = () =>
  screen.getByRole('textbox', {
    name: /username/i,
  });

const getPasswordTextfield = () => screen.getByLabelText(/^password/i);

const getSubmitButton = () =>
  screen.getByRole('button', {
    name: /submit/i,
  });

const getPlayGameButton = () =>
  screen.getByRole('button', {
    name: /play game/i,
  });

const getFetchingUserDataMessage = () =>
  screen.getByText(/fetching user data.../i);

const getExperience = () => screen.getByText(/experience: 1200/i);

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

const customRender = () =>
  render(
    <Provider
      store={configureStore({
        reducer: {
          [api.reducerPath]: api.reducer,
          memo: memoReducer,
          auth: authReducer,
        },
      })}
    >
      <Main />
    </Provider>
  );

beforeAll(() => {
  server.listen();
  hasGameModeErrorResponse = false;
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<Main />', () => {
  test('game is started', () => {
    customRender();
    expectGameIsStarted();
  });

  test('game is lost', async () => {
    customRender();
    await expectGameIsLost();
  });

  test('game is won', async () => {
    customRender();
    await expectGameIsWon();
  });

  test("game restarts after loss on modal's play again button click", async () => {
    customRender();
    const user = userEvent.setup();
    await expectGameIsLost();
    await waitFor(() => user.click(getPlayAgainModalButton() as Element));
    expectGameIsStarted();
  });

  test("game restarts after loss on navbar's play again button click", async () => {
    customRender();
    const user = userEvent.setup();
    await expectGameIsLost();
    await waitFor(() => user.click(getCloseButtons()[1] as Element));
    await waitFor(() => user.click(getPlayAgainNavbarButton() as Element));
    expectGameIsStarted();
  });

  test("game restarts after win on modal's play again button click", async () => {
    customRender();
    const user = userEvent.setup();
    await expectGameIsWon();
    await waitFor(() => user.click(getPlayAgainModalButton() as Element));
    expectGameIsStarted();
  });

  test("game restarts after win on navbar's play again button click", async () => {
    customRender();
    const user = userEvent.setup();
    await expectGameIsWon();
    await waitFor(() => user.click(getCloseButtons()[1] as Element));
    await waitFor(() => user.click(getPlayAgainNavbarButton() as Element));
    expectGameIsStarted();
  });

  test('game results modal reopens', async () => {
    customRender();
    const user = userEvent.setup();
    await expectGameIsWon();
    await waitFor(() => user.click(getCloseButtons()[1] as Element));
    await waitFor(() => user.click(getGameResultsButton() as Element));
    await waitFor(() => expect(getGameWonModalHeading()).toBeVisible());
    await waitFor(() => expect(getGameWonModalHeading()).toBeInTheDocument());
  });

  test("updates user's experience after game is won", async () => {
    const store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        memo: memoReducer,
        auth: authReducer,
      },
    });
    const history = createMemoryHistory();
    const user = userEvent.setup();

    const { rerender } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<Main />} />
          </Routes>
        </Router>
      </Provider>
    );

    await user.click(getSignInLink());
    await user.type(getUsernameTextfield(), 'correctUser');
    await user.type(getPasswordTextfield(), 'superStrongPassword123');
    await user.click(getSubmitButton());
    await user.click(getPlayGameButton());
    const main = screen.getAllByRole('main')[1];
    const playGameButton = within(main).getByRole('button', {
      name: /play game/i,
    });
    await user.click(playGameButton);

    rerender(
      <Provider store={store}>
        <Router location={history.location.pathname} navigator={history}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<Main />} />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
    );

    await waitFor(() => expectGameIsWon(), { timeout: 10000 });
    expect(getFetchingUserDataMessage()).toBeVisible();
    await waitFor(() => {
      expect(getExperience()).toBeVisible();
      expect(within(getExperience()).getByText(/\+600/i)).toBeVisible();
      expect(screen.getByText(/600 exp/i)).toBeVisible();
    });

    hasGameModeErrorResponse = true;
    await user.click(getPlayAgainModalButton() as Element);
    await waitFor(() => expectGameIsWon(), { timeout: 10000 });
    await waitFor(() =>
      expect(
        screen.getByText(/something went wrong\. fetching user data failed\./i)
      ).toBeVisible()
    );
  }, 20000);
});
