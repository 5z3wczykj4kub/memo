import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { api } from '../../rtk/api';
import authReducer from '../../rtk/authSlice';
import memoReducer from '../../rtk/memoSlice';
import Home from '../Home/Home';
import Profile from './Profile';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

const server = setupServer(
  rest.get<{}, { userId: string }>(
    `${process.env.REACT_APP_API_BASE_URL_ENDPOINT}/users/:userId`,
    (req, res, ctx) => {
      const { userId } = req.params;

      if (userId === 'existingUserId')
        return res(
          ctx.json({
            gamesLost: { easy: 3, extreme: 0, hard: 0, medium: 0 },
            gamesWon: { easy: 1, extreme: 0, hard: 0, medium: 0 },
            username: 'existingUser',
            experience: 32400,
            timePlayed: 615,
            id: 'existingUserId',
          })
        );
      return res(
        ctx.status(404),
        ctx.json({ errors: [{ message: "User doesn't exist" }] })
      );
    }
  )
);

const getCodersMemoHeading = () =>
  screen.getByRole('heading', {
    name: /coder's memo code/i,
  });

const getLoadingProfileMessage = () =>
  screen.getByRole('heading', {
    name: /loading profile\.\.\./i,
  });

const getSomethingWentWrongMessage = () =>
  screen.getByRole('heading', {
    name: /something went wrong/i,
  });

const getExistingUserHeading = () =>
  screen.getByRole('heading', {
    name: /user existingUser/i,
  });

const renderProfileByUserId = (userId: string = 'notExistingUser') =>
  render(
    <Provider
      store={configureStore({
        reducer: {
          [api.reducerPath]: api.reducer,
          auth: authReducer,
          memo: memoReducer,
        },
      })}
    >
      <Router initialEntries={[`/profile/${userId}`]}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:userId' element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.removeItem('token');
});
afterAll(() => server.close());

describe('<Profile />', () => {
  describe('fetching user profile', () => {
    test('fails', async () => {
      localStorage.setItem('token', 'tokenValue');
      renderProfileByUserId();
      expect(getLoadingProfileMessage()).toBeVisible();
      await waitFor(() => expect(getSomethingWentWrongMessage()).toBeVisible());
    });

    test('succeeds', async () => {
      localStorage.setItem('token', 'tokenValue');
      renderProfileByUserId('existingUserId');
      expect(getLoadingProfileMessage()).toBeVisible();
      await waitFor(() => expect(getExistingUserHeading()).toBeVisible());
    });
  });

  test('redirects to the homepage when a user is unauthenticated', () => {
    renderProfileByUserId();
    expect(getCodersMemoHeading()).toBeVisible();
  });
});
