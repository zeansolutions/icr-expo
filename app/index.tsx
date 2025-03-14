import React from 'react';
import 'react-native-reanimated';
import { StatusBar } from 'react-native';
import SplashScreen from './components/SplashScreen';


export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <SplashScreen />
    </>
  );
}
