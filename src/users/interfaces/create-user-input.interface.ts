import { UserInterface } from './user.interface';

export type CreateUserInputInterface = Required<Omit<UserInterface, '_id' | 'accessToken' | 'refreshToken'>>;
