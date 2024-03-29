import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {HomeScreen} from './src/features/home/HomeScreen';
import {RootStackParamList} from './src/features/navigation/RootStack';
import {RideRequestScreen} from './src/features/ride-request/RideRequestScreen';
import {store} from './src/features/state/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RideDetail" component={RideRequestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
