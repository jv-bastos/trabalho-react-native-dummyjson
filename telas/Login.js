import { useFonts } from 'expo-font';
import { useState } from 'react';
import { ActivityIndicator, ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../servicos/api';

export default function Login({navigation}) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [fontsLoaded] = useFonts({NovaSquare: require('../assets/fonts/NovaSquare_400Regular.ttf')});

  async function entrar() {
    Keyboard.dismiss();
    setCarregando(true);

    try {
      setMensagemErro('');

      const resposta = await api.get('/users');
      const usuarioEncontrado = resposta.data.users.find(
          (item) =>
              item.username === usuario &&
              item.password === senha
      );

      if (!usuarioEncontrado) {
          setMensagemErro('Usuário ou senha inválidos.');
          return;
      }        

      const respostaLogin = await api.post('/user/login', {
          username: usuario,
          password: senha,
      });

      console.log('Login realizado:', respostaLogin.data);
      navigation.replace('Home', {usuario: usuario});
    } 
    catch (erro) {
        console.log('Erro ao buscar usuários:', erro);
        setMensagemErro('Não foi possível realizar o login.')
    } finally {
      setCarregando(false);
    };
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../assets/fundoLogin.jpg')}
      style={estilos.container}
    >
      <View style={estilos.conteudo}>

        <View style={estilos.cabecalho}>
          <Text style={estilos.titulo}>
            Fake Store ATITUS
          </Text>

          <Text style={estilos.subtitulo}>
            Bem-vindo!
          </Text>

          <Text style={estilos.subtitulo}>
            Faça o login para continuar
          </Text>
        </View>

        <View style={estilos.formulario}>

          <TextInput
            style={estilos.input}
            placeholder="Digite seu usuário"
            placeholderTextColor="#ccc"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <TextInput
            style={estilos.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#ccc"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          {mensagemErro !== '' && (
            <Text style={estilos.erro}>
              {mensagemErro}
            </Text>
          )}

          <View style={estilos.brilhoBotao}>
            <TouchableOpacity
              style={estilos.botao}
              onPress={entrar}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={estilos.textoBotao}>
                  Entrar
                </Text>
              )}
            </TouchableOpacity>
          </View>

        </View>

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
    paddingHorizontal: 25
  },

  cabecalho: {
    alignItems: 'center',
    marginTop: 130
  },

  titulo: {
    fontFamily: 'NovaSquare',
    fontSize: 39,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowRadius: 6
  },

  subtitulo: {
    fontFamily: 'NovaSquare',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowRadius: 6
  },

  formulario: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 200
  },

  input: {
    height: 52,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#00000099',
    borderWidth: 1,
    borderColor: '#ffffff55',
    color: 'white',
    fontFamily: 'NovaSquare',
    fontSize: 18
  },

  erro: {
    color: '#ff5555',
    fontFamily: 'Kalam',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15
  },

  brilhoBotao: {
    marginTop: 15,
    borderRadius: 30,
    backgroundColor: '#ff000055',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 15
  },

  botao: {
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000aa',
    borderWidth: 1,
    borderColor: '#ffffff88'
  },

  textoBotao: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 1,
    },
    textShadowRadius: 6
  },
});