import React from 'react';
import 'react-native-reanimated';
import { StatusBar } from 'react-native';
import SplashScreen from './components/SplashScreen';


export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#222222" barStyle="light-content" />
      <SplashScreen />
    </>
  );
}
