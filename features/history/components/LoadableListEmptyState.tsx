import React from "react";
import { Text, View } from "react-native";
import { historyStyles } from "../styles";

export function LoadableListEmptyState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <View style={historyStyles.emptyState}>
      <Text style={historyStyles.emptyStateIcon}>🎱</Text>
      <Text style={historyStyles.emptyStateTitle}>{title}</Text>
      <Text style={historyStyles.emptyStateText}>{text}</Text>
    </View>
  );
}
