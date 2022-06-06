import { Schema, model } from 'mongoose';
import { PASSWORD_VALIDATION_REG_EXP } from '../validators/users';

export interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
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
});

export default model<IUser>('User', userSchema);
