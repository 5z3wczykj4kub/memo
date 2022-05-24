import { render } from '@testing-library/react';
import ThemeProvider from './ThemeProvider';

let matches = false;

beforeEach(() => {
  // https://tinyurl.com/34hcxu5a
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
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

describe('<ThemeProvider />', () => {
  test('renders with light theme', () => {
    render(<ThemeProvider />);
    expect(document.body).not.toHaveClass('dark-theme');
    expect(document.body).toHaveStyle('background-color: "#fff"');
    matches = true;
  });

  test('renders with dark theme', () => {
    render(<ThemeProvider />);
    expect(document.body).toHaveClass('dark-theme');
    expect(document.body).toHaveStyle('background-color: "#333"');
    matches = false;
  });
});
