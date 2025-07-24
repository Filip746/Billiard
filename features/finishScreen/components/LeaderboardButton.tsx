import React from "react";
import { Animated, Text, TouchableOpacity } from "react-native";
import { finishStyles } from "../styles";

type Props = {
  scaleAnim: Animated.Value;
  onPress: () => void;
};

export function LeaderboardButton({ scaleAnim, onPress }: Props) {
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={finishStyles.leaderboardBtn}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={finishStyles.leaderboardBtnText}>🏅 View Leaderboard</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
