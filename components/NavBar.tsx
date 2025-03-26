import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Text, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";
import i18n from "../i18n";

interface NavBarProps {
  onMenuPress?: () => void;
}

const NavBar: React.FC<NavBarProps> = () => {
  const { theme, toggleTheme, colorScheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuItemPress = () => {
    setMenuVisible(false);
  };

  return (
    <View style={[styles.container, { borderBottomColor: theme.text }]}> 
      {/* Burger Menu */}
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.iconButton}>
        <Feather name="menu" size={28} color={theme.text} />
      </TouchableOpacity>
      
      {/* Logo and Phone Number */}
      <View style={styles.logoContainer}>
        <Text style={[styles.phoneNumber, { color: theme.text }]}> (+20)109-038-7398 </Text>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      </View>
      
      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.menu, { backgroundColor: theme.background }]}> 
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
              <Text style={[styles.menuText, { color: theme.text }]}>{i18n.t("about")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
              <Text style={[styles.menuText, { color: theme.text }]}>{i18n.t("contactUs")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { toggleTheme(); setMenuVisible(false); }}>
              <Text style={[styles.menuText, { color: theme.text }]}>{i18n.t("darkMode")}</Text>
              <Ionicons
                name={colorScheme === "light" ? "moon" : "sunny"}
                size={24}
                color={theme.text}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  phoneNumber: {
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  menu: {
    marginTop: 50,
    marginLeft: 16,
    borderRadius: 8,
    paddingVertical: 10,
    width: 150,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 10
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
