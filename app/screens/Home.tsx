import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  LayoutChangeEvent,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import NavBar from "../../components/NavBar";
import BottomNavBar from "../../components/BottomNavBar";
import i18n from "../../i18n";
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

interface HomeProps {
  onLayout?: (event: LayoutChangeEvent) => void;
}

const { width, height } = Dimensions.get("window");

const Home: React.FC<HomeProps> = ({ onLayout }) => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const listenerId = scrollY.addListener(() => {
      // Listener logic here
    });
    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const logoScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.7],
    extrapolate: "clamp",
  });

  const logoOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const textTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const buttonOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const buttonTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  const scrollTextOpacity = scrollY.interpolate({
    inputRange: [80, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
      onLayout={onLayout}
    >
      <NavBar onMenuPress={() => console.log("Burger menu pressed! 🚀")} />

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Animated.Image
            source={require("../../assets/images/logo.png")}
            style={[
              styles.logo,
              { transform: [{ scale: logoScale }], opacity: logoOpacity },
            ]}
          />
          <Animated.Text
            style={[
              styles.logoText,
              {
                transform: [{ translateY: textTranslateY }],
                opacity: textOpacity,
                color: theme.text,
              },
            ]}
          >
            {i18n.t("welcome")}
          </Animated.Text>

          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonOpacity,
                transform: [{ translateY: buttonTranslateY }],
              },
            ]}
          >
            <LinearGradient
              colors={theme.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <TouchableOpacity onPress={() => console.log("اشترك")}>
                <Text style={[styles.buttonText, { color: theme.text }]}>
                  {i18n.t("register")}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
          <Animated.View
            style={[
              styles.animationContainer,
              { transform: [{ scale: logoScale }], opacity: logoOpacity },
            ]}
          >
            <LottieView
              source={require('../../assets/images/animations/up.json')}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
          </Animated.View>
        </View>
        <View style={styles.spacer} />
      </Animated.ScrollView>

      <Animated.Text
        style={[
          styles.scrollText,
          { opacity: scrollTextOpacity, color: theme.text },
        ]}
      >
        {i18n.t("moreText")}
      </Animated.Text>

      {/* <BottomNavBar onTabPress={(tab) => console.log("Selected Tab:", tab)} /> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: "contain",
  },
  animationContainer: {
    width: width * 0.9,
    height: height * 0.2,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  lottieAnimation: {
    width: 50,
    height: '100%',
  },
  logoText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  spacer: {
    height: 1000,
  },
  scrollText: {
    position: "absolute",
    top: height * 0.1,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
