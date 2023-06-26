import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'styled-components';

export const Container = styled(SafeAreaView)`
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  gap: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #666;
`;

export const CheckBoxContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
