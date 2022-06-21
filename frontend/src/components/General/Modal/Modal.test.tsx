import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalWithPortal, { Modal } from './Modal';

const getBackdrop = () => screen.getByTestId('backdrop');

const getModal = () => screen.getByText(/content/i);

const getCloseModalButton = (container: Element) =>
  container.querySelector('#modal > div > header > button')!;

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop');
document.body.appendChild(backdropRoot);
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

describe('<Modal />', () => {
  test('appears', () => {
    render(
      <Modal isVisible={true} setIsVisible={() => {}}>
        content
      </Modal>
    );
    expect(getModal()).toBeInTheDocument();
    waitFor(() => expect(getModal()).toBeVisible());
  });

  test('disappears', () => {
    const { rerender } = render(
      <Modal isVisible={true} setIsVisible={() => {}}>
        content
      </Modal>
    );
    expect(getModal()).toBeInTheDocument();
    waitFor(() => expect(getModal()).toBeVisible());

    rerender(
      <Modal isVisible={false} setIsVisible={() => {}}>
        content
      </Modal>
    );
    waitFor(() => expect(getModal()).not.toBeInTheDocument());
    waitFor(() => expect(getModal()).not.toBeVisible());
  });

  test('invokes backdrop onclick handler', async () => {
    const onClickHandler = jest.fn();
    const { container } = render(
      <Modal isVisible={true} setIsVisible={onClickHandler}>
        content
      </Modal>
    );
    const user = userEvent.setup();
    await user.click(getBackdrop());
    expect(onClickHandler).toBeCalledTimes(1);
    await user.click(getCloseModalButton(container));
    expect(onClickHandler).toBeCalledTimes(2);
    expect(onClickHandler).toHaveBeenCalledWith(false);
  });
});

describe('<ModalWithPortal />', () => {
  test('appears', () => {
    render(
      <ModalWithPortal isVisible={true} setIsVisible={() => {}}>
        content
      </ModalWithPortal>
    );
    expect(getModal()).toBeInTheDocument();
    waitFor(() => expect(getModal()).toBeVisible());
  });

  test('disappears', () => {
    const { rerender } = render(
      <ModalWithPortal isVisible={true} setIsVisible={() => {}}>
        content
      </ModalWithPortal>
    );
    expect(getModal()).toBeInTheDocument();
    waitFor(() => expect(getModal()).toBeVisible());

    rerender(
      <ModalWithPortal isVisible={false} setIsVisible={() => {}}>
        content
      </ModalWithPortal>
    );
    waitFor(() => expect(getModal()).not.toBeInTheDocument());
    waitFor(() => expect(getModal()).not.toBeVisible());
  });

  test('invokes backdrop onclick handler', async () => {
    const onClickHandler = jest.fn();
    const { container } = render(
      <ModalWithPortal isVisible={true} setIsVisible={onClickHandler}>
        content
      </ModalWithPortal>
    );
    const user = userEvent.setup();
    await user.click(getBackdrop());
    expect(onClickHandler).toBeCalledTimes(1);
    await user.click(getCloseModalButton(container));
    expect(onClickHandler).toBeCalledTimes(2);
    expect(onClickHandler).toHaveBeenCalledWith(false);
  });
});
