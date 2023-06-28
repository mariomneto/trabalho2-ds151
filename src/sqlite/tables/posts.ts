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

export const setPostComment = async (
  db: SQLiteDatabase,
  index: string,
  comment: string,
) => {
  //edita o post com o imageId fornecido e atualiza o comentario
  try {
    console.log(
      `UPDATE ${postsTableName} SET comment = ${comment} WHERE imageId = ${index}`,
    );
    const insertQuery = `UPDATE ${postsTableName} SET comment = "${comment}" WHERE imageId="${index}"`;
    db.transaction(tx => {
      tx.executeSql(insertQuery);
    });
  } catch (error) {
    console.error(error);
    throw new Error('Problema com a tabela de posts na base de dados.');
  }
};

export const getAllPosts = async (db: SQLiteDatabase) => {
  //retorna todos os posts
  try {
    const posts: Post[] = [];
    await db.transaction(async tx => {
      await tx.executeSql(`SELECT * FROM ${postsTableName}`);
    });

    return new Promise<Post[] | null>((resolve, reject) => {
      const searchQuery = `SELECT * FROM ${postsTableName}`;
      db.transaction(tx => {
        tx.executeSql(searchQuery, [], (tx, results) => {
          if (results && results.rows && results.rows.item(0)) {
            // console.log(`1`, results);
            // console.log(`2`, results.rows);
            // console.log(`2l`, results.rows.length);
            // console.log(`3`, results.rows.item(11));

            //iterando os resultados e gerando o objeto compativel com o model de Post
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              const post = {
                image: {
                  id: row.imageId,
                  url: row.url,
                } as CatImage,
                comment: row.comment,
              } as Post;
              posts.push(post);
            }
            resolve(posts);
          }
          //algo deu errado na query
          resolve(null);
        });
      }).catch(error => {
        //deu erro e rejeita a promise
        reject(error);
      });
    });
  } catch (error) {
    console.error(error);
    throw Error('Problema com a tabela de posts na base de dados.');
  }
};
