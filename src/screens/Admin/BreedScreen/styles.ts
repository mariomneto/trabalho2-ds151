import { CheckBox } from '@rneui/base';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

export const Container = styled(SafeAreaView)`
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  gap: 10px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #666;
`;

export const TopContainer = styled.View`
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  padding-left: 20px;
  padding-right: 20px;
`;
