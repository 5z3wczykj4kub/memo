import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../../providers/ThemeProvider';
import ThemeToggler from './ThemeToggler';

beforeEach(() => {
  // https://tinyurl.com/34hcxu5a
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
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

const getThemeToggler = () => screen.getByTestId('theme-toggler');

describe('<ThemeToggler />', () => {
  test('renders', () => {
    render(<ThemeToggler />);
    expect(getThemeToggler()).toBeVisible();
    expect(getThemeToggler()).toBeInTheDocument();
  });

  test('toggles theme', async () => {
    render(
      <ThemeProvider>
        <ThemeToggler />
      </ThemeProvider>
    );
    expect(document.body).not.toHaveClass('dark-theme');
    expect(document.body).toHaveStyle('background-color: "#fff"');
    const user = userEvent.setup();
    await user.click(getThemeToggler());
    expect(document.body).toHaveClass('dark-theme');
    expect(document.body).toHaveStyle('background-color: "#333"');
    await user.click(getThemeToggler());
    expect(document.body).not.toHaveClass('dark-theme');
    expect(document.body).toHaveStyle('background-color: "#fff"');
  });
});
