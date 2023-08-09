import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/pages/home-page';
import CameraPage from './src/pages/camera-page';
import PlacePage from './src/pages/place-page';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={({route})=> ({
          headerShown: false
        })} name="homepage" component={HomePage}/>
        <Stack.Screen options={({route})=> ({
          headerShown: false
        })} name="camera" component={CameraPage}/>
      <Stack.Screen options={({route})=> ({
          headerShown: false
        })} name="place" component={PlacePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

