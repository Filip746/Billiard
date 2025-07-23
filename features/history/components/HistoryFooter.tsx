import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { historyStyles } from '../styles';

export function HistoryFooter({ fetchingMore }: { fetchingMore: boolean }) {
  if (!fetchingMore) return null;
  return (
    <View style={historyStyles.footerLoader}>
      <ActivityIndicator size="small" color="#667eea" />
      <Text style={historyStyles.footerLoaderText}>Loading more matches...</Text>
    </View>
  );
}