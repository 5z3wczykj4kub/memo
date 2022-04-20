import { AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import reducer, { check, flip, touch } from '../../../rtk/memoSlice';
import { ICard } from '../../../rtk/types';
import getCardsInitialState from '../../../utils/functions/getCardsInitialState';
import {
  getMatchingCardsStoreData,
  renderCards,
} from '../../../utils/tests/testCard';

describe('game', () => {
  test('cards render', () => {
    renderCards();

    const cardBackImageElements = screen.getAllByAltText('code');

    const cardElements = cardBackImageElements.map(
      (cardBackImageElement) => cardBackImageElement.parentElement
    );

    cardElements.forEach((cardElement, index) => {
      expect(cardElement).toContainElement(cardBackImageElements[index]);
      expect(cardElement).toBeInTheDocument();
      expect(cardElement).toHaveClass('card');
    });

    expect(cardElements).toHaveLength(30);

    expect(reducer(undefined, {} as AnyAction).cards).toEqual(
      getCardsInitialState()
    );
  });

  test('cards get checked', () => {
    const initialMatchingCardsStoreData = getMatchingCardsStoreData();
    renderCards();

    const [firstMatchingCardElement, secondMatchingCardElement] =
      screen.getAllByAltText('React.js');

    [firstMatchingCardElement, secondMatchingCardElement].forEach(
      (matchingCardElement) => fireEvent.click(matchingCardElement)
    );

    const [firstMatchingCardState, secondMatchingCardState] =
      getMatchingCardsStoreData();

    [firstMatchingCardState, secondMatchingCardState].forEach(
      (matchingCardState) => {
        expect(matchingCardState.isTouched).toBe(true);
        expect(matchingCardState.isFlipped).toBe(true);
        waitFor(() => expect(matchingCardState.isChecked).toBe(true));
      }
    );

    const cardsStateAfterFirstMatchingCardTouch = reducer(
      { cards: initialMatchingCardsStoreData as ICard[] },
      touch(firstMatchingCardState.id)
    );

    const cardsStateAfterSecondMatchingCardTouch = reducer(
      cardsStateAfterFirstMatchingCardTouch,
      touch(secondMatchingCardState.id)
    );

    const cardsStateAfterFirstMatchingCardFlip = reducer(
      cardsStateAfterSecondMatchingCardTouch,
      flip(firstMatchingCardState.id)
    );

    const cardsStateAfterSecondMatchingCardFlip = reducer(
      cardsStateAfterFirstMatchingCardFlip,
      flip(secondMatchingCardState.id)
    );

    const { cards: cardsStateAfterCheck } = reducer(
      cardsStateAfterSecondMatchingCardFlip,
      check()
    );

    cardsStateAfterCheck.forEach((cardStateAfterCheck) =>
      expect(cardStateAfterCheck).toEqual({
        ...cardStateAfterCheck,
        isTouched: true,
        isFlipped: true,
        isChecked: true,
      })
    );
  });

  // TODO
  test('cards get unflipped', () => {});
});
