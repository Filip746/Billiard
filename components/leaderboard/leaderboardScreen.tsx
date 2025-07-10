import { players } from '@/const/players';
import { getLastMatchesForUser } from '@/lib/matchesCollection';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { leaderboardModalStyles, leaderboardStyles } from './leaderboardStyles';
import { useLeaderboard } from './useLeaderboard';

type LeaderboardEntry = {
  id: string;
  name: string;
  points: number;
  avatar: any;
};

export default function LeaderboardScreen() {
  const { leaderboard, loading } = useLeaderboard();
  const [selectedPlayer, setSelectedPlayer] = useState<LeaderboardEntry | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);

  const handleNamePress = async (player: LeaderboardEntry) => {
    setSelectedPlayer(player);
    setModalVisible(true);
    const matches = await getLastMatchesForUser(player.id, 5);
    setRecentMatches(matches);
  };

  const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const rank = index + 1;
    const podiumStyle =
      rank === 1
        ? leaderboardStyles.firstPlace
        : rank === 2
        ? leaderboardStyles.secondPlace
        : rank === 3
        ? leaderboardStyles.thirdPlace
        : {};

    return (
      <View style={[leaderboardStyles.itemContainer, podiumStyle]}>
        <Text style={leaderboardStyles.rank}>{rank}</Text>
        {item.avatar ? (
          <Image source={item.avatar} style={leaderboardStyles.avatar} />
        ) : (
          <View style={leaderboardStyles.avatarPlaceholder} />
        )}
        <Text style={leaderboardStyles.name} onPress={() => handleNamePress(item)}>
          {item.name}
        </Text>
        <Text style={leaderboardStyles.points}>{(item.points * 100).toFixed(2)}%</Text>
      </View>
    );
  };

  return (
    <View style={leaderboardStyles.container}>
      <Text style={leaderboardStyles.title}>Leaderboard</Text>
      {loading ? (
        <View style={leaderboardStyles.center}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={leaderboard}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={leaderboardModalStyles.overlay}>
          <View style={leaderboardModalStyles.container}>
            <TouchableOpacity style={leaderboardModalStyles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={leaderboardModalStyles.closeText}>×</Text>
            </TouchableOpacity>
            {selectedPlayer && selectedPlayer.avatar ? (
              <Image source={selectedPlayer.avatar} style={leaderboardModalStyles.avatar} />
            ) : (
              <View style={leaderboardModalStyles.profileCircle} />
            )}
            <Text style={leaderboardModalStyles.playerName}>{selectedPlayer?.name}</Text>
            <View style={leaderboardModalStyles.tabRow}>
              <Text style={leaderboardModalStyles.tabActive}>Stats</Text>
              <Text style={leaderboardModalStyles.tabInactive}>About</Text>
            </View>
            <View style={leaderboardModalStyles.matchesList}>
              {recentMatches.length === 0 && (
                <Text style={leaderboardModalStyles.noMatchesText}>No recent matches.</Text>
              )}
              {recentMatches.map((match, idx) => {
                const opponent = players.find(p => p.id === Number(match.opponentId));
                const [score1, score2] = match.result.split(' : ').map(Number);
                const win = score1 > score2;
                return (
                  <View key={idx} style={leaderboardModalStyles.matchRow}>
                    <Text style={leaderboardModalStyles.matchOpponent}>
                      v {opponent?.name || 'Unknown'}
                    </Text>
                    <Text style={{ width: 60, textAlign: 'center', color: win ? '#28a745' : '#d32f2f', fontWeight: win ? 'bold' : '600' }}>
                       {match.result}
                     </Text>
                    <Text style={leaderboardModalStyles.matchDate}>
                      {match.date}
                    </Text>
                    <View
                      style={[
                        leaderboardModalStyles.winLoseBox,
                        win ? leaderboardModalStyles.win : leaderboardModalStyles.lose,
                      ]}
                    >
                      <Text style={leaderboardModalStyles.winLoseText}>
                        {win ? 'W' : 'L'}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
