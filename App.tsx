import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/pages/home-page';
import CameraPage from './src/pages/camera-page';
import PlacePage from './src/pages/place-page';
import LoginPage from './src/pages/login-page';
import ChatPage from './src/pages/chat-page';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={({route})=> ({
          headerShown: false
        })} name="login" component={LoginPage}/>
        <Stack.Screen options={({route})=> ({
          headerShown: false
        })} name="homepage" component={HomePage}/>
        <Stack.Screen options={({route})=> ({
          headerShown: false
        })} name="camera" component={CameraPage}/>
      <Stack.Screen options={({route})=> ({
          headerShown: false
        })} name="place" component={PlacePage}/>
         <Stack.Screen options={({route})=> ({
          headerShown: true
        })} name="chat" component={ChatPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

