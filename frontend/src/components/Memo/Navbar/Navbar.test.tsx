import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import memoReducer from '../../../rtk/memoSlice';
import Navbar from './Navbar';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

const getNavbar = () => screen.getByRole('navigation');

describe('<Navbar />', () => {
  test('renders', () => {
    render(
      <Provider
        store={configureStore({
          reducer: {
            memo: memoReducer,
          },
        })}
      >
        <Navbar />
      </Provider>
    );
    expect(getNavbar()).toBeVisible();
    expect(getNavbar()).toBeInTheDocument();
  });
});
