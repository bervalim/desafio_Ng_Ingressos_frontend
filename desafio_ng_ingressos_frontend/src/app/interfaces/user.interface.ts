export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  sex: string;
  avatar: string;
}

export type TRegisterUserRequest = Omit<IUser, 'id'>;

export type TRegisterUserResponse = Omit<IUser, 'password'>;

export interface ILoginUserResponse {
  token: string;
  user: TRegisterUserResponse;
}

export type TLoginUserRequest = Pick<IUser, 'email' | 'password'>;
