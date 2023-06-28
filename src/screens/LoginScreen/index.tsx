import { Button, CheckBox, Input } from '@rneui/themed';
import { useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ScreenNavigationProp, ScreenRouteProp } from '../../../App';
import { UserType } from '../../enum/UserType';
import { User } from '../../model/User';
import { getDBConnection } from '../../sqlite';
import { authUser } from '../../sqlite/tables/user';
import { useAppDispatch } from '../../store/Hooks';
import { setUser } from '../../store/slice/User';
import * as S from './styles';

interface HomeScreenProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const LoginScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  //dispatch para acoes do redux
  const dispatch = useAppDispatch();
  //admin ou usuario normal
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
    //autentica com o sqlite (usuarios fixos na db)
    const authenticatedUser = await authUser(db, user);
    if (authenticatedUser !== null) {
      //salva o usuario na store para gerenciamento de estado
      await dispatch(setUser(authenticatedUser));
      if (authenticatedUser.userType === UserType.ADMIN) {
        navigation.navigate('AdminScreen');
      } else {
        navigation.navigate('HomeScreen');
      }
    } else {
      //mensagem de erro no login
      showLoginErrorToast();
    }
  };

  const showLoginErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'Informações de login incorretas',
    });
  };

  return (
    <>
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
      <Toast />
    </>
  );
};

export default LoginScreen;
