import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import App from '../App';
import { authApi } from '../rtk/authApi';
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
    `${process.env.REACT_APP_AUTH_API_ENDPOINT}/signup`,
    (req, res, ctx) => {
      const { username } = req.body;

      if (username === 'old_username') {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                message: 'Username already used',
                param: 'username',
              },
            ],
          })
        );
      }

      ctx.status(201);
      return res(ctx.json({}));
    }
  ),
  rest.post<IAuthenticateFormValues>(
    `${process.env.REACT_APP_AUTH_API_ENDPOINT}/signin`,
    (req, res, ctx) => {
      const { username } = req.body;

      if (username === 'incorrect_user') {
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
      }

      ctx.status(200);
      return res(
        ctx.json({
          username: 'correct_user',
          id: '62a1d6b62dbd0a71cd326b8e',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpZCI6IjYyYTFkNmI2MmRiZDBhNzFjZDMyNmI4ZSIsImlhdCI6MTY1NTE0NjE4NX0.NSab5Hv3-8GgmggjW9aSJsn7YogTh-Y9UjFT-oju0sQ',
        })
      );
    }
  )
);

const getSignUpLink = () =>
  screen.getByRole('link', {
    name: /sign up/i,
  });

const querySignUpModalHeading = () =>
  screen.queryByRole('heading', {
    name: /sign up/i,
  });

const getUsernameTextfield = () =>
  screen.getByRole('textbox', {
    name: /username/i,
  });

const getPasswordTextfield = () => screen.getByLabelText(/^password/i);

const getConfirmPasswordTextfield = () =>
  screen.getByLabelText(/confirm password/i);

const getSubmitButton = () =>
  screen.getByRole('button', {
    name: /submit/i,
  });

const getSignedUpSuccessfullyToast = () =>
  screen.getByText(/signed up successfully/i);

const getSignedUpFailedToast = () => screen.getByText(/signing up failed/i);

const getUsernameAlreadyUsedErrorToast = () =>
  screen.getByText(/username already used/i);

beforeEach(() => {
  render(
    <Provider
      store={configureStore({
        reducer: {
          [authApi.reducerPath]: authApi.reducer,
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
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
  describe('signing up', () => {
    test('fails', async () => {
      const user = userEvent.setup();
      expect(querySignUpModalHeading()).toBeNull();
      await user.click(getSignUpLink());
      expect(querySignUpModalHeading()).toBeVisible();
      await user.type(getUsernameTextfield(), 'old_username');
      await user.type(getPasswordTextfield(), 'superstrongpassword123');
      await user.type(getConfirmPasswordTextfield(), 'superstrongpassword123');
      await user.click(getSubmitButton());
      await waitFor(() => expect(getSignedUpFailedToast()).toBeVisible());
      await waitFor(() =>
        expect(getUsernameAlreadyUsedErrorToast()).toBeVisible()
      );
    });

    test('succeeds', async () => {
      const user = userEvent.setup();
      expect(querySignUpModalHeading()).toBeNull();
      await user.click(getSignUpLink());
      expect(querySignUpModalHeading()).toBeVisible();
      await user.type(getUsernameTextfield(), 'new_username');
      await user.type(getPasswordTextfield(), 'superstrongpassword123');
      await user.type(getConfirmPasswordTextfield(), 'superstrongpassword123');
      await user.click(getSubmitButton());
      await waitFor(() => expect(getSignedUpSuccessfullyToast()).toBeVisible());
      await waitFor(() => expect(querySignUpModalHeading()).toBeNull());
    });
  });
});
