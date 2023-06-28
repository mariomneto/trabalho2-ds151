import { Button, Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { ScreenNavigationProp, ScreenRouteProp } from '../../../../App';
import { useLazyGetCatImagesQuery } from '../../../api/endpoints/CatsApi';
import { useAppSelector } from '../../../store/Hooks';
import { RootState } from '../../../store/store';
import * as S from './styles';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../../store/slice/User';
import { resetBreeds } from '../../../store/slice/Breeds';
import { CatImage } from '../../../model/CatImage';
import { createPost } from '../../../sqlite/tables/posts';
import { getDBConnection } from '../../../sqlite';
import Toast from 'react-native-toast-message';

interface AdminScreenProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

interface ImageItem {
  image: CatImage;
  selected: boolean;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const selectedBreeds = useAppSelector((state: RootState) => {
    return state.breeds;
  });
  const [getCatImages, { data: images }] = useLazyGetCatImagesQuery();
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

  useEffect(() => {
    //extrai os ids do objeto de raças da store do redux e gera
    //uma string com todos eles separados por virgula (para a query html)
    const breeds = selectedBreeds.map(item => item.id).join(',');
    const limit = 10;
    getCatImages({ breeds, limit });
  }, [selectedBreeds]);

  useEffect(() => {
    if (images) {
      const imageItems = images.map(
        image => ({ image, selected: false } as ImageItem),
      );
      setImageItems(imageItems);
    }
  }, [images]);

  const onLogout = () => {
    dispatch(resetUser());
    dispatch(resetBreeds());
    navigation.navigate('LoginScreen');
  };

  const onPressItem = (item: ImageItem) => {
    const items = imageItems.map(i => {
      if (i.image.id === item.image.id) {
        const newItem = { ...i, selected: !i.selected } as ImageItem;
        return newItem;
      }
      return i;
    });
    setImageItems(items);
  };

  const onConfirmSelection = async () => {
    imageItems.forEach(async item => {
      const db = await getDBConnection();
      createPost(db, item.image);
    });
    showConfirmPostToast();
  };

  const showConfirmPostToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: 'Posts adicionados à Home',
    });
  };

  return (
    <S.Container>
      <S.Title>Bem-vindo, Admin</S.Title>
      <S.Subtitle>Selecione as imagens para postar na Home</S.Subtitle>
      <Button size="md" onPress={() => navigation.navigate('BreedScreen')}>
        Selecionar Raças
      </Button>

      <FlatList
        data={imageItems}
        extraData={imageItems}
        numColumns={2}
        style={{ height: '65%', borderRadius: 10 }}
        renderItem={({ item }) => (
          <S.CatItem onPress={() => onPressItem(item)}>
            <S.CatImage key={item.image.id} source={{ uri: item.image.url }} />
            <View style={{ position: 'absolute', bottom: 14, right: 14 }}>
              <Icon
                color={'#ffffff'}
                name={`${item.selected ? 'check-square-o' : 'square-o'}`}
                type="font-awesome"
              />
            </View>
          </S.CatItem>
        )}
      />
      <Button size="md" onPress={onConfirmSelection}>
        Confirmar Seleção
      </Button>
      <Button size="md" color={'error'} onPress={onLogout}>
        Logout
      </Button>
      <Toast />
    </S.Container>
  );
};

export default AdminScreen;
