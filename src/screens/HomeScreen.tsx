import { Text, View } from 'react-native';
import { ScreenNavigationProp, ScreenRouteProp } from '../navigation';

interface HomeScreenProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  return (
    <View>
      <Text>aaa</Text>
    </View>
  );
};

export default HomeScreen;
