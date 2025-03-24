import React from "react";
import { View, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import NavBar from "../../components/NavBar"; // Adjust path as needed

interface HomeProps {
  onLayout?: (event: LayoutChangeEvent) => void;
}

const Home: React.FC<HomeProps> = ({ onLayout }) => {
  const { theme } = useTheme();

  const handleMenuPress = () => {
    console.log("Burger menu pressed! 🚀");
    // You can open a drawer or do something else here
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]} onLayout={onLayout}>
      {/* NavBar */}
      <NavBar onMenuPress={handleMenuPress} />

      {/* Body */}
      <View style={styles.content}>
        <Text style={[styles.text, { color: theme.text }]}>Welcome to Home Screen!</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
