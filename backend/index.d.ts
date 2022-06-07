import { IUser } from './src/models/User';

declare global {
  namespace Express {
    interface Request {
      currentUser: IUser;
    }
  }
}
