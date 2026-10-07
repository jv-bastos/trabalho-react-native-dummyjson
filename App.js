import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import DetalhesProduto from './telas/DetalhesProduto';
import Home from './telas/Home';
import InformacoesGrupo from './telas/InformacoesGrupo';
import Login from './telas/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
  name="Home"
  component={Home}
  options={({ navigation }) => ({
    headerTransparent: true,
    headerTitle: () => (
      <Text style={estilosCabecalho.titulo}>
        Produtos
      </Text>
    ),

    headerLeft: () => (
      <TouchableOpacity
        style={estilosCabecalho.botao}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={estilosCabecalho.textoBotao}>
          Sair
        </Text>
      </TouchableOpacity>
    ),

    headerRight: () => (
      <TouchableOpacity
        style={estilosCabecalho.botao}
        onPress={() => navigation.navigate('InformacoesGrupo')}
      >
        <Text style={estilosCabecalho.textoBotao}>
          Info
        </Text>
      </TouchableOpacity>
    ),
  })}
/>

        <Stack.Screen
          name='DetalhesProduto'
          component={DetalhesProduto}
        />

        <Stack.Screen
          name='InformacoesGrupo'
          component={InformacoesGrupo}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const estilosCabecalho = StyleSheet.create({
  titulo: {
    fontFamily: 'NovaSquare',
    fontSize: 22,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 5,
  },

  botao: {
    height:35,
    minWidth: 70,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000aa',
    shadowColor: 'red',
    shadowOpacity: 1,
    shadowRadius: 450
  },

  textoBotao: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 4
  }
});