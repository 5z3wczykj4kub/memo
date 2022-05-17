import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import memoSlice from '../../../rtk/memoSlice';
import { ICard } from '../../../rtk/types';
import TechnologyName from '../../../utils/constants';
import {
  getAllCardImagesByName,
  getAllCodeImages,
} from '../../../utils/tests/queries';
import Memo from '../Memo';

const reactCardsProps: [ICard, ICard] = [
  {
    id: 'React.js8',
    name: 'React.js',
    fileName: 'react' as TechnologyName,
    src: './images/react.png',
    isTouched: false,
    isFlipped: false,
    isChecked: false,
  },
  {
    id: 'React.js17',
    name: 'React.js',
    fileName: 'react' as TechnologyName,
    src: './images/react.png',
    isTouched: false,
    isFlipped: false,
    isChecked: false,
  },
];

const angularCardPorps: [ICard, ICard] = [
  {
    id: 'Angular.js0',
    name: 'Angular.js',
    fileName: 'angular' as TechnologyName,
    src: './images/angular.png',
    isTouched: false,
    isFlipped: false,
    isChecked: false,
  },
  {
    id: 'Angular.js9',
    name: 'Angular.js',
    fileName: 'angular' as TechnologyName,
    src: './images/angular.png',
    isTouched: false,
    isFlipped: false,
    isChecked: false,
  },
];

beforeEach(() =>
  render(
    <Provider
      store={configureStore({
        reducer: {
          memo: memoSlice,
        },
      })}
    >
      <Memo.Grid>
        {[...reactCardsProps, ...angularCardPorps].map((card) => (
          <Memo.Card key={card.id} {...card} />
        ))}
      </Memo.Grid>
    </Provider>
  )
);

describe('<Game />', () => {
  test('renders', () => {
    const codeImages = getAllCodeImages();
    const cardImages = [
      ...getAllCardImagesByName('React.js'),
      ...getAllCardImagesByName('Angular.js'),
    ];
    const cards = cardImages.map((cardImage) => cardImage.parentElement);

    codeImages.forEach((codeImage) => {
      expect(codeImage).toBeInTheDocument();
      expect(codeImage).toBeVisible();
    });

    cardImages.forEach((cardImage) => {
      expect(cardImage).toBeInTheDocument();
      expect(cardImage).not.toBeVisible();
    });

    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
      expect(card).toBeVisible();
    });
  });
});
