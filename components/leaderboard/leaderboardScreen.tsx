 import { players } from '@/const/players';
import { getAllMatchesForUser, getLastMatchesForUser } from '@/lib/matchesCollection';
import { LeaderboardPlayerModal } from '@/modules/billiard/utils/leaderboardPlayerModal';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { leaderboardStyles } from './leaderboardStyles';
import { useLeaderboard } from './useLeaderboard';

  type LeaderboardEntry = {
    id: string;
    name: string;
    points: number;
    avatar: any;
  };

  export default function LeaderboardScreen() {
    const { leaderboard, loading } = useLeaderboard();
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [recentMatches, setRecentMatches] = useState<any[]>([]);
   const [activeTab, setActiveTab] = useState<'stats' | 'about'>('stats');
   const [allMatches, setAllMatches] = useState<any[]>([]);
   const [showAllMatchesModal, setShowAllMatchesModal] = useState(false);

    const handleNamePress = async (entry: LeaderboardEntry) => {
      const player = players.find(p => p.id === Number(entry.id) || p.name === entry.name) ?? null;
      setSelectedPlayer(player);
      setModalVisible(true);
      const matches = await getLastMatchesForUser(entry.id, 5);
      setRecentMatches(matches);
      setActiveTab('stats');
    };

   const handleShowAllMatches = async () => {
     if (selectedPlayer) {
       const matches = await getAllMatchesForUser(String(selectedPlayer.id));
       setAllMatches(matches);
       setShowAllMatchesModal(true);
     }
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
         players={players}
       />
      </View>
    );
  }
