import TechnologyName from '../constants';

const getCardsInitialState = () => {
  const [keys, values] = [
    Object.keys(TechnologyName),
    Object.values(TechnologyName),
  ];

  const cards = [];

  for (let i = 0; i < keys.length * 2; i++) {
    const index = i % keys.length;
    const name = keys[index];
    const id = `${name}${i}`;
    const fileName = values[index];
    const src = `./images/${fileName}.png`;
    /**
     * Flag set instantly after the card is clicked.
     */
    const isTouched = false;
    /**
     * Flag set after the card is finishes the flip transition.
     */
    const isFlipped = false;
    const isChecked = false;

    cards.push({
      id,
      name,
      fileName,
      src,
      isTouched,
      isFlipped,
      isChecked,
    });
  }

  return cards;
};

export default getCardsInitialState;
