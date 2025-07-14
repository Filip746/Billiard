import { usePlayers } from '@/lib/usePlayers';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { historyStyles } from './historyStyles';
import { useHistory } from './useHistory';

export function historyScreen() {
  const { matches, loading, fetchingMore, hasMore, loadMore } = useHistory();
  const players = usePlayers();
  const renderItem = ({ item }: { item: any }) => {
    const player1 = players.find(p => p.id === Number(item.player1Id));
    const player2 = players.find(p => p.id === Number(item.player2Id));
    let dateStr = '';
    if (typeof item.createdAt === 'object' && item.createdAt.seconds) {
      dateStr = new Date(item.createdAt.seconds * 1000).toLocaleDateString();
    } else {
      dateStr = item.createdAt || item.date;
    }
    const router = useRouter();
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
               elapsedTime: item.timeUsedMs || item.elapsedTime || '',
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
      <Text style={historyStyles.title}>Match History</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={matches}
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
