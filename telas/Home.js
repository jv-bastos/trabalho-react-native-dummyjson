import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { api } from '../servicos/api';

export default function Home({navigation}) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  async function buscarProdutos() {
    try {
      const resposta = await api.get('/products');        
      setProdutos(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar produtos:', erro);
    } finally {
      setCarregando(false);
    }
  }

  async function buscarCategorias(){
    try {
      const resposta = await api.get('/products/categories');
      setCategorias(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar categorias:', erro);
    }
  }

  async function buscProdPorCat(categoria) {
    try {
      setCarregando(true);
      const resposta = await api.get(`/products/category/${categoria}`);
      setProdutos(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar produtos por categoria:', erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
    buscarCategorias();
  }, []);

  if (carregando) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
  <View style={estilos.container}>
    <Picker
      selectedValue={categoriaSelecionada}
      onValueChange={(valor) => {
        setCategoriaSelecionada(valor);
        if(valor === ''){
          buscarProdutos();
        } else {
          buscProdPorCat(valor);
        }
      }}
    >
      <Picker.Item label="Todas as categorias" value="" />

      {categorias.map((categoria) => (
        <Picker.Item
          key={categoria}
          label={categoria}
          value={categoria}
        />
      ))}
    </Picker>

    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DetalhesProduto', {id: item.id})}
        >
          <View style={estilos.produto}>
            <Image
              source={{ uri: item.image}}
              style={estilos.imagem}
            />

            <Text style={estilos.titulo}>{item.title}</Text>

            <Text style={estilos.preco}>
              {item.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  produto: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },

  imagem: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  preco: {
    fontSize: 16,
    marginTop: 5,
  },
});