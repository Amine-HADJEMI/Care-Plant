import React from 'react';
// import { Provider } from 'react-redux';
// import store from './src/store/store';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/components/Login';
import Signup from './src/components/SignUp';
import ForgetPassword from './src/components/ForgetPassword';
import ChangePassword from './src/components/ChangePassword';
import Home from './src/components/Home';
import CameraApp from './src/components/CameraApp';
import TestPublication from './src/components/TestPublication'
import TestHome from './src/components/TestHome'
import Profile from './src/components/Profile'
import ChatScreen from './src/components/Chat'
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      {/* // <SafeAreaProvider> */}
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
              name="TestPublication"
              component={TestPublication}
            />
            <Stack.Screen
              name="TestHome"
              component={TestHome}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      {/* // </SafeAreaProvider> */}
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
