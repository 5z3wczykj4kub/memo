import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ToastContainer from '../components/General/ToastContainer/ToastContainer';
import GameModal from '../components/Home/GameModal/GameModal';
import SettingsModal from '../components/Home/SettingsModal/SettingsModal';
import SignInForm from '../components/Home/SignInForm/SignInForm';
import SignInModal from '../components/Home/SignInModal/SignInModal';
import SignUpForm from '../components/Home/SignUpForm/SignUpForm';
import SignUpModal from '../components/Home/SignUpModal/SignUpModal';
import EndgameModal from '../components/Memo/EndgameModal/EndgameModal';
import NavbarEndgameButtons from '../components/Memo/Navbar/NavbarEndgameButtons/NavbarEndgameButtons';
import ThemeProvider from '../providers/ThemeProvider';
import { api } from '../rtk/api';
import {
  default as authReducer,
  default as memoReducer,
} from '../rtk/memoSlice';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

beforeEach(() => {
  // https://tinyurl.com/34hcxu5a
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('dark theme is applied on', () => {
  test('<ToastContainer />', () => {
    render(
      <ThemeProvider>
        <ToastContainer />
      </ThemeProvider>
    );
  });

  test('<GameModal />', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <GameModal isModalVisible={true} setIsModalVisible={() => {}} />
        </ThemeProvider>
      </MemoryRouter>
    );
  });

  test('<SettingsModal />', () => {
    render(
      <ThemeProvider>
        <SettingsModal isModalVisible={true} setIsModalVisible={() => {}} />
      </ThemeProvider>
    );
  });

  test('<SignInForm />', () => {
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
        <ThemeProvider>
          <SignInForm setIsModalVisible={() => {}} />
        </ThemeProvider>
      </Provider>
    );
  });

  test('<SignInModal />', () => {
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
        <ThemeProvider>
          <SignInModal isModalVisible={true} setIsModalVisible={() => {}} />
        </ThemeProvider>
      </Provider>
    );
  });

  test('<SignUpForm />', () => {
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
        <ThemeProvider>
          <SignUpForm setIsModalVisible={() => {}} />
        </ThemeProvider>
      </Provider>
    );
  });

  test('<SignUpModal />', () => {
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
        <ThemeProvider>
          <SignUpModal isModalVisible={true} setIsModalVisible={() => {}} />
        </ThemeProvider>
      </Provider>
    );
  });

  test('<EndgameModal />', () => {
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
        <ThemeProvider>
          <EndgameModal
            isVisible={true}
            setIsVisible={() => {}}
            gameStatus='lost'
            gameDurationTimestamp={0}
            onGameRestart={() => {}}
          />
        </ThemeProvider>
      </Provider>
    );
  });

  test('<NavbarEndgameButtons />', () => {
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
        <ThemeProvider>
          <NavbarEndgameButtons
            onGameRestart={() => {}}
            setIsEndgameModalVisible={() => {}}
          />
        </ThemeProvider>
      </Provider>
    );
  });
});
