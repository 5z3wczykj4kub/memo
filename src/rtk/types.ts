import TechnologyName from '../utils/constants/index';

export interface ICard {
  id: string;
  name: string;
  fileName: TechnologyName;
  src: string;
  isFlipped: boolean;
  isFlipping: boolean;
  isChecked: boolean;
}
