import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { composeAsync } from 'expo-mail-composer';
import {
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';

import api from '../../services/api';

import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  ButtonText,
} from './styles';

interface Params {
  point_id: number;
}

interface Point {
  image: string;
  image_url: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

interface Item {
  title: string;
}

interface Data {
  point: Point;
  items: Item[];
}

const Detail: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadPoints(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get(`points/${routeParams.point_id}`);

        setData(response.data);
      } catch (error) {
        Alert.alert(
          'Oops!',
          'Ocorreu um erro ao carregar os detalhes do ponto de coleta!',
        );
      } finally {
        setLoading(false);
      }
    }

    loadPoints();
  });

  function handleNavigateBack(): void {
    navigation.goBack();
  }

  function handleComposerMail(): void {
    composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }

  function handleWhatsapp(): void {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre a coleta`,
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <PointImage
          source={{
            uri: data.point.image_url,
          }}
        />

        <PointName>{data.point.name}</PointName>
        <PointItems>{data.items.map(item => item.title).join(', ')}</PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {data.point.city},{data.point.uf}
          </AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>

        <Button onPress={handleComposerMail}>
          <Icon name="mail" size={20} color="#fff" />
          <ButtonText>Email</ButtonText>
        </Button>
      </Footer>
    </>
  );
};

export default Detail;
