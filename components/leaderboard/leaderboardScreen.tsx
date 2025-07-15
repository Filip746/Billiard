import { usePlayerModal } from '@/hooks/usePlayerModal';
import { usePlayers } from '@/lib/usePlayers';
import { LeaderboardPlayerModal } from '@/modules/billiard/utils/leaderboardPlayerModal';
import { MatchSearchBar } from '@/modules/billiard/utils/matchSearchBar';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { leaderboardStyles } from './leaderboardStyles';
import { useLeaderboard } from './useLeaderboard';

export default function LeaderboardScreen() {
  const { leaderboard, loading } = useLeaderboard();
  const [isModalVisible, setModalVisible] = useState(false);
  const players = usePlayers();
  const [searchText, setSearchText] = useState('');

  const {
    selectedPlayer,
    recentMatches,
    allMatches,
    activeTab,
    setActiveTab,
    showAllMatchesModal,
    setShowAllMatchesModal,
    handlePlayerPress,
    handleShowAllMatches,
  } = usePlayerModal(players);
  
  const handleNamePress = async (entry: LeaderboardEntry) => {
    const player = players.find(
      p => p.id === Number(entry.id) || p.name === entry.name
    );
    if (player) await handlePlayerPress(player);
    setModalVisible(true);
  };
  
  const filteredLeaderboard = leaderboard.filter(player =>
    player.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const rank = index + 1;
    const podiumStyle =
      rank === 1 ? leaderboardStyles.firstPlace
      : rank === 2 ? leaderboardStyles.secondPlace
      : rank === 3 ? leaderboardStyles.thirdPlace
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
      <MatchSearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        showDateInput={false}
      />
      {loading ? (
        <View style={leaderboardStyles.center}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={filteredLeaderboard}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <LeaderboardPlayerModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        selectedPlayer={selectedPlayer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recentMatches={recentMatches}
        allMatches={allMatches}
        showAllMatchesModal={showAllMatchesModal}
        setShowAllMatchesModal={setShowAllMatchesModal}
        onShowAllMatches={handleShowAllMatches}
      />
    </View>
  );
}
