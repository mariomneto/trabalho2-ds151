import { SQLiteDatabase, enablePromise } from 'react-native-sqlite-storage';
import { LoginUser, User } from '../../model/User';
import { UserType } from '../../enum/UserType';

const usersTableName = 'Users';
enablePromise(true);

export const createUsersTable = async (db: SQLiteDatabase) => {
  //cria tabela de usuarios dentro do db fornecido
  //id: chave primaria e criada automaticamente
  //login e senha para autenticacao
  //userType para saber se usuario normal ou admin
  const query = `CREATE TABLE IF NOT EXISTS ${usersTableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      login VARCHAR(20), 
      password VARCHAR(20),
      userType INT(5)
    );`;
  db.transaction(tx => {
    tx.executeSql(query);
  });
};

export const saveUser = async (db: SQLiteDatabase, user: User) => {
  //salva (cria ou edita) usuario na db informada
  try {
    const insertQuery = `INSERT INTO ${usersTableName} (login, password, userType) VALUES (?, ?, ?)`;
    db.transaction(tx => {
      tx.executeSql(insertQuery, [user.login, user.password, user.userType]);
    });
  } catch (error) {
    console.error(error);
    throw new Error('Problema com a tabela de usuarios na base de dados.');
  }
};

// export const getAllUsers = async (db: SQLiteDatabase) => {
//   //retorna todos os usuarios
//   try {
//     const users: User[] = [];
//     await db.transaction(async tx => {
//       await tx.executeSql(`SELECT * FROM ${usersTableName}`);
//     });

//     const rows = results[0].rows;
//     for (let i = 0; i < rows.length; i++) {
//       const row = rows.item(i);
//       const user: User = {
//         id: row.id,
//         login: row.login,
//         password: row.password,
//         userType: row.userType as UserType,
//       };
//       users.push(user);
//     }
//     return users;
//   } catch (error) {
//     console.error(error);
//     throw Error('Problema com a tabela de usuarios na base de dados.');
//   }
// };

export const userExistsByLogin = async (
  db: SQLiteDatabase,
  login: string,
): Promise<boolean> => {
  //pesquisa um usuario por login e retorna se existe
  //cria um promise que pode resolver ou retornar um erro
  return new Promise<boolean>((resolve, reject) => {
    const searchQuery = `SELECT * FROM ${usersTableName} WHERE login = ?`;
    db.transaction(tx => {
      tx.executeSql(searchQuery, [login], (tx, results) => {
        if (results && results.rows && results.rows.item(0)) {
          //encontrou usuario
          resolve(true);
        }
        //nao encontrou usuario
        resolve(false);
      });
    }).catch(error => {
      //rejeita a promise
      reject(error);
    });
  });
};

export const getUserByLogin = async (
  db: SQLiteDatabase,
  login: string,
): Promise<User | null> => {
  return new Promise<User | null>((resolve, reject) => {
    const searchQuery = `SELECT * FROM ${usersTableName} WHERE login = ?`;
    db.transaction(tx => {
      tx.executeSql(searchQuery, [login], (tx, results) => {
        if (results && results.rows && results.rows.item(0)) {
          //retorna o usuario ao inves de boolean
          const item = results.rows.item(0);
          const user = {
            id: item.id,
            login: item.login,
            password: item.password,
            userType: item.userType as UserType,
          } as User;
          resolve(user);
        }
        //nao encontrou usuario
        resolve(null);
      });
    }).catch(error => {
      //rejeita a promise
      reject(error);
    });
  });
};

export const authUser = async (
  db: SQLiteDatabase,
  user: LoginUser,
): Promise<User | null> => {
  return new Promise<User | null>(async (resolve, reject) => {
    const dbUser = await getUserByLogin(db, user.login);
    if (dbUser !== null) {
      if (
        user.password === dbUser.password &&
        user.userType === dbUser.userType
      ) {
        console.log(`logado`);
        resolve(dbUser);
      }
    }
    resolve(null);
  });
};
