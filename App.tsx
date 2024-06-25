// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Home';
import ChatScreen from './Chat';
import EarTestScreen from './EarTest'

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AiChat" component={ChatScreen} />
        <Stack.Screen name="EarTest" component={EarTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
