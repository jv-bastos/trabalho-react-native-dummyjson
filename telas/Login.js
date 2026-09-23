import { useState } from 'react';
import { Button, Keyboard, Text, TextInput, View } from 'react-native';
import { api } from '../servicos/api';

export default function Login({navigation}) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

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
  return (
    <View>
      <Text>Login</Text>

      <Text>Usuário</Text>
      <TextInput
        placeholder="Digite seu usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {mensagemErro !== '' && (
        <Text>{mensagemErro}</Text>
      )}

      <Button title='Entrar' onPress={entrar}/>
    </View>
  );
}