import TechnologyName from '../utils/constants/index';

export interface ICard {
  id: string;
  name: string;
  fileName: TechnologyName;
  src: string;
  isTouched: boolean;
  isFlipped: boolean;
  isChecked: boolean;
}

export type TDifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme';
