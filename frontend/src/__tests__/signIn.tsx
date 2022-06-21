import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import App from '../App';
import { api } from '../rtk/api';
import authReducer from '../rtk/authSlice';
import memoReducer from '../rtk/memoSlice';
import { IAuthenticateFormValues } from '../rtk/types';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

const server = setupServer(
  rest.post<IAuthenticateFormValues>(
    `${process.env.REACT_APP_API_BASE_URL_ENDPOINT}/auth/sign-in`,
    (req, res, ctx) => {
      const { username } = req.body;

      switch (username) {
        case 'incorrectUser':
          return res(
            ctx.status(404),
            ctx.json({
              errors: [
                {
                  message: 'Invalid username or password',
                  param: 'username',
                },
              ],
            })
          );
        case 'correctUser':
          return res(
            ctx.status(200),
            ctx.json({
              username: 'correctUser',
              id: '62a1d6b62dbd0a71cd326b8e',
              token: 'validToken',
            })
          );
        case 'invalidUser':
          return res(
            ctx.status(200),
            ctx.json({
              username: 'invalidUser',
              id: '62a1d6b62dbd0a71cd326b8e',
              token: 'invalidToken',
            })
          );
      }
    }
  ),
  rest.get(
    `${process.env.REACT_APP_API_BASE_URL_ENDPOINT}/me`,
    (req, res, ctx) => {
      if (req.headers.get('authorization')?.split(' ')[1] === 'validToken')
        return res(
          ctx.status(200),
          ctx.json({
            username: 'correctUser',
            id: '62a1d6b62dbd0a71cd326b8e',
            token: 'validToken',
          })
        );
      return res(
        ctx.status(401),
        ctx.json({
          errors: [
            {
              message: 'Invalid token',
              param: 'authorization',
            },
          ],
        })
      );
    }
  )
);

const getSignInLink = () =>
  screen.getByRole('link', {
    name: /sign in/i,
  });

const getSignOutLink = () =>
  screen.getByRole('link', {
    name: /sign out/i,
  });

const querySignInModalHeading = () =>
  screen.queryByRole('heading', {
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

const getSignedInSuccessfullyToast = () =>
  screen.getByText(/welcome correctUser!/i);

const getSignedInFailedToast = () => screen.getByText(/signing in failed/i);

const getInvalidUsernameOrPasswordErrorToast = () =>
  screen.getByText(/invalid username or password/i);

const getFetchingUserProfileToast = () =>
  screen.getByText(/fetching user profile.../i);

const getSignedOutToast = () => screen.getByText(/signed out/i);

const getInvalidTokenToast = () => screen.getByText(/invalid token/i);

const customRender = () =>
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
      <Router>
        <App />
      </Router>
    </Provider>
  );
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
  describe('signing in', () => {
    test('fails', async () => {
      customRender();
      const user = userEvent.setup();
      expect(querySignInModalHeading()).toBeNull();
      await user.click(getSignInLink());
      expect(querySignInModalHeading()).toBeVisible();
      await user.type(getUsernameTextfield(), 'incorrectUser');
      await user.type(getPasswordTextfield(), 'superStrongPassword123');
      await user.click(getSubmitButton());
      await waitFor(() => expect(getSignedInFailedToast()).toBeVisible());
      await waitFor(() =>
        expect(getInvalidUsernameOrPasswordErrorToast()).toBeVisible()
      );
    });

    test('succeeds', async () => {
      customRender();
      const user = userEvent.setup();
      expect(querySignInModalHeading()).toBeNull();
      await user.click(getSignInLink());
      expect(querySignInModalHeading()).toBeVisible();
      await user.type(getUsernameTextfield(), 'correctUser');
      await user.type(getPasswordTextfield(), 'superStrongPassword123');
      await user.click(getSubmitButton());
      await waitFor(() => expect(getSignedInSuccessfullyToast()).toBeVisible());
      await waitFor(() => expect(querySignInModalHeading()).toBeNull());
    });
  });

  describe('fetching user profile', () => {
    test('succeeds', async () => {
      customRender();
      await waitFor(() => expect(getFetchingUserProfileToast()).toBeVisible());
      await waitFor(() => expect(getSignedInSuccessfullyToast()).toBeVisible());
      const user = userEvent.setup();
      await user.click(getSignOutLink());
      await waitFor(() => expect(getSignedOutToast()).toBeVisible());
      await user.click(getSignInLink());
      await user.type(getUsernameTextfield(), 'invalidUser');
      await user.type(getPasswordTextfield(), 'superStrongPassword123');
      await user.click(getSubmitButton());
      await waitFor(() => expect(querySignInModalHeading()).toBeNull());
    });

    test('fails', async () => {
      customRender();
      await waitFor(() => expect(getFetchingUserProfileToast()).toBeVisible());
      await waitFor(() => expect(getSignedInFailedToast()).toBeVisible());
      await waitFor(() => expect(getInvalidTokenToast()).toBeVisible());
    });
  });
});
