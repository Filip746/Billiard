import { usePlayers } from '@/shared/hooks';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { MatchItem } from '../components';
import { useHistory } from './useHistory';
import { useHistoryAnimations } from './useHistoryAnimations';

export function useHistoryScreen() {
  const [searchText, setSearchText] = useState('');
  const [dateText, setDateText] = useState('');
  const { matches, loading, fetchingMore, hasMore, loadMore, loadAllMatches } = useHistory();
  const players = usePlayers();
  const router = useRouter();
  const anim = useHistoryAnimations();

  useEffect(() => {
    if (searchText.trim().length > 0 || dateText.trim().length > 0) {
      loadAllMatches();
    }
  }, [searchText, dateText]);

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

  function renderItem({ item, index }: { item: any; index: number }) {
    return <MatchItem item={item} index={index} players={players} router={router} />;
  }

  function keyExtractor(item: any) {
    return item.id;
  }

  function handleLoadMore() {
    if (hasMore && !fetchingMore && !loading) {
      loadMore();
    }
  }

  return {
    searchText,
    setSearchText,
    dateText,
    setDateText,
    filteredMatches,
    loading,
    fetchingMore,
    renderItem,
    keyExtractor,
    handleLoadMore,
    ...anim
  };
}
