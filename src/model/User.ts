import { UserType } from '../enum/UserType';

export interface User {
  id: number;
  login: string;
  password: string;
  userType: UserType;
}

export type LoginUser = Omit<User, 'id'>;
