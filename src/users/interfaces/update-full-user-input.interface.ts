import { IUser } from './user.interface';

export type IUpdateFullUserInput = Required<Omit<IUser, 'id' | 'accessToken' | 'refreshToken'>> & Partial<Pick<IUser, 'email' | 'password' >>;