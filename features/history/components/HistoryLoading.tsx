import React from "react";
import { ActivityIndicator, Animated, Text } from "react-native";
import { historyStyles } from "../styles";
import { LoadableListWrapper } from "./LoadableListWrapper";

interface HistoryLoadingProps {
  fadeAnim: Animated.Value;
  loadingText?: string;
}

export function HistoryLoading({
  fadeAnim,
  loadingText = "Loading match history...",
}: HistoryLoadingProps) {
  return (
    <LoadableListWrapper opacityAnimation={fadeAnim}>
      <ActivityIndicator size="large" color="#667eea" />
      <Text style={historyStyles.loadingText}>{loadingText}</Text>
    </LoadableListWrapper>
  );
}
