import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { api } from '../servicos/api';

export default function DetalhesProduto({ route }) {
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const id = route.params.id;

  async function buscarProduto() {
    try {
      const resposta = await api.get(`/products/${id}`);
      setProduto(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar produto:', erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarProduto();
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
      <Image
        source={{ uri: produto.image }}
        style={estilos.imagem}
      />

      <Text style={estilos.titulo}>
        {produto.title}
      </Text>

      <Text style={estilos.categoria}>
        {produto.category}
      </Text>

      <Text style={estilos.descricao}>
        {produto.description}
      </Text>

      <Text style={estilos.preco}>
        {produto.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  imagem: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  categoria: {
    fontSize: 16,
    marginBottom: 15,
  },

  descricao: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },

  preco: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});