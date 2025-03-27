import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  LayoutChangeEvent,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import NavBar from "../../components/NavBar";
import BottomNavBar from "../../components/BottomNavBar";
import i18n from "../../i18n";
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface HomeProps {
  onLayout?: (event: LayoutChangeEvent) => void;
}

const { width, height } = Dimensions.get("window");
const videoHeight = (width / 16) * 9;

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

      <Animated.View
        style={[
          styles.nextSlide,
          { opacity: scrollTextOpacity },
        ]}
      >
        <Text style={[styles.nextSlideText, {color: theme.text}]}>{i18n.t("moreText")}</Text>  
        
        <LinearGradient
          colors={theme.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.goldenLine}
        />
        
        <YoutubePlayer
          width={width * 0.9}
          height={videoHeight}
          play={false}
          videoId={'F9OlOASUYwg'} // Replace with your desired YouTube video ID
        />

        <LinearGradient
          colors={theme.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.goldenLine}
        />

        <View style={styles.videoText}>
          <Text style={[styles.nextSlideText, {color: theme.text}]}>{i18n.t("extraText")}</Text>  
        </View>
      </Animated.View>

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
  nextSlide: {
    position: "absolute",
    top: height * 0.1, // Adjust this to position it better
    width: "100%",
    alignItems: "center", // Centers horizontally
    justifyContent: "center", // Centers vertically
    pointerEvents: "none", // Allows touches to pass through to the ScrollView

  },
  nextSlideText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center'
  },
  goldenLine: {
    width: '90%',
    height: 5,
    marginVertical: 20
  },
  videoText: {
    width: '90%',
  }
});

export default Home;
