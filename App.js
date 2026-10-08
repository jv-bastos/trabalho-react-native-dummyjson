import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DetalhesProduto from './telas/DetalhesProduto';
import Home from './telas/Home';
import InformacoesGrupo from './telas/InformacoesGrupo';
import Login from './telas/Login';

const Stack = createNativeStackNavigator();

function CabecalhoIOS({
  navigation,
  titulo,
  voltarLogin = false,
  mostrarInformacoes = false
}) {
  return (
    <View style={estilosCabecalhoIOS.container}>
      <TouchableOpacity
        style={estilosCabecalhoIOS.botao}
        onPress={() =>
          voltarLogin ? navigation.replace('Login') : navigation.goBack()
        }
      >        
        <Text style={estilosCabecalho.textoBotaoIOS}>
          ⭠
        </Text>
      </TouchableOpacity>

      <Text style={estilosCabecalhoIOS.titulo}>
        {titulo}
      </Text>

      {mostrarInformacoes && (
        <TouchableOpacity
          style={estilosCabecalhoIOS.botao}
          onPress={() => navigation.navigate('InformacoesGrupo')}
        >
          <Text style={estilosCabecalho.textoBotaoIOS}>
            ⓘ
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Home'
          component={Home}
          options={({ navigation }) =>
            Platform.OS === 'ios'
              ? {
                  header: () => (
                    <CabecalhoIOS
                      navigation={navigation}
                      titulo='Produtos'
                      voltarLogin={true}
                      mostrarInformacoes={true}
                    />
                  )
                }
              : {
                  headerTransparent: true,
                  headerTitleAlign: 'center',
                  
                  headerTitle: () => (
                    <Text style={estilosCabecalho.tituloAndroid}>
                      Produtos
                    </Text>
                  ),

                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => navigation.replace('Login')}
                    >
                      <Text style={estilosCabecalho.textoBotaoAndroid}>
                        ←
                      </Text>
                    </TouchableOpacity>
                  ),

                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('InformacoesGrupo')}
                    >
                      <Text style={estilosCabecalho.textoInformacoesAndroid}>
                        ⓘ
                      </Text>
                    </TouchableOpacity>
                  )
                }
          }
        />

        <Stack.Screen
          name='DetalhesProduto'
          component={DetalhesProduto}
          options={({ navigation }) =>
            Platform.OS === 'ios'
              ? {
                  header: () => (
                    <CabecalhoIOS
                      navigation={navigation}
                      titulo='Detalhes'
                    />
                  )
                }
              : {
                  headerTransparent: true,
                  headerTitleAlign: 'center',

                  headerTitle: () => (
                    <Text style={estilosCabecalho.tituloAndroid}>
                      Detalhes
                    </Text>
                  ),

                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={estilosCabecalho.textoBotaoAndroid}>
                        ←
                      </Text>
                    </TouchableOpacity>
                  )
                }
          }
        />

        <Stack.Screen
          name='InformacoesGrupo'
          component={InformacoesGrupo}
          options={({ navigation }) =>
            Platform.OS === 'ios'
              ? {
                  header: () => (
                    <CabecalhoIOS
                      navigation={navigation}
                      titulo='Informações'
                    />
                  )
                }
              : {
                  headerTransparent: true,
                  headerTitleAlign: 'center',

                  headerTitle: () => (
                    <Text style={estilosCabecalho.tituloAndroid}>
                      Informações do grupo
                    </Text>
                  ),

                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={estilosCabecalho.textoBotaoAndroid}>
                        ←
                      </Text>
                    </TouchableOpacity>
                  )
                }
          }
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const estilosCabecalho = StyleSheet.create({
  textoBotaoIOS: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 4
  },

  tituloAndroid: {
    fontFamily: 'NovaSquare',
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 5
  },

  textoBotaoAndroid: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 4,
    paddingBottom: 20
  },

  textoInformacoesAndroid: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 4,
    paddingHorizontal: 10,
    marginRight: 5
  },
});

const estilosCabecalhoIOS = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingTop: 45,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10
  },

  botao: {
  width: 55,
  height: 55,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 25,
  backgroundColor: '#00000023',
  borderWidth: 1,
  borderColor: '#ffffff55',
  zIndex: 2
},

  titulo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 62,
    textAlign: 'center',
    fontFamily: 'NovaSquare',
    fontSize: 22,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 5
  }
});