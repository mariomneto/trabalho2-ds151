import { FlatList, Text, TextInput, View } from 'react-native';
import { useLazyGetCatBreedIdsQuery } from '../../../api/endpoints/CatsApi';
import { ScreenNavigationProp, ScreenRouteProp } from '../../../../App';
import { useEffect, useState } from 'react';
import { getAllPosts, setPostComment } from '../../../sqlite/tables/posts';
import { Post } from '../../../model/Post';
import { getDBConnection } from '../../../sqlite';
import * as S from './styles';
import { useAppDispatch, useAppSelector } from '../../../store/Hooks';
import { RootState } from '../../../store/store';
import { Button } from '@rneui/base';
import { resetUser } from '../../../store/slice/User';

interface HomeScreenProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  //pegando o nome do usuario da store do redux
  const username = useAppSelector((state: RootState) => {
    return state.user.login;
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    //conexao com o banco e recebimento dos posts
    const db = await getDBConnection();
    const posts = await getAllPosts(db);
    //com os objetos do db nao precisamos fazer mais chamadas para a catsApi pois armazenamos as urls das imagens
    if (posts) {
      setPosts(posts);
    }
  };

  const onComment = async (item: Post) => {
    //salvando o comentario do usuario
    const db = await getDBConnection();
    await setPostComment(db, item.image.id, comment);
    //pegando os posts atualizados
    getPosts();
  };

  const onLogout = () => {
    //logout: remove o usuario da store do redux e volta para o login
    dispatch(resetUser());
    navigation.navigate('LoginScreen');
  };

  return (
    <S.Container>
      <S.Title>{`Bem-vindo, Usuário`}</S.Title>
      <S.Subtitle>
        Selecione uma foto que goste para postar um comentário!
      </S.Subtitle>
      <FlatList
        data={posts}
        extraData={posts}
        style={{ height: '75%', borderRadius: 10 }}
        renderItem={({ item }) => (
          <S.PostItem>
            <S.CatImage key={item.image.id} source={{ uri: item.image.url }} />
            {item.comment ? (
              <S.Subtitle>{item.comment}</S.Subtitle>
            ) : (
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  marginTop: 10,
                  width: 200,
                  color: '#222',
                }}
                onChangeText={text => setComment(text)}
                onBlur={() => setComment('')}
                onSubmitEditing={() => onComment(item)}
              />
            )}
          </S.PostItem>
        )}
      />
      <Button size="md" color={'error'} onPress={onLogout}>
        Logout
      </Button>
    </S.Container>
  );
};

export default HomeScreen;
