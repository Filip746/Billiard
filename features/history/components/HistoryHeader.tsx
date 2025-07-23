import React from 'react';
import { Animated, Text } from 'react-native';
import { historyStyles } from '../styles';

export function HistoryHeader({ fadeAnim, headerAnim, loading, matchCount }: any) {
  return (
    <Animated.View
      style={[
        historyStyles.header,
        {
          opacity: fadeAnim,
          transform: [{ translateY: headerAnim }],
        },
      ]}
    >
      <Text style={historyStyles.title}>📊 Match History</Text>
      <Text style={historyStyles.subtitle}>
        {loading ? 'Loading...' : `${matchCount} matches found`}
      </Text>
    </Animated.View>
  );
}
