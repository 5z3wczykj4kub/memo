import TechnologyName from '../utils/constants/index';

export interface ICurrentUser {
  id: string | null;
  token: string | null;
  username: string | null;
  experience: number | null;
  timePlayed: number | null;
}

export interface ICurrentUserGameResults extends ICurrentUser {
  earnedExperience: number;
}

export interface IAuthenticateFormValues {
  username: string;
  password: string;
  confirmedPassword?: string;
}

export interface IGameResults {
  time: number;
  points: number;
  difficultyLevel: TDifficultyLevel;
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
