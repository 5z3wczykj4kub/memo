import { screen } from '@testing-library/react';
import TechnologyName from '../constants';

export const getCodeImage = () => screen.getByAltText('code');

export const getAllCodeImages = () => screen.getAllByAltText('code');

export const getCardImageByName = (name: keyof typeof TechnologyName) =>
  screen.getByAltText(name);

export const getAllCardImagesByName = (name: keyof typeof TechnologyName) =>
  screen.getAllByAltText(name);

export const getCard = () => getCodeImage().parentElement as Element;
