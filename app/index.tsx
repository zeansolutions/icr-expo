import React, { useEffect, useState } from "react";
import "react-native-reanimated";
import { StatusBar } from "react-native";
import SplashScreen from "../components/SplashScreen";

import { Text, View } from "../components/Themed";
import { useTheme } from "../theme/ThemeProvider";
import { Button } from "react-native";

export default function App() {
  const { theme, toggleTheme, colorScheme } = useTheme();
  const [barStyle, setBarStyle] = useState(theme.barstyle)
  useEffect(() => {
    if (colorScheme === "light") {
      setBarStyle("dark-content")
    } else {
      setBarStyle("light-content")
    }
  }, [colorScheme])

  return (
    <>
      <StatusBar backgroundColor={theme.background} barStyle={barStyle} />
      <SplashScreen />
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.background }}>
        <Text style={{ fontSize: 24 }}>Hello, Expo Router!</Text>

        <Button
          title={`Switch to ${
            colorScheme === "light" ? "Dark" : "Light"
          } Theme`}
          color={theme.primary}
          onPress={toggleTheme}
        />
      </View> */}
    </>
  );
}
