import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';
import Signup from './signup';
import ForgetPassword from './ForgetPassword';
import ChangePassword from './ChangePassword';
import Home from './Home';
import CameraApp from './CameraApp';

const Stack = createStackNavigator();

export default function App() {
  return (

     <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
          />
        <Stack.Screen
            name="Signup"
            component={Signup}
          />
        <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
        />
        <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
        />
        <Stack.Screen
            options={{headerShown: true}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="CameraApp"
            component={CameraApp}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
