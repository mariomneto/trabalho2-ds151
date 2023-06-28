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
  font-weight: 400;
  color: #999;
`;

export const CatImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const CatItem = styled.TouchableOpacity`
  width: 130px;
  height: 130px;
  border-radius: 10px;
  margin: 10px;
`;
