import { usePlayers } from '@/lib/usePlayers';
import { MatchSearchBar } from '@/modules/billiard/utils/matchSearchBar';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { historyStyles } from './historyStyles';
import { useHistory } from './useHistory';

export function historyScreen() {
  const [searchText, setSearchText] = useState('');
  const [dateText, setDateText] = useState('');
  const { matches, loading, fetchingMore, hasMore, loadMore, loadAllMatches  } = useHistory();
  const players = usePlayers();
  const router = useRouter();

  useEffect(() => {
    if ((searchText.trim().length > 0 || dateText.trim().length > 0) && hasMore) {
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
      searchText.trim().length === 0 ||
      playerNames.includes(searchText.trim().toLowerCase());
    const dateMatch =
      dateText.trim().length === 0 ||
      dateStr.includes(dateText.trim());
    return nameMatch && dateMatch;
  });

  const renderItem = ({ item }: { item: any }) => {
    const player1 = players.find(p => p.id === Number(item.player1Id));
    const player2 = players.find(p => p.id === Number(item.player2Id));
    let dateStr = '';
    if (typeof item.createdAt === 'object' && item.createdAt.seconds) {
      dateStr = new Date(item.createdAt.seconds * 1000).toLocaleDateString();
    } else {
      dateStr = item.createdAt || item.date;
    }
    return (
      <TouchableOpacity
        style={historyStyles.matchRow}
        onPress={() => {
          router.push({
            pathname: '/finish',
            params: {
              player1Id: item.player1Id,
              player2Id: item.player2Id,
              scorePlayer1: item.scorePlayer1,
              scorePlayer2: item.scorePlayer2,
              elapsedTime: item.elapsedTime ?? item.timeUsedMs ?? '',
            },
          });
        }}
      >
        <Text style={historyStyles.matchPlayers}>
          {player1?.name || 'Player 1'} vs {player2?.name || 'Player 2'}
        </Text>
        <Text style={historyStyles.matchResult}>
          {item.scorePlayer1} : {item.scorePlayer2}
        </Text>
        <Text style={historyStyles.matchDate}>{dateStr}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={historyStyles.container}>
      <MatchSearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        dateText={dateText}
        setDateText={setDateText}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredMatches}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReached={hasMore ? loadMore : undefined}
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            fetchingMore ? <ActivityIndicator size="small" color="#1976d2" /> : null
          }
        />
      )}
    </View>
  );
}
