import { render, screen } from '@testing-library/react';
import Divider from './Divider';

const getDivider = () => screen.getByTestId('divider');

describe('<Divider />', () => {
  test('renders', () => {
    render(<Divider />);
    expect(getDivider()).toBeVisible();
    expect(getDivider()).toBeInTheDocument();
  });
});
