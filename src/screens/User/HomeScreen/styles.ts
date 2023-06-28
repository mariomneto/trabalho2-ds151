import { CheckBox } from '@rneui/base';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

export const Container = styled(SafeAreaView)`
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  gap: 10px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #666;
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  margin-top: 5px;
  font-weight: 400;
  color: #999;
`;

export const PostItem = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  border-radius: 15px;
  padding: 20px;
  margin: 10px;
`;

export const CatImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
  width: 200px;
  color: #222;
`;
