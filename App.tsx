import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/User/HomeScreen';
import { initializeSQLiteDB } from './src/sqlite';
import AdminScreen from './src/screens/Admin/AdminScreen';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import BreedScreen from './src/screens/Admin/BreedScreen';

type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  AdminScreen: undefined;
  BreedScreen: undefined;
};

export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
export type ScreenRouteProp = RouteProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  useEffect(() => {
    initializeSQLiteDB();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BreedScreen"
            component={BreedScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
