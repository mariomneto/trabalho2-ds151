import { FlatList, Text, TextInput, View } from 'react-native';
import { useLazyGetCatBreedIdsQuery } from '../../../api/endpoints/CatsApi';
import { ScreenNavigationProp, ScreenRouteProp } from '../../../../App';
import { useEffect, useState } from 'react';
import { getAllPosts, setPostComment } from '../../../sqlite/tables/posts';
import { Post } from '../../../model/Post';
import { getDBConnection } from '../../../sqlite';
import * as S from './styles';
import { useAppSelector } from '../../../store/Hooks';
import { RootState } from '../../../store/store';

interface HomeScreenProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const username = useAppSelector((state: RootState) => {
    return state.user.login;
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const db = await getDBConnection();
    const posts = await getAllPosts(db);
    if (posts) {
      setPosts(posts);
    }
  };

  const onComment = async (item: Post) => {
    const db = await getDBConnection();
    await setPostComment(db, item.image.id, comment);
    getPosts();
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
    </S.Container>
  );
};

export default HomeScreen;
