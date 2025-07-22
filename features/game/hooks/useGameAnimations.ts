import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function useGameAnimations(shouldShowFinish: boolean) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideLeftAnim = useRef(new Animated.Value(-100)).current;
  const slideRightAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerPulseAnim = useRef(new Animated.Value(1)).current;
  const finishButtonAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideLeftAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.bounce),
        useNativeDriver: true,
      }),
      Animated.timing(slideRightAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.bounce),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(timerPulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(timerPulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    
  }, []);

  useEffect(() => {
    if (shouldShowFinish) {
      Animated.spring(finishButtonAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      finishButtonAnim.setValue(0);
    }
  }, [shouldShowFinish]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return {
    fadeAnim,
    slideLeftAnim,
    slideRightAnim,
    scaleAnim,
    pulseAnim,
    timerPulseAnim,
    finishButtonAnim,
    spin, 
  };
}
