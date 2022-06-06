import { TDifficultyLevel } from '../../rtk/types';
import TechnologyName from '../constants';

const getInitialCardsState = (difficultyLevel: TDifficultyLevel = 'medium') => {
  const [keys, values] = [
    Object.keys(TechnologyName),
    Object.values(TechnologyName),
  ];

  const getCardsCountByDifficultyLevel = (difficultyLevel: TDifficultyLevel) =>
    difficultyLevel === 'easy'
      ? 9
      : difficultyLevel === 'medium'
      ? 6
      : difficultyLevel === 'hard'
      ? 3
      : 0;

  const cards = [];

  for (
    let i = 0;
    i < (keys.length - getCardsCountByDifficultyLevel(difficultyLevel)) * 2;
    i++
  ) {
    const index =
      i % (keys.length - getCardsCountByDifficultyLevel(difficultyLevel));
    const name = keys[index];
    const id = `${name}${i}`;
    const fileName = values[index];
    const src = `./images/${fileName}.png`;
    const isTouched = false;
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

export default getInitialCardsState;
