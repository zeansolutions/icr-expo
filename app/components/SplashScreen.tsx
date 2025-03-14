import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  Easing,
} from 'react-native-reanimated';

// Create an Animated version of the SvgText element
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);

const SplashScreen: React.FC = () => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    const forwardAnimation = withTiming(1, {
      duration: 3000,
      easing: Easing.linear,
    });

    const reverseAnimation = withTiming(0, {
      duration: 2000,
      easing: Easing.linear,
    });

    const sequenceAnimation = withSequence(
      forwardAnimation,
      withDelay(1000, reverseAnimation)
    );

    animationProgress.value = withRepeat(sequenceAnimation, -1, false);
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const progress = animationProgress.value;

    const dashOffset = interpolate(progress, [0, 0.5, 1], [100, 50, -100]);
    const dashArray = interpolate(progress, [0, 0.5, 1], [0, 0, 100]);
    const strokeWidth = interpolate(progress, [0, 0.8, 1], [3, 3, 0]);
    const strokeOpacity = interpolate(progress, [0, 0.8, 1], [1, 1, 0]);
    const fillOpacity = interpolate(progress, [0, 0.8, 1], [0, 0, 1]);

    return {
      strokeDashoffset: dashOffset,
      strokeDasharray: `${dashArray} ${100}`,
      strokeWidth,
      strokeOpacity,
      fillOpacity,
    };
  });

  return (
    <View style={styles.container}>
      <Svg height="160" width="400" viewBox="0 0 400 160">
        <Defs>
          {/* Linear Gradient for Gold Effect */}
          <LinearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FFD700" />
            <Stop offset="50%" stopColor="#FFA500" />
            <Stop offset="100%" stopColor="#FFC300" />
          </LinearGradient>
        </Defs>

        <AnimatedSvgText
          x="50%"
          y="50%"
          dy={10}
          textAnchor="middle"
          fontSize="60"
          stroke="url(#goldGradient)"
          fill="url(#goldGradient)"
          animatedProps={animatedProps}
        >
          eXpo
        </AnimatedSvgText>
      </Svg>

      {/* I Can Read Text at the bottom */}
      <Text style={styles.bottomText}>I Can Read</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    position: 'absolute',
    bottom: 40, // Distance from bottom, adjust as needed
    fontSize: 15,
    color: 'darkgray',
    textAlign: 'center',
    letterSpacing: 5
  },
});
