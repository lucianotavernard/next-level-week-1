import styled, { css } from 'styled-components/native';
import Constants from 'expo-constants';

import MapView, { Marker } from 'react-native-maps';

export const Container = styled.View`
  flex: 1;

  padding: ${Constants.statusBarHeight + 20}px 32px 0;
`;

export const PointImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 120px;
  margin-top: 32px;
  border-radius: 10px;
`;

export const Title = styled.Text`
  margin-top: 24px;
  font-size: 20px;
  font-family: 'Ubuntu_700Bold';
`;

export const Description = styled.Text`
  margin-top: 4px;
  color: #6c6c80;
  font-size: 16px;
  font-family: 'Roboto_400Regular';
`;

export const MapContainer = styled.View`
  flex: 1;
  overflow: hidden;

  width: 100%;
  margin-top: 16px;
  border-radius: 10px;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const MapMarker = styled(Marker)`
  width: 90px;
  height: 80px;
`;

export const MapMarkerContainer = styled.View``;

export const MapMarkerImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 90px;
  height: 45px;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1;

  margin-top: 4px;
  line-height: 24px;
  color: #fff;
  font-size: 13px;
  font-family: 'Roboto_400Regular';
`;

export const ItemsContainer = styled.View`
  flex-direction: row;

  margin: 16px 0 32px;
`;

export const ItemsContainerScroll = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
})`
  padding: 0 20px;
`;

interface ItemProps {
  isSelected: boolean;
}

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<ItemProps>`
  justify-content: space-between;
  align-items: center;

  height: 120px;
  width: 120px;
  margin-right: 8px;
  padding: 20px 16px 16px;
  border: 2px #eee;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;

  ${props =>
    props.isSelected &&
    css`
      border: 2px #34cb79;
      background-color: #e1faec;
    `}
`;

export const ItemTitle = styled.Text`
  font-size: 13px;
  font-family: 'Roboto_400Regular';
  text-align: center;
`;
