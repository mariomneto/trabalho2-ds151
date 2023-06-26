import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { initializeSQLiteDB } from './src/sqlite';

type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
