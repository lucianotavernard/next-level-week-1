import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import axios from 'axios';
import Dropzone from '../../components/Dropzone';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import checkImg from '../../assets/check.svg';

import {
  Container,
  Field,
  FieldGroup,
  ItensGrid,
  ItensGridItem,
  FormSubmit,
  FormModalSuccess,
} from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface UF {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface IBGEUFResponse {
  id: number;
  sigla: string;
}

interface IBGECityResponse {
  id: number;
  nome: string;
}

type Coordinates = [number, number];

const CreatePoint: React.FC = () => {
  const history = useHistory();

  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<UF[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [initialPosition, setInitialPosition] = useState<Coordinates>([0, 0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Coordinates>([0, 0]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        setStates(
          response.data.map(uf => ({
            id: uf.id,
            name: uf.sigla,
          })),
        );
      });
  }, []);

  useEffect(() => {
    if (selectedUF === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`,
      )
      .then(response => {
        setCities(
          response.data.map(city => ({
            id: city.id,
            name: city.nome,
          })),
        );
      });
  }, [selectedUF]);

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>): void {
    const uf = event.target.value;

    setSelectedUF(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>): void {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent): void {
    const coordinates = event.latlng;

    setSelectedPosition([coordinates.lat, coordinates.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
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

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const { name, email, whatsapp } = formData;

    const uf = states.find(state => state.id === Number(selectedUF));
    const city = cities.find(state => state.id === Number(selectedCity));

    const [latitude, longitude] = selectedPosition;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', String(uf?.name));
    data.append('city', String(city?.name));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', selectedItems.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    await api.post('points', data);

    setModalOpen(true);

    setTimeout(() => history.push('/'), 2000);
  }

  return (
    <>
      <Container>
        <header>
          <img src={logoImg} alt="Ecoleta" />

          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>
            Cadatro do <br /> ponto de coleta
          </h1>

          <Dropzone onFileUploaded={setSelectedFile} />

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <Field>
              <label htmlFor="name">Nome da entidade</label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleInputChange}
              />
            </Field>

            <FieldGroup>
              <Field>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  id="whatsapp"
                  type="text"
                  name="whatsapp"
                  onChange={handleInputChange}
                />
              </Field>
            </FieldGroup>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>

              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map zoom={15} center={initialPosition} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={selectedPosition} />
            </Map>

            <FieldGroup>
              <Field>
                <label htmlFor="uf">Estado (UF)</label>
                <select
                  id="uf"
                  name="uf"
                  value={selectedUF}
                  onChange={handleSelectUF}
                >
                  <option value="0">Selecione uma UF</option>

                  {states.map(state => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field>
                <label htmlFor="city">Cidade</label>
                <select
                  id="city"
                  name="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value="0">Selecione uma cidade</option>

                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </Field>
            </FieldGroup>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens de coleta</h2>

              <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ItensGrid>
              {items.map(item => (
                <ItensGridItem
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  isSelected={selectedItems.includes(item.id)}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </ItensGridItem>
              ))}
            </ItensGrid>
          </fieldset>

          <FormSubmit>Cadastrar ponto de coleta</FormSubmit>
        </form>
      </Container>

      <FormModalSuccess isOpen={modalOpen}>
        <img src={checkImg} alt="Cadastro concluído!" />
        <h3>Cadastro concluído!</h3>
      </FormModalSuccess>
    </>
  );
};

export default CreatePoint;
