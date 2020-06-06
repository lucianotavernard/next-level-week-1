import styled from 'styled-components/native';

import { Platform, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const pickerSelectStyles = StyleSheet.create({
  placeholder: {
    fontFamily: 'Roboto_400Regular',
    alignItems: 'center',
    fontSize: 16,
    color: '#6C6C80',
  },
  viewContainer: {
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    paddingTop: 5,
  },
});

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
})`
  flex: 1;
`;

export const Background = styled.ImageBackground.attrs({
  imageStyle: {
    width: 274,
    height: 368,
  },
})`
  flex: 1;

  padding: 32px;
`;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  max-width: 260px;
  margin-top: 64px;
  color: #322153;
  font-size: 32px;
  font-family: 'Ubuntu_700Bold';
`;

export const Description = styled.Text`
  max-width: 260px;
  margin-top: 16px;
  color: #6c6c80;
  font-size: 16px;
  font-family: 'Roboto_400Regular';
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  overflow: hidden;

  height: 60px;
  margin-top: 8px;
  border-radius: 10px;
  background-color: #34cb79;
`;

export const ButtonIcon = styled.View`
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ButtonText = styled.Text`
  flex: 1;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
  text-align: center;
`;

export const Footer = styled.View``;
