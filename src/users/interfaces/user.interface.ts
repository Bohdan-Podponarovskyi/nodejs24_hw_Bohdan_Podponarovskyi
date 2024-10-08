export interface UserInterface {
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  isStudent: boolean,
  email: string,
  password: string,
  accessToken?: string,
  refreshToken?: string
}
