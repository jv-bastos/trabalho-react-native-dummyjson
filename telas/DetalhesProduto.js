import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
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
    <View>
      <Image
        source={{ uri: produto.image }}
        style={{ width: 200, height: 200 }}
      />

      <Text>{produto.title}</Text>

      <Text>{produto.category}</Text>

      <Text>{produto.description}</Text>

      <Text>
        {produto.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Text>
    </View>
  );
}