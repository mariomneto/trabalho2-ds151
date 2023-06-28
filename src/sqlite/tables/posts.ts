import { SQLiteDatabase, enablePromise } from 'react-native-sqlite-storage';
import { UserType } from '../../enum/UserType';
import { CatImage } from '../../model/CatImage';
import { User } from '../../model/User';
import { Post } from '../../model/Post';

const postsTableName = 'Posts';
enablePromise(true);

export const createPostsTable = async (db: SQLiteDatabase) => {
  //cria a tabela para registrar as postagens do admin que serao acessadas na home
  const query = `CREATE TABLE IF NOT EXISTS ${postsTableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      imageId VARCHAR(20), 
      url VARCHAR(100),
      comment VARCHAR(255)
    );`;
  db.transaction(tx => {
    tx.executeSql(query);
  });
};

export const createPost = async (db: SQLiteDatabase, image: CatImage) => {
  //salva (cria ou edita) post
  try {
    const insertQuery = `INSERT INTO ${postsTableName} (imageId, url, comment) VALUES (?, ?, ?)`;
    db.transaction(tx => {
      tx.executeSql(insertQuery, [image.id, image.url, '']);
    });
  } catch (error) {
    console.error(error);
    throw new Error('Problema com a tabela de posts na base de dados.');
  }
};

// export const getAllPosts = async (db: SQLiteDatabase) => {
//   //retorna todos os usuarios
//   try {
//     const posts: Post[] = [];
//     await db.transaction(async tx => {
//       await tx.executeSql(`SELECT * FROM ${postsTableName}`);
//     });

//     return new Promise<Post[] | null>((resolve, reject) => {
//       const searchQuery = `SELECT * FROM ${postsTableName}`;
//       db.transaction(tx => {
//         tx.executeSql(searchQuery, [], (tx, results) => {
//           if (results && results.rows && results.rows.item(0)) {
//             //retorna o usuario ao inves de boolean
//             const item = results.rows.item(0);
//             const post = {
//                 image: {
//                     id: item.imageId,
//                     url: item.url
//                 } as CatImage,
//                 comment: item.comment
//             } as Post;
//             posts.push(post);
//           }
//           //nao encontrou usuario
//           resolve(null);
//         });
//       }).catch(error => {
//         //rejeita a promise
//         reject(error);
//       });
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
