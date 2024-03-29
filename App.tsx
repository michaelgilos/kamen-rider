import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/features/home/HomeScreen";
import { RideRequestScreen } from "./src/features/ride-request/RideRequestScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RideRequest" component={RideRequestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
