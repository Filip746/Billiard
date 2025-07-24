import React from "react";
import { Animated, Text } from "react-native";
import { finishStyles } from "../styles";

type Props = {
  scaleAnim: Animated.Value;
};

export function MatchCompleteHeader({ scaleAnim }: Props) {
  return (
    <Animated.View
      style={[finishStyles.header, { transform: [{ scale: scaleAnim }] }]}
    >
      <Text style={finishStyles.matchCompleteText}>🎯 Match Complete</Text>
    </Animated.View>
  );
}
