import { Text, View } from 'react-native';
import { Input, Icon, CheckBox, Button } from '@rneui/themed';
import { ScreenNavigationProp, ScreenRouteProp } from '../../../App';
import { UserType } from '../../enum/UserType';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as S from './styles';
import { User } from '../../model/User';
import { authUser } from '../../sqlite/tables/user';
import { getDBConnection } from '../../sqlite';

interface HomeScreenProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const LoginScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [userType, setUserType] = useState<UserType>(UserType.USER);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLogin = async () => {
    const user = {
      login,
      password,
      userType,
    } as User;
    const db = await getDBConnection();
    const authenticatedUser = authUser(db, user);
    if (authenticatedUser !== null) {
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <S.Container>
      <S.Title>Tipo de Usuario</S.Title>
      <S.CheckBoxContainer>
        <CheckBox
          checked={userType === UserType.USER}
          containerStyle={{ flex: 1, borderRadius: 10 }}
          onIconPress={() => setUserType(UserType.USER)}
          onPress={() => setUserType(UserType.USER)}
          size={30}
          title="Usuario"
        />
        <CheckBox
          checked={userType === UserType.ADMIN}
          containerStyle={{ flex: 1, borderRadius: 10 }}
          onIconPress={() => setUserType(UserType.ADMIN)}
          onPress={() => setUserType(UserType.ADMIN)}
          size={30}
          title="Admin"
        />
      </S.CheckBoxContainer>
      <Input
        placeholder="login"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        onChangeText={login => setLogin(login)}
      />
      <Input
        secureTextEntry={true}
        placeholder="password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={password => setPassword(password)}
      />
      <Button size="md" onPress={onLogin}>
        Login
      </Button>
    </S.Container>
  );
};

export default LoginScreen;
