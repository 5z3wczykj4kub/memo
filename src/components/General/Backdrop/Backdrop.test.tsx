import { render, screen, waitFor } from '@testing-library/react';
import Backdrop from './Backdrop';
import userEvent from '@testing-library/user-event';

const getBackdrop = () => screen.getByTestId('backdrop');

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);

describe('<Backdrop />', () => {
  test('appears', () => {
    render(<Backdrop isVisible={true} />);
    expect(getBackdrop()).toBeInTheDocument();
    waitFor(() => expect(getBackdrop()).toBeVisible());
  });

  test('disappears', () => {
    const { rerender } = render(<Backdrop isVisible={true} />);
    expect(getBackdrop()).toBeInTheDocument();
    waitFor(() => expect(getBackdrop()).toBeVisible());

    rerender(<Backdrop isVisible={false} />);
    waitFor(() => expect(getBackdrop()).not.toBeInTheDocument());
    waitFor(() => expect(getBackdrop()).not.toBeVisible());
  });

  test('invokes onclick handler', async () => {
    const onClickHandler = jest.fn();
    render(<Backdrop isVisible={true} onClick={onClickHandler} />);
    const user = userEvent.setup();
    await user.click(getBackdrop());
    expect(onClickHandler).toBeCalledTimes(1);
  });
});
