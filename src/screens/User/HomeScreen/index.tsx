import { Text, View } from 'react-native';
import { useLazyGetCatBreedIdsQuery } from '../../../api/endpoints/CatsApi';
import { ScreenNavigationProp, ScreenRouteProp } from '../../../../App';
import { useEffect } from 'react';

interface HomeScreenProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [getCatBreedIds, { currentData: catBreeds }] =
    useLazyGetCatBreedIdsQuery();

  useEffect(() => {
    getCatBreedIds();
  }, []);

  useEffect(() => {}, [catBreeds]);

  return (
    <View>
      <Text>aaa</Text>
    </View>
  );
};

export default HomeScreen;
