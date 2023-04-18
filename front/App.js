import React from 'react';

import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import Signup from './src/components/SignUp';
import ForgetPassword from './src/components/ForgetPassword';
import ChangePassword from './src/components/ChangePassword';
import Home from './src/components/Home';
import CameraApp from './src/components/CameraApp';
import Publication from './src/components/Publication'
import ChatScreen from './src/components/Chat'
import Privacy from './src/components/Privacy'
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
            <Stack.Screen
              name="Publication"
              component={Publication}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
            />
            <Stack.Screen
              name="Privacy"
              component={Privacy}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
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
