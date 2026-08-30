import { IAdmin } from '../models/adminModel';

declare global {
  namespace Express {
    interface Request {
      admin?: IAdmin;
    }
  }
}

export {};
