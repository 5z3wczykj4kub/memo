import TechnologyName from '../utils/constants/index';

export type TGameStatus = 'won' | 'lost' | null;

export interface ICurrentUser {
  id: string | null;
  token: string | null;
  username: string | null;
}

export interface IAuthenticateFormValues {
  username: string;
  password: string;
  confirmedPassword?: string;
}

export interface IGameResultsPayload {
  time: number;
  points: number;
  gameStatus: TGameStatus;
  difficultyLevel: TDifficultyLevel;
}

export interface IGameResults {
  userId: string;
  experience: number;
  earnedExperience: number;
  timePlayed: number;
}

export interface IUserProfile {
  id: string | null;
  username: string | null;
  experience: number | null;
  timePlayed: number | null;
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
