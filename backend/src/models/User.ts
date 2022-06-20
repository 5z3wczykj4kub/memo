import { Schema, model } from 'mongoose';
import { PASSWORD_VALIDATION_REG_EXP } from '../validators/auth';

export interface IUser {
  id: string;
  username: string;
  password: string;
  experience: number;
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
      min: 0,
      max: 6000000,
      default: 0,
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
