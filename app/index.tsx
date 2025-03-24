import React, { useEffect, useState, useCallback } from "react";
import "react-native-reanimated";
import { StatusBar } from "react-native";
import * as SplashScreenAPI from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { SafeAreaView } from "react-native-safe-area-context";

import SplashScreen from "../components/SplashScreen";
import Home from "./screens/Home";

import { useTheme } from "../theme/ThemeProvider";

// Prevent native splash screen from auto-hiding
SplashScreenAPI.preventAutoHideAsync();

export default function App() {
  const { theme, colorScheme } = useTheme();
  const [barStyle, setBarStyle] = useState(theme.barstyle);
  const [appIsReady, setAppIsReady] = useState(false);

  // Wait function for delay
  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Preload assets + delay
  const loadResourcesAsync = async () => {
    try {
      const fonts = Font.loadAsync({
        Roboto: require("../assets/fonts/SpaceMono-Regular.ttf"),
      });

      const images = [
        require("../assets/images/logo.png"),
      ];
      const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());

      // Minimum delay (1 second)
      await Promise.all([
        fonts,
        ...cacheImages,
        wait(5000)
      ]);

    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  };

  // Load assets on mount
  useEffect(() => {
    console.log("load splash screen")
    loadResourcesAsync();
  }, []);

  // Hide splash screen after layout + resources loaded
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("App is ready, hiding splash screen..."); // Debug here!
      await SplashScreenAPI.hideAsync();
    }
  }, [appIsReady]);

  // Update bar style on theme change
  useEffect(() => {
    if (colorScheme === "light") {
      setBarStyle("dark-content");
    } else {
      setBarStyle("light-content");
    }
  }, [colorScheme]);

  if (!appIsReady) {
    return (
      <>
        <StatusBar backgroundColor={theme.background} barStyle={barStyle} />
        <SplashScreen />
      </>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={theme.background} barStyle={barStyle} />
      <SafeAreaView style={{ flex: 1 }}>
        <Home onLayout={onLayoutRootView} />
      </SafeAreaView>   
    </>
  );
}