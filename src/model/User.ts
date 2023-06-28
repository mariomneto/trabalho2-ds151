import { UserType } from '../enum/UserType';

export interface User {
  id: number;
  login: string;
  password: string;
  userType: UserType;
}

//tipo sem o id, para o login (o id esta presente apenas depois que esta salvo no banco)
export type LoginUser = Omit<User, 'id'>;
