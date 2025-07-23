import React from "react";
import { Animated, Text } from "react-native";
import { finishStyles } from "../styles";

export function MatchCompleteHeader({ scaleAnim }: { scaleAnim: any }) {
  return (
    <Animated.View
      style={[finishStyles.header, { transform: [{ scale: scaleAnim }] }]}
    >
      <Text style={finishStyles.matchCompleteText}>🎯 Match Complete</Text>
    </Animated.View>
  );
}
