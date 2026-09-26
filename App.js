import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetalhesProduto from './telas/DetalhesProduto';
import Home from './telas/Home';
import Login from './telas/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name='DetalhesProduto'
          component={DetalhesProduto}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}