import { screen, within } from '@testing-library/react';
import { ICard } from '../../rtk/types';
import TechnologyName from '../constants';

class TestCard {
  readonly id: string;
  readonly name: string;
  readonly fileName: TechnologyName;
  readonly src: string;
  readonly isTouched: boolean;
  readonly isFlipped: boolean;
  readonly isChecked: boolean;

  constructor({
    id,
    name,
    fileName,
    src,
    isTouched,
    isFlipped,
    isChecked,
  }: ICard) {
    this.id = id;
    this.name = name;
    this.fileName = fileName;
    this.src = src;
    this.isTouched = isTouched;
    this.isFlipped = isFlipped;
    this.isChecked = isChecked;
  }

  getCard() {
    return screen.getByTestId(this.id);
  }

  expectToBeUnflipped() {
    const card = this.getCard();
    const cardBackImage = within(card).getByAltText('code');
    const cardFrontImage = within(card).getByAltText(this.name);

    expect(cardBackImage).toBeInTheDocument();
    expect(cardBackImage).toBeVisible();

    expect(cardFrontImage).toBeInTheDocument();
    expect(cardFrontImage).not.toBeVisible();

    expect(card).toBeInTheDocument();
    expect(card).toBeVisible();
  }

  expectToBeFlipped() {
    const card = this.getCard();
    const cardBackImage = within(card).getByAltText('code');
    const cardFrontImage = within(card).getByAltText(this.name);

    expect(cardBackImage).toBeInTheDocument();
    expect(cardBackImage).not.toBeVisible();

    expect(cardFrontImage).toBeInTheDocument();
    expect(cardFrontImage).toBeVisible();

    expect(card).toBeInTheDocument();
    expect(card).toBeVisible();
  }
}

export default TestCard;
