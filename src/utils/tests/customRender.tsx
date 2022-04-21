import { AnyAction, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactChildren } from 'react';
import { Provider } from 'react-redux';
import memoSlice from '../../rtk/memoSlice';
import TechnologyName from '../constants';

let store: EnhancedStore<
  {
    memo: {
      cards: {
        id: string;
        name: string;
        fileName: TechnologyName;
        src: string;
        isTouched: boolean;
        isFlipped: boolean;
        isChecked: boolean;
      }[];
    };
  },
  AnyAction
>;

beforeEach(() => {
  store = configureStore({
    reducer: {
      memo: memoSlice,
    },
  });
});

const Providers = ({ children }: { children: ReactChildren }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: Providers, ...options });

export { store, customRender as render };
