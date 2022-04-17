import { fireEvent, screen } from '@testing-library/react';
import { cardStoreData, renderCard } from './testCard';

const expectCardElementToHaveAClass = (className: string) => {
  const { name } = cardStoreData;

  renderCard();

  const cardElement = screen.getByAltText(name).parentElement;

  fireEvent.click(cardElement as Element);

  expect(cardElement).toHaveClass(className);
};

export default expectCardElementToHaveAClass;
