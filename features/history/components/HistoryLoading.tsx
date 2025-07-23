import React from 'react';
import { ActivityIndicator, Animated, Text } from 'react-native';
import { historyStyles } from '../styles';

export function HistoryLoading({ fadeAnim }: any) {
  return (
    <Animated.View
      style={[
        historyStyles.loadingContainer,
        { opacity: fadeAnim },
      ]}
    >
      <ActivityIndicator size="large" color="#667eea" />
      <Text style={historyStyles.loadingText}>Loading match history...</Text>
    </Animated.View>
  );
}
