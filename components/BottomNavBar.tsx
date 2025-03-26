import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";
import i18n from "../i18n";

interface BottomNavBarProps {
  onTabPress?: (tab: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onTabPress }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("home");

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabPress && onTabPress(tab);
  };

  return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.background, borderColor: theme.text },
        ]}
      >
        <TabButton
          icon="home"
          label={i18n.t("home")}
          active={activeTab === "home"}
          onPress={() => handleTabPress("home")}
        />
        <TabButton
          icon="person"
          label={i18n.t("profile")}
          active={activeTab === "profile"}
          onPress={() => handleTabPress("profile")}
        />
      </View>
  );
};

const TabButton = ({
  icon,
  label,
  active,
  onPress,
}: {
  icon: any;
  label: string;
  active: boolean;
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Ionicons
        name={icon}
        size={26}
        color={active ? theme.activeIconColor : theme.iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
  },
  tabButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavBar;
