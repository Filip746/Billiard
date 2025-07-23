import React from 'react';
import { Text, View } from 'react-native';
import { historyStyles } from '../styles';

export function HistoryEmptyState() {
  return (
    <View style={historyStyles.emptyState}>
      <Text style={historyStyles.emptyStateIcon}>🎱</Text>
      <Text style={historyStyles.emptyStateTitle}>No matches found</Text>
      <Text style={historyStyles.emptyStateText}>
        Try adjusting your search filters or play some matches!
      </Text>
    </View>
  );
}
