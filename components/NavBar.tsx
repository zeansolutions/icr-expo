import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";

interface NavBarProps {
  onMenuPress?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onMenuPress }) => {
  const { theme, toggleTheme, colorScheme } = useTheme();

  return (
      <View style={[styles.container, { borderBottomColor: theme.text }]}>
        {/* Burger Menu */}
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Feather name="menu" size={28} color={theme.text} />
        </TouchableOpacity>

        {/* Theme Toggle */}
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <Ionicons
            name={colorScheme === "light" ? "moon" : "sunny"}
            size={28}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  iconButton: {
    padding: 8,
  },
});
