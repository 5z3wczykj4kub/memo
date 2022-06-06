import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const getButton = () =>
  screen.getByRole('button', {
    name: /click me/i,
  });

describe('<Button />', () => {
  test('renders', () => {
    render(<Button>Click me</Button>);
    expect(getButton()).toBeVisible();
    expect(getButton()).toBeInTheDocument();
  });

  test('invokes onclick handler', async () => {
    const onClickHandler = jest.fn();
    render(<Button onClick={onClickHandler}>Click me</Button>);
    const user = userEvent.setup();
    await user.click(getButton());
    expect(onClickHandler).toBeCalledTimes(1);
  });
});
