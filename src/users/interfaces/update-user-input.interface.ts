import { UserInterface } from './user.interface';

export type UpdateUserInputInterface = Partial<Omit<UserInterface, 'id'>>;