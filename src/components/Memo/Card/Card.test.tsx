import { AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import reducer from '../../../rtk/memoSlice';
import expectCardElementToHaveAClass from '../../../utils/tests/expectCardElementToHaveAClass';
import {
  cardStoreData,
  findCard,
  initialCardState,
  renderCard,
} from '../../../utils/tests/testCard';

describe('card', () => {
  test('renders', () => {
    const { name } = cardStoreData;

    renderCard();

    const cardBackImageElement = screen.getByAltText('code');
    const cardFrontImageElement = screen.getByAltText(name);
    const cardElement = cardFrontImageElement.parentElement;

    [cardBackImageElement, cardFrontImageElement, cardElement].forEach(
      (element) => expect(element).toBeInTheDocument()
    );

    [cardBackImageElement, cardFrontImageElement].forEach((element) =>
      expect(cardElement).toContainElement(element)
    );

    expect(reducer(undefined, {} as AnyAction).cards.find(findCard)).toEqual(
      initialCardState
    );
  });

  // test('gets touched', () => {
  //   const { name } = cardStoreData;

  //   renderCard();

  //   const cardElement = screen.getByAltText(name).parentElement;

  //   fireEvent.click(cardElement as Element);
  // });

  // test('gets disabled after touch', () =>
  //   expectCardElementToHaveAClass('card--disabled'));

  // test('gets highlighted after touch', () =>
  //   expectCardElementToHaveAClass('card--flipped'));
});
