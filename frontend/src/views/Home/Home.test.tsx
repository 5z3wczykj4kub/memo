import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from '../../App';
import memoSlice from '../../rtk/memoSlice';
import Main from '../Main/Main';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

const getCodersMemoHeading = () =>
  screen.getByRole('heading', {
    name: /coder's memo code/i,
  });

const getPlayGameButton = () =>
  screen.getByRole('button', {
    name: /play game/i,
  });

const getAllPlayGameButtons = () =>
  screen.getAllByRole('button', {
    name: /play game/i,
  });

const getSettingsButton = () =>
  screen.getByRole('button', {
    name: /settings/i,
  });

const queryGameModalHeading = () =>
  screen.queryByRole('heading', {
    name: /choose game mode and difficulty/i,
  });

const getSingleModeButton = () =>
  screen.getByRole('button', {
    name: /single/i,
  });

const getMultiModeButton = () =>
  screen.getByRole('button', {
    name: /multi/i,
  });

const getGameDifficultySelect = () =>
  screen.getByRole('button', {
    name: /2. select game difficulty/i,
  });

const getAllCardCodeImages = () => screen.getAllByAltText('code');

const difficultyToCardsCountMap = [
  { difficulty: 'easy', cardsCount: 12 },
  { difficulty: 'medium', cardsCount: 18 },
  { difficulty: 'hard', cardsCount: 24 },
  { difficulty: 'extreme', cardsCount: 30 },
];

const expectGameModalToOpen = async () => {
  const user = userEvent.setup();
  expect(queryGameModalHeading()).toBeNull();
  expect(queryGameModalHeading()).not.toBeInTheDocument();
  await user.click(getPlayGameButton());
  expect(queryGameModalHeading()).toBeVisible();
  expect(queryGameModalHeading()).toBeInTheDocument();
};

const customRender = () => {
  const history = createMemoryHistory();

  return render(
    <Provider
      store={configureStore({
        reducer: {
          memo: memoSlice,
        },
      })}
    >
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );
};

describe('<Home />', () => {
  describe('renders', () => {
    test("coder's memo heading", () => {
      customRender();
      expect(getCodersMemoHeading()).toBeVisible();
      expect(getCodersMemoHeading()).toBeInTheDocument();
    });

    test('play game button', () => {
      customRender();
      expect(getPlayGameButton()).toBeVisible();
      expect(getPlayGameButton()).toBeInTheDocument();
    });

    test('settings button', () => {
      customRender();
      expect(getSettingsButton()).toBeVisible();
      expect(getSettingsButton()).toBeInTheDocument();
    });
  });

  test('game modal opens', async () => {
    customRender();
    expectGameModalToOpen();
  });

  test('game mode button focuses', async () => {
    customRender();
    await expectGameModalToOpen();
    const user = userEvent.setup();
    await user.click(getSingleModeButton());
    expect(getSingleModeButton()).toHaveFocus();
    await user.click(getMultiModeButton());
    expect(getMultiModeButton()).toHaveFocus();
  });

  difficultyToCardsCountMap.forEach(({ difficulty, cardsCount }) => {
    test(`game starts on ${difficulty} mode`, async () => {
      const store = configureStore({
        reducer: {
          memo: memoSlice,
        },
      });
      const history = createMemoryHistory();
      const user = userEvent.setup();

      const getDifficultyOption = () =>
        screen.getByRole('option', {
          name: difficulty,
        });

      const { rerender } = customRender();

      expect(history.location.pathname).toBe('/');
      await expectGameModalToOpen();
      await user.click(getGameDifficultySelect());
      await user.click(getDifficultyOption());
      const [_, playGameButton] = getAllPlayGameButtons();
      await user.click(playGameButton);
      history.push('/game');

      rerender(
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            <Main />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe('/game');
      expect(getAllCardCodeImages()).toHaveLength(cardsCount);
    });
  });
});
