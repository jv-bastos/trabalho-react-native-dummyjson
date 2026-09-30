import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
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
          name='Home'
          component={Home}
          options={({navigation}) => ({
            title: 'Produtos',

            headerLeft: () => (
              <Button
                title='Sair'
                onPress={() => navigation.replace('Login')}
              />),
            headerRight: () => (
              <Button
                title='Info'
                onPress={() => navigation.navigate('InformacoesGrupo')}
              />),
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