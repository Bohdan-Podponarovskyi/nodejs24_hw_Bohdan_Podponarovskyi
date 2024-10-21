export interface UserInterface {
  _id?: string,
  firstName: string,
  lastName: string,
  age: number,
  isStudent: boolean,
  email: string,
  password: string,
  accessToken?: string,
  refreshToken?: string
}
