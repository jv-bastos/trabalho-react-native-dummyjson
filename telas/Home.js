import { useFonts } from 'expo-font';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { api } from '../servicos/api';

function formatarPreco(preco) {
  return Number(preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export default function Home({ navigation, route }) {
  const usuario = route?.params?.usuario ?? '';

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [textoVisivel, setTextoVisivel] = useState(false);

  const animacaoMenu = useRef(new Animated.Value(55)).current;
  const animacaoCategorias = useRef(new Animated.Value(0)).current;
  const animacaoItens = useRef(new Animated.Value(-20)).current;

  const requisicaoAtual = useRef(0);

  const { width: larguraTela } = useWindowDimensions();

  const [fontsLoaded] = useFonts({
    NovaSquare: require('../assets/fonts/NovaSquare_400Regular.ttf')
  });

  async function buscarProdutos() {
    const numeroRequisicao = ++requisicaoAtual.current;

    try {
      const resposta = await api.get('/products?limit=0');

      if (numeroRequisicao === requisicaoAtual.current) {
        setProdutos(resposta.data.products);
      }
    } catch (erro) {
      if (numeroRequisicao === requisicaoAtual.current) {
        console.log('Erro ao buscar produtos:', erro);
      }
    } finally {
      if (numeroRequisicao === requisicaoAtual.current) {
        setCarregando(false);
      }
    }
  }

  async function buscarCategorias() {
    try {
      const resposta = await api.get('/products/category-list');

      setCategorias(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar categorias:', erro);
    }
  }

  async function buscarProdutosPorCategoria(categoria) {
    const numeroRequisicao = ++requisicaoAtual.current;

    setCarregando(true);

    try {
      const categoriaCodificada = encodeURIComponent(categoria);

      const resposta = await api.get(
        `/products/category/${categoriaCodificada}`
      );

      if (numeroRequisicao === requisicaoAtual.current) {
        setProdutos(resposta.data.products);
      }
    } catch (erro) {
      if (numeroRequisicao === requisicaoAtual.current) {
        console.log('Erro ao buscar produtos por categoria:', erro);
      }
    } finally {
      if (numeroRequisicao === requisicaoAtual.current) {
        setCarregando(false);
      }
    }
  }

  function animarMenu(abrir) {
    if (abrir) {
      setMenuAberto(true);
      setTextoVisivel(true);
    } else {
      setTextoVisivel(false);
    }

    Animated.parallel([
      Animated.timing(animacaoMenu, {
        toValue: abrir ? larguraTela - 40 : 55,
        duration: 300,
        useNativeDriver: false
      }),

      Animated.timing(animacaoCategorias, {
        toValue: abrir ? 380 : 0,
        duration: 300,
        useNativeDriver: false
      }),

      Animated.timing(animacaoItens, {
        toValue: abrir ? 0 : -20,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      if (!abrir) {
        setMenuAberto(false);
      }
    });
  }

  function alternarMenu() {
    animarMenu(!menuAberto);
  }

  useEffect(() => {
    buscarProdutos();
    buscarCategorias();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (carregando && !menuAberto) {
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
            Carregando produtos...
          </Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/fundoLogin.jpg')}
      style={estilos.container}
    >
      <View style={estilos.conteudo}>

        <Text style={estilos.nomeUsuario}>
          {menuAberto ? '' : `Olá, ${usuario}`}
        </Text>

        <Animated.View
          style={[
            estilos.filtro,
            {
              width: animacaoMenu
            }
          ]}
        >
          <TouchableOpacity
            style={estilos.botaoFiltro}
            onPress={alternarMenu}
            activeOpacity={0.8}
          >
            {textoVisivel && (
              <Text
                style={estilos.textoFiltro}
                numberOfLines={1}
              >
                {categoriaSelecionada === ''
                  ? 'Todas as categorias'
                  : categoriaSelecionada}
              </Text>
            )}

            <Text style={estilos.iconeMenu}>
              ☰
            </Text>
          </TouchableOpacity>

          {menuAberto && (
            <Animated.ScrollView
              style={[
                estilos.menuCategorias,
                {
                  height: animacaoCategorias
                }
              ]}
              nestedScrollEnabled
              showsVerticalScrollIndicator
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: animacaoItens
                    }
                  ]
                }}
              >
                {categoriaSelecionada !== '' && (
                  <TouchableOpacity
                    style={estilos.itemCategoria}
                    onPress={() => {
                      setCategoriaSelecionada('');
                      buscarProdutos();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={estilos.textoCategoria}>
                      Todas as categorias
                    </Text>
                  </TouchableOpacity>
                )}

                {categorias
                  .filter(
                    (categoria) =>
                      categoria !== categoriaSelecionada
                  )
                  .map((categoria) => (
                    <TouchableOpacity
                      key={categoria}
                      style={estilos.itemCategoria}
                      onPress={() => {
                        setCategoriaSelecionada(categoria);
                        buscarProdutosPorCategoria(categoria);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={estilos.textoCategoria}>
                        {categoria}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </Animated.View>
            </Animated.ScrollView>
          )}
        </Animated.View>

        {carregando ? (
          <View style={estilos.carregandoCategoria}>
            <ActivityIndicator
              size="large"
              color="red"
            />

            <Text style={estilos.textoCarregando}>
              Carregando produtos...
            </Text>
          </View>
        ) : (
          <FlatList
            data={produtos}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={estilos.lista}
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            windowSize={5}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={estilos.produto}
                onPress={() =>
                  navigation.navigate('DetalhesProduto', {
                    id: item.id
                  })
                }
                activeOpacity={0.8}
              >
                <Image
                  source={{
                    uri: item.images?.[0] || item.thumbnail
                  }}
                  style={estilos.imagem}
                />

                <Text style={estilos.tituloProduto}>
                  {item.title}
                </Text>

                <Text style={estilos.preco}>
                  {formatarPreco(item.price)}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

      </View>
    </ImageBackground>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 110
  },

  nomeUsuario: {
    position: 'absolute',
    left: 20,
    top: 17,
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 25,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 4
  },

  filtro: {
    width: 55,
    alignSelf: 'flex-end',
    borderRadius: 25,
    backgroundColor: '#00000023',
    borderWidth: 1,
    borderColor: '#ffffff55',
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8
  },

  botaoFiltro: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },

  textoFiltro: {
    flex: 1,
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 16,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 4
  },

  iconeMenu: {
    fontSize: 25,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 4
  },

  menuCategorias: {
    maxHeight: 380,
    borderTopWidth: 1,
    borderTopColor: '#ffffff55',
    backgroundColor: '#00000070'
  },

  itemCategoria: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff22'
  },

  textoCategoria: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 15,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 3
  },

  lista: {
    paddingBottom: 20
  },

  produto: {
    backgroundColor: '#00000099',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffffff55',
    padding: 18,
    marginBottom: 20,
    alignItems: 'center',
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 15
  },

  tituloProduto: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 5
  },

  preco: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
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

  carregandoCategoria: {
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