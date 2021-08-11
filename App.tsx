import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import CharacterDetailsCard from './components/CharacterDetailsCard';
import { Provider } from 'react-redux';
import { configureStore } from './store'

const Stack = createStackNavigator();
const store = configureStore();

export default () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Character Details" component={CharacterDetailsCard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);