import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

import api from '../../services/api';

import {
  Container,
  Title,
  Description,
  MapContainer,
  Map,
  MapMarker,
  MapMarkerContainer,
  MapMarkerImage,
  MapMarkerTitle,
  ItemsContainer,
  ItemsContainerScroll,
  Item,
  ItemTitle,
} from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

type Coordinates = [number, number];

const Points: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<Coordinates>([0, 0]);

  useEffect(() => {
    async function loadInitialPosition(): Promise<void> {
      const { status } = await requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ooops!',
          'Precisamos de sua permissão para obter a localização',
        );

        return;
      }

      const location = await getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadInitialPosition();
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get('points', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItems,
        },
      })
      .then(response => {
        setPoints(response.data);
      });
  }, [selectedItems, routeParams.city, routeParams.uf]);

  function handleNavigateBack(): void {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number): void {
    navigation.navigate('Detail', { point_id: id });
  }

  function handleSelectItem(id: number): void {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);

      return;
    }

    setSelectedItems([...selectedItems, id]);
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        <MapContainer>
          {initialPosition[0] !== 0 && (
            <Map
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(point => (
                <MapMarker
                  key={String(point.id)}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <MapMarkerContainer>
                    <MapMarkerImage source={{ uri: point.image_url }} />
                    <MapMarkerTitle>{point.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                </MapMarker>
              ))}
            </Map>
          )}
        </MapContainer>
      </Container>

      <ItemsContainer>
        <ItemsContainerScroll horizontal>
          {items.map(item => (
            <Item
              key={String(item.id)}
              isSelected={selectedItems.includes(item.id)}
              onPress={() => handleSelectItem(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          ))}
        </ItemsContainerScroll>
      </ItemsContainer>
    </>
  );
};

export default Points;
