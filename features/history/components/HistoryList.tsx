import React from 'react';
import { Animated, FlatList, Text, View } from 'react-native';
import { historyStyles } from '../styles';

export function HistoryList({
  filteredMatches, keyExtractor, renderItem,
  handleLoadMore, ListFooterComponent, listAnim
}: any) {
  return (
    <Animated.View
      style={[
        historyStyles.listContainer,
        { opacity: listAnim },
      ]}
    >
      {!filteredMatches.length ? (
        <View style={historyStyles.emptyState}>
          <Text style={historyStyles.emptyStateIcon}>🎱</Text>
          <Text style={historyStyles.emptyStateTitle}>No matches found</Text>
          <Text style={historyStyles.emptyStateText}>
            Try adjusting your search filters or play some matches!
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredMatches}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={historyStyles.listContent}
          ListFooterComponent={ListFooterComponent}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={21}
          initialNumToRender={10}
          getItemLayout={undefined}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
        />
      )}
    </Animated.View>
  );
}
