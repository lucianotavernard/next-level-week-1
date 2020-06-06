import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;

  padding: ${Constants.statusBarHeight + 20}px 32px 32px;
`;

export const PointImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 120px;
  margin-top: 32px;
  border-radius: 10px;
`;

export const PointName = styled.Text`
  margin-top: 24px;
  color: #322153;
  font-size: 28px;
  font-family: 'Ubuntu_700Bold';
`;

export const PointItems = styled.Text`
  font-family: 'Roboto_400Regular';
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  color: #6c6c80;
`;

export const Address = styled.View`
  margin-top: 32px;
`;

export const AddressTitle = styled.Text`
  color: #322153;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
`;

export const AddressContent = styled.Text`
  font-family: 'Roboto_400Regular';
  line-height: 24px;
  margin-top: 8px;
  color: #6c6c80;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-color: #999;
  padding: 20px 32px;
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 48%;
  height: 50px;
  border-radius: 10px;
  background-color: #34cb79;
`;

export const ButtonText = styled.Text`
  margin-left: 8px;
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
`;
