import { Schema, model } from 'mongoose';
import { PASSWORD_VALIDATION_REG_EXP } from '../validators/auth';
import { EXPERIENCE_VALIDATION_MESSAGE } from '../validators/user';

interface IGamesPlayedPerDifficultyLevel {
  easy: number;
  medium: number;
  hard: number;
  extreme: number;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  experience: number;
  timePlayed: number;
  gamesLost: IGamesPlayedPerDifficultyLevel;
  gamesWon: IGamesPlayedPerDifficultyLevel;
  format: () => IUser;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
      match: PASSWORD_VALIDATION_REG_EXP,
    },
    experience: {
      type: Number,
      required: true,
      min: [0, EXPERIENCE_VALIDATION_MESSAGE],
      max: [60000, EXPERIENCE_VALIDATION_MESSAGE],
      default: 0,
    },
    timePlayed: {
      type: Number,
      required: true,
      default: 0,
    },
    gamesLost: {
      easy: {
        type: Number,
        required: true,
        default: 0,
      },
      medium: {
        type: Number,
        required: true,
        default: 0,
      },
      hard: {
        type: Number,
        required: true,
        default: 0,
      },
      extreme: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    gamesWon: {
      easy: {
        type: Number,
        required: true,
        default: 0,
      },
      medium: {
        type: Number,
        required: true,
        default: 0,
      },
      hard: {
        type: Number,
        required: true,
        default: 0,
      },
      extreme: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  },
  { versionKey: false }
);

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.method('format', function () {
  const user: any = this.toObject();
  user.id = user._id;
  delete user._id;
  delete user.password;
  return user;
});

export default model<IUser>('User', userSchema);
