import { AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import reducer, { flip, touch } from '../../../rtk/memoSlice';
import { ICard } from '../../../rtk/types';
import {
  findCard,
  getCardStoreData,
  initialCardState,
  renderCard,
} from '../../../utils/tests/testCard';

describe('card', () => {
  test('card renders', () => {
    const { name } = getCardStoreData();

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

    expect(cardElement).toHaveClass('card');

    expect(reducer(undefined, {} as AnyAction).cards.find(findCard)).toEqual(
      initialCardState
    );
  });

  test('card gets touched', () => {
    const { id, name } = getCardStoreData();

    renderCard();

    const cardElement = screen.getByAltText(name).parentElement;

    fireEvent.click(cardElement as Element);

    expect(cardElement).toHaveClass('card card--flipped card--disabled');

    const { isTouched } = getCardStoreData();

    expect(isTouched).toBe(true);

    const cardsStateAfterTouch = reducer(
      { cards: [initialCardState as ICard] },
      touch(id)
    );

    const cardElementTouched = cardsStateAfterTouch.cards.find(findCard);

    expect(cardElementTouched).toEqual({
      ...initialCardState,
      isTouched: true,
    });
  });

  test('card gets flipped', () => {
    const { id, name } = getCardStoreData();

    renderCard();

    const cardElement = screen.getByAltText(name).parentElement;

    fireEvent.click(cardElement as Element);

    expect(cardElement).toHaveClass('card card--flipped card--disabled');

    const { isFlipped } = getCardStoreData();

    expect(isFlipped).toBe(true);

    const cardsStateAfterTouch = reducer(
      { cards: [initialCardState as ICard] },
      touch(id)
    );

    const cardElementTouched = cardsStateAfterTouch.cards.find(findCard);

    expect(cardElementTouched).toEqual({
      ...initialCardState,
      isTouched: true,
    });

    const cardsStateAfterFlip = reducer(cardsStateAfterTouch, flip(id));

    const cardElementFlipped = cardsStateAfterFlip.cards.find(findCard);

    expect(cardElementFlipped).toEqual({
      ...initialCardState,
      isTouched: true,
      isFlipped: true,
    });
  });
});
