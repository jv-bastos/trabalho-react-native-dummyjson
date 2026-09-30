import { useFonts } from 'expo-font';
import { useState } from 'react';
import { ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../servicos/api';

export default function Login({navigation}) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [fontsLoaded] = useFonts({NovaSquare: require('../assets/fonts/NovaSquare_400Regular.ttf')});

  async function entrar(){
    Keyboard.dismiss();
    try {
        setMensagemErro('');

        const resposta = await api.get('/users');
        const usuarioEncontrado = resposta.data.find(
            (item) =>
                item.username === usuario &&
                item.password === senha
        );

        if (!usuarioEncontrado) {
            setMensagemErro('Usuário ou senha inválidos.');
            return;
        }        

        const respostaLogin = await api.post('/auth/login', {
            username: usuario,
            password: senha,
        });

        console.log('Login realizado:', respostaLogin.data);
        navigation.replace('Home');
    } 
    catch (erro) {
        console.log('Erro ao buscar usuários:', erro);
        setMensagemErro('Não foi possível realizar o login.')
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
  <ImageBackground
    source={require('../assets/fundoLogin.jpg')}
    style={estilos.container}
  >
    <View style={estilos.card}>

      <Text style={estilos.titulo}>
        Fake Store ATITUS
      </Text>

      <Text style={[estilos.subtitulo, {marginTop:5}]}>
        Bem-vindo!
      </Text>

      <Text style={[estilos.subtitulo, {marginBottom:15}]}>
        Faça o login para continuar
      </Text>

      <TextInput
        style={estilos.input}
        placeholder='Digite seu usuário'
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize='none'
      />

      <TextInput
        style={estilos.input}
        placeholder='Digite sua senha'
        placeholderTextColor='#888'
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {mensagemErro !== '' && (
        <Text style={estilos.erro}>
          {mensagemErro}
        </Text>
      )}

      <TouchableOpacity
      style={estilos.botao}
      onPress={entrar}
      >
        <Text style={estilos.textoBotao}>
          Entrar
        </Text>
      </TouchableOpacity>

    </View>
  </ImageBackground>
);
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f4f7'
  },

  card: {
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#1b02023a'
  },

  titulo: {
    fontFamily: 'NovaSquare',
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 8,
    color: 'white'
  },

  subtitulo: {
    fontFamily:'NovaSquare',
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
    backgroundColor: '#fafafa'
  },

  erro: {
    color: 'red',
    fontFamily: 'NovaSquare',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center'
  },

  botao: {
  backgroundColor: 'red',
  paddingVertical: 13,
  borderRadius: 8,
  alignItems: 'center',
},

textoBotao: {
  color: 'white',
  fontFamily: 'NovaSquare',
  fontSize: 30,
  fontWeight: 'bold',
},
});