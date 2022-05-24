import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import memoSlice from './rtk/memoSlice';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

describe('<App />', () => {
  test('renders', () => {
    render(
      <Provider
        store={configureStore({
          reducer: {
            memo: memoSlice,
          },
        })}
      >
        <App />
      </Provider>
    );
    waitFor(() => expect(document.getElementById('app')).toBeInTheDocument());
  });
});
