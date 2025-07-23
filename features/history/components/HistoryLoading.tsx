import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { historyStyles } from "../styles";
import { LoadableListWrapper } from "./LoadableListWrapper";

export function HistoryLoading({
  fadeAnim,
  loadingText = "Loading match history...",
}: any) {
  return (
    <LoadableListWrapper opacityAnimation={fadeAnim}>
      <ActivityIndicator size="large" color="#667eea" />
      <Text style={historyStyles.loadingText}>{loadingText}</Text>
    </LoadableListWrapper>
  );
}
