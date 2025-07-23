import React from "react";
import { Animated, Text } from "react-native";
import { leaderboardStyles } from "../styles";

type LeaderboardHeaderProps = {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  scaleAnim: Animated.Value;
};

export function LeaderboardHeader({
  fadeAnim,
  slideAnim,
  scaleAnim,
}: LeaderboardHeaderProps) {
  return (
    <Animated.View
      style={[
        leaderboardStyles.header,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <Text style={leaderboardStyles.title}>🏆 Leaderboard</Text>
      <Text style={leaderboardStyles.subtitle}>Top Players Rankings</Text>
    </Animated.View>
  );
}
