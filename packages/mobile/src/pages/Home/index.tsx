import React, { useState, useEffect, useMemo } from 'react';
import { View, Image, Text } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

import homeBackgroundImg from '../../assets/home-background.png';
import logoImg from '../../assets/logo.png';

import {
  Container,
  Background,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonIcon,
  ButtonText,
  pickerSelectStyles,
} from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/distritos?orderBy=nome`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  const selectedUfAndCity = useMemo(
    () => selectedUf !== '0' && selectedCity !== '0',
    [selectedUf, selectedCity],
  );

  function handleNavigatePoints(): void {
    navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
  }

  function handleSelectUf(uf: string): void {
    setSelectedUf(uf);
  }

  function handleSelectCity(city: string): void {
    setSelectedCity(city);
  }

  return (
    <Container>
      <Background source={homeBackgroundImg}>
        <Main>
          <Image source={logoImg} />

          <View>
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Description>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Description>
          </View>
        </Main>

        <Footer>
          <RNPickerSelect
            placeholder={{ label: 'Selecione um estado' }}
            Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
            style={pickerSelectStyles}
            onValueChange={(value: string) => handleSelectUf(value)}
            items={ufs.map(uf => ({ label: uf, value: uf }))}
          />

          <RNPickerSelect
            placeholder={{ label: 'Selecione uma cidade' }}
            Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
            style={pickerSelectStyles}
            onValueChange={(value: string) => handleSelectCity(value)}
            items={cities.map(city => ({ label: city, value: city }))}
          />

          <Button
            activeOpacity={selectedUfAndCity ? 1 : 0.6}
            onPress={selectedUfAndCity ? handleNavigatePoints : () => null}
          >
            <ButtonIcon>
              <Text>
                <Icon name="arrow-right" size={24} color="#fff" />
              </Text>
            </ButtonIcon>

            <ButtonText>Entrar</ButtonText>
          </Button>
        </Footer>
      </Background>
    </Container>
  );
};

export default Home;
