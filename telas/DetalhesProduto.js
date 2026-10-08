import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { api } from '../servicos/api';

export default function DetalhesProduto({ route }) {
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState('');
  const id = route.params.id;

  async function buscarProduto() {
    try {
      const resposta = await api.get(`/products/${id}`);
      setProduto(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar produto:', erro);
      setMensagemErro('Não foi possível carregar o produto.');      
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarProduto();
  }, [id]);

  if (carregando) {
    return (
      <ImageBackground
        source={require('../assets/fundoLogin.jpg')}
        style={estilos.container}
      >
        <View style={estilos.carregando}>
          <ActivityIndicator
            size="large"
            color="red"
          />

          <Text style={estilos.textoCarregando}>
            Carregando produto...
          </Text>
        </View>
      </ImageBackground>
    );
  }

  return mensagemErro ? (    
          <ImageBackground
            source={require('../assets/fundoLogin.jpg')}
            style={estilos.container}
          >
            <View style={estilos.conteudo}>            
              <Text style={estilos.descricao}>
                {mensagemErro}
              </Text>
            </View>
          </ImageBackground>
        )  : (
    <ImageBackground
      source={require('../assets/fundoLogin.jpg')}
      style={estilos.container}
    >
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.produto}>

          <Image
            source={{
              uri: produto.images?.[0] || produto.thumbnail
            }}
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
      </ScrollView>
    </ImageBackground>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 30
  },

  produto: {
    backgroundColor: '#00000099',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffffff55',
    padding: 20,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8
  },

  imagem: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20
  },

  titulo: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 5,
    marginBottom: 15
  },

  categoria: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 4
  },

  descricao: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 25,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 3
  },

  preco: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'red',
    textShadowOffset: {
      width: 1,
      height: 2
    },
    textShadowRadius: 5
  },

  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textoCarregando: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 18,
    marginTop: 15,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 5
  }
});