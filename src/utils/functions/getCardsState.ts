import TechnologyNames from '../constants';

const getCardsState = () => {
  const [keys, values] = [
    Object.keys(TechnologyNames),
    Object.values(TechnologyNames),
  ];

  const cards = [];

  for (let i = 0; i < keys.length * 2; i++) {
    const index = i % keys.length;
    const name = keys[index];
    const id = `${name}${i}`;
    const key = id;
    const fileName = values[index];
    const src = `./images/${fileName}.png`;

    cards.push({
      id,
      key,
      name,
      fileName,
      src,
    });
  }

  return cards;
};

export default getCardsState;
