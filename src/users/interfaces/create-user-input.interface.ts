import { UserInterface } from './user.interface';

export type CreateUserInputInterface = Required<Omit<UserInterface, 'id' | 'accessToken' | 'refreshToken'>>;
