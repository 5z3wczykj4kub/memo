import { render } from '@testing-library/react';
import { ReactChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../rtk/store';

const Providers = ({ children }: { children: ReactChildren }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: Providers, ...options });

export { customRender as render };
