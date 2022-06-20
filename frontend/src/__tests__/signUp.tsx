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
    `${process.env.REACT_APP_API_BASE_URL_ENDPOINT}/auth/sign-up`,
    (req, res, ctx) => {
      const { username } = req.body;

      if (username === 'existinguser') {
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
      await user.type(getUsernameTextfield(), 'existinguser');
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
      await user.type(getUsernameTextfield(), 'newuser');
      await user.type(getPasswordTextfield(), 'superstrongpassword123');
      await user.type(getConfirmPasswordTextfield(), 'superstrongpassword123');
      await user.click(getSubmitButton());
      await waitFor(() => expect(getSignedUpSuccessfullyToast()).toBeVisible());
      await waitFor(() => expect(querySignUpModalHeading()).toBeNull());
    });
  });
});
