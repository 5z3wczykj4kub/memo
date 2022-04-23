import { AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import reducer, { check, flip, touch, unflip } from '../../../rtk/memoSlice';
import { ICard } from '../../../rtk/types';
import getInitialCardsState from '../../../utils/functions/getInitialCardsState';
import {
  getAllCardsStoreData,
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
      getInitialCardsState()
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

  test('cards get unflipped', () => {
    renderCards();

    const reactCardElement =
      screen.getAllByAltText('React.js')[0].parentElement!;
    const angularCardElement =
      screen.getAllByAltText('Angular.js')[0].parentElement!;

    fireEvent.click(reactCardElement);
    fireEvent.click(angularCardElement);

    const allCardsStoreData = getAllCardsStoreData();
    const reactCardStoreData = allCardsStoreData.find(
      ({ name }) => name === 'React.js'
    )!;
    const angularCardStoreData = allCardsStoreData.find(
      ({ name }) => name === 'Angular.js'
    )!;

    [reactCardStoreData, angularCardStoreData].forEach((card) => {
      expect(card?.isTouched).toBe(true);
      expect(card?.isFlipped).toBe(true);
      waitFor(() => expect(card?.isChecked).toBe(true));
    });

    const cardsStateAfterReactCardTouch = reducer(
      { cards: allCardsStoreData as ICard[] },
      touch(reactCardStoreData.id)
    );

    const cardsStateAfterAngularCardTouch = reducer(
      cardsStateAfterReactCardTouch,
      touch(angularCardStoreData.id)
    );

    const cardsStateAfterReactCardFlip = reducer(
      cardsStateAfterAngularCardTouch,
      flip(reactCardStoreData.id)
    );

    const cardsStateAfterAngularCardFlip = reducer(
      cardsStateAfterReactCardFlip,
      flip(angularCardStoreData.id)
    );

    const { cards: cardsStateAfterUnflip } = reducer(
      cardsStateAfterAngularCardFlip,
      unflip()
    );

    cardsStateAfterUnflip.forEach((cardStateAfterUnflip) =>
      expect(cardStateAfterUnflip).toEqual({
        ...cardStateAfterUnflip,
        isTouched: false,
        isFlipped: false,
        isChecked: false,
      })
    );
  });
});
