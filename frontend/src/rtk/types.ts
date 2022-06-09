import TechnologyName from '../utils/constants/index';

export interface ICurrentUser {
  id: string | null;
  username: string | null;
  token: string | null;
}

export interface IAuthenticateFormValues {
  username: string;
  password: string;
  confirmedPassword?: string;
}

export interface IResponseCatchError {
  data: {
    errors: { message: string; param: string }[];
  };
  status: number;
}

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
