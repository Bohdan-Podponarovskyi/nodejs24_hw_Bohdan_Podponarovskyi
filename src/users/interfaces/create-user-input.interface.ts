import { IUser } from './user.interface';

export type ICreateUserInput = Required<Omit<IUser, 'id' | 'accessToken' | 'refreshToken'>>;