import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/Login';
import ScreenNote from './src/ScreenNote';
import InputNote from './src/InputNote';
import DetailNote from './src/DetailNote';
import Logout from './src/Logout';
import NoteProvider from './src/NoteProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer 
      style={styles.container}
    >
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ 
            headerTitle: '', 
            headerTransparent: true 
      }}>
          <Stack.Screen
            component={Login}
            name="Login"
          />
          <Stack.Screen
            component={ScreenNote}
            name="ScreenNote"
            options = {{
              headerShown: false,
          }}
          />
          <Stack.Screen
            component={InputNote}
            name="InputNote"
          />
          <Stack.Screen
            component={DetailNote}
            name="DetailNote"
          />
          <Stack.Screen
            component={Logout}
            name="Logout"
          />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
