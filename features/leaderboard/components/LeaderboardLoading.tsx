import React from "react";
import { ActivityIndicator, Animated, Text } from "react-native";
import { leaderboardStyles } from "../styles";

type LeaderboardLoadingProps = {
  fadeAnim: Animated.Value;
};

export function LeaderboardLoading({ fadeAnim }: LeaderboardLoadingProps) {
  return (
    <Animated.View style={[leaderboardStyles.center, { opacity: fadeAnim }]}>
      <ActivityIndicator size="large" color="#667eea" />
      <Text style={leaderboardStyles.loadingText}>Loading rankings...</Text>
    </Animated.View>
  );
}
