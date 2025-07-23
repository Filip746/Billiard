import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { historyStyles } from "../styles";
import { HistoryFooter } from "./HistoryFooter";
import { LoadableListEmptyState } from "./LoadableListEmptyState";
import { LoadableListWrapper } from "./LoadableListWrapper";

export function HistoryList({
  filteredMatches,
  keyExtractor,
  renderItem,
  handleLoadMore,
  listAnim,
  fetchingMore,
  searching,
  emptyStateTitle = "No matches found",
  emptyStateText = "Try adjusting your search filters or play some matches!",
}: any) {
  if (!filteredMatches.length) {
    return (
      <LoadableListWrapper opacityAnimation={listAnim}>
        {searching && (
          <ActivityIndicator
            size="small"
            color="#667eea"
            style={{ margin: 16, alignSelf: "center" }}
          />
        )}
        <LoadableListEmptyState title={emptyStateTitle} text={emptyStateText} />
      </LoadableListWrapper>
    );
  }

  return (
    <LoadableListWrapper opacityAnimation={listAnim}>
      {searching && (
        <ActivityIndicator
          size="small"
          color="#667eea"
          style={{ margin: 16, alignSelf: "center" }}
        />
      )}
      <FlatList
        data={filteredMatches}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={historyStyles.listContent}
        ListFooterComponent={() => (
          <HistoryFooter fetchingMore={fetchingMore} />
        )}
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
    </LoadableListWrapper>
  );
}
