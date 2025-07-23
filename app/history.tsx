import {
  HistoryHeader,
  HistoryList,
  HistoryLoading,
  HistorySearch,
  MatchItem,
} from '@/features/history/components';
import { useHistory, useHistoryAnimations } from '@/features/history/hooks';
import { historyStyles } from '@/features/history/styles';
import { usePlayers } from '@/shared/hooks';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function History() {
  const [searchText, setSearchText] = useState('');
  const [dateText, setDateText] = useState('');
  const { matches, loading, fetchingMore, hasMore, loadMore } = useHistory();
  const players = usePlayers();
  const router = useRouter();

  const {
    fadeAnim,
    slideAnim,
    scaleAnim,
    headerAnim,
    listAnim,
  } = useHistoryAnimations();

  const filteredMatches = matches.filter(item => {
    const player1 = players.find(p => p.id === Number(item.player1Id));
    const player2 = players.find(p => p.id === Number(item.player2Id));
    const playerNames = [player1?.name || '', player2?.name || ''].join(' ').toLowerCase();
    const dateStr =
      typeof item.createdAt === 'object' && item.createdAt.seconds
        ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
        : item.createdAt || item.date || '';
    const nameMatch =
      !searchText.trim().length ||
      playerNames.includes(searchText.trim().toLowerCase());
    const dateMatch =
      !dateText.trim().length ||
      dateStr.includes(dateText.trim());
    return nameMatch && dateMatch;
  });

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <MatchItem item={item} index={index} players={players} router={router} />
    ),
    [players, router]
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !fetchingMore && !loading) {
      loadMore();
    }
  }, [hasMore, fetchingMore, loading, loadMore]);

  const ListFooterComponent = useCallback(() => {
    if (!fetchingMore) return null;
    return (
      <View style={historyStyles.footerLoader}>
        <ActivityIndicator size="small" color="#667eea" />
        <Text style={historyStyles.footerLoaderText}>Loading more matches...</Text>
      </View>
    );
  }, [fetchingMore]);

  return (
    <View style={historyStyles.container}>
      <HistoryHeader fadeAnim={fadeAnim} headerAnim={headerAnim} loading={loading} matchCount={filteredMatches.length} />
      <HistorySearch
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
        scaleAnim={scaleAnim}
        searchText={searchText}
        setSearchText={setSearchText}
        dateText={dateText}
        setDateText={setDateText}
      />
      {loading && !matches.length ? (
        <HistoryLoading fadeAnim={fadeAnim} />
      ) : (
        <HistoryList
          filteredMatches={filteredMatches}
          players={players}
          router={router}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          handleLoadMore={handleLoadMore}
          ListFooterComponent={ListFooterComponent}
          listAnim={listAnim}
        />
      )}
    </View>
  );
}
