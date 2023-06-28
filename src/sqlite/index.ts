import {
  SQLiteDatabase,
  openDatabase,
  enablePromise,
} from 'react-native-sqlite-storage';
import { createUsersTable, saveUser, userExistsByLogin } from './tables/user';
import { User } from '../model/User';
import { UserType } from '../enum/UserType';
import { createPostsTable } from './tables/posts';

enablePromise(true);

//usuarios padrao
const userLogin = 'usuario';
const userPassword = '123';
const adminLogin = 'admin';
const adminPassword = 'admin';
export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  //conexao com o db do app
  return openDatabase({ name: 'trabalho2.db', location: 'default' });
};

export const initializeSQLiteDB = async () => {
  //conexao
  const db = await getDBConnection();

  //tabela de usuarios (cria se nao existir)
  createUsersTable(db).then(async () => {
    //checando se os usuarios padrao ja existem, ja que podem ter sido criados em outra instancia do app
    const adminExists = await userExistsByLogin(db, adminLogin);
    const userExists = await userExistsByLogin(db, userLogin);
    //caso nao existem, sao criados
    if (!adminExists) {
      const admin = {
        login: adminLogin,
        password: adminPassword,
        userType: UserType.ADMIN,
      } as User;
      await saveUser(db, admin);
    }
    if (!userExists) {
      const user = {
        login: userLogin,
        password: userPassword,
        userType: UserType.USER,
      } as User;
      await saveUser(db, user);
    }
  });
  createPostsTable(db);
};
