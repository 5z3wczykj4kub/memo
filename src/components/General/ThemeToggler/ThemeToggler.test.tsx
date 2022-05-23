import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggler from './ThemeToggler';

const getThemeToggler = () => screen.getByTestId('theme-toggler');

describe('<ThemeToggler />', () => {
  test('renders', () => {
    render(<ThemeToggler />);
    expect(getThemeToggler()).toBeVisible();
    expect(getThemeToggler()).toBeInTheDocument();
  });

  test('toggles theme', async () => {
    render(<ThemeToggler />);
    expect(document.body).toHaveStyle('background-color: "#fff"');
    const user = userEvent.setup();
    await user.click(getThemeToggler());
    expect(document.body).toHaveStyle('background-color: "#333"');
  });
});
