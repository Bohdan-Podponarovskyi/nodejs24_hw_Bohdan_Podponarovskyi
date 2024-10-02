import { IUser } from './user.interface';

export type IUpdatePartUserInput = Partial<Omit<IUser, 'id'>>;