import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

const get404 = () =>
  screen.getByRole('heading', {
    name: /404/i,
  });

const getPageNotFound = () =>
  screen.getByRole('heading', {
    name: /page not found/i,
  });

describe('<NotFound />', () => {
  test('renders', () => {
    render(<NotFound />);
    expect(get404()).toBeVisible();
    expect(getPageNotFound()).toBeVisible();
  });
});
