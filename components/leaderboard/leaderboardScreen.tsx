import { players } from '@/const/players';
import { getLastMatchesForUser } from '@/lib/matchesCollection';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLeaderboard } from './useLeaderboard';

export default function leaderboardScreen() {
  const { leaderboard, loading } = useLeaderboard();

  const [selectedPlayer, setSelectedPlayer] = useState<LeaderboardEntry | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const handleNamePress = async (player: LeaderboardEntry) => {
    setSelectedPlayer(player);
    setModalVisible(true);
    const matches = await getLastMatchesForUser(player.id, 5);
    setRecentMatches(matches);
  };


  
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const rank = index + 1;

    
    const podiumStyle = rank === 1 ? styles.firstPlace : rank === 2 ? styles.secondPlace : rank === 3 ? styles.thirdPlace : {};

    return (
      <View style={[styles.itemContainer, podiumStyle]}>
        <Text style={styles.rank}>{rank}</Text>
        {item.avatar ? (
          <Image source={item.avatar} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
        <Text style={styles.name} onPress={() => handleNamePress(item)}>
          {item.name}
        </Text>
        <Text style={styles.points}>{(item.points * 100).toFixed(2)}%</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.container}>
            <TouchableOpacity style={modalStyles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={modalStyles.closeText}>×</Text>
            </TouchableOpacity>
            {selectedPlayer && selectedPlayer.avatar ? (
              <Image source={selectedPlayer.avatar} style={modalStyles.avatar} />
            ) : (
              <View style={modalStyles.profileCircle} />
            )}
            <Text style={modalStyles.playerName}>{selectedPlayer?.name}</Text>
            <View style={modalStyles.tabRow}>
              <Text style={modalStyles.tabActive}>Stats</Text>
              <Text style={modalStyles.tabInactive}>About</Text>
            </View>
             <View style={{ width: '100%', marginTop: 10 }}>
               {recentMatches.length === 0 && (
                 <Text style={{ color: '#888', textAlign: 'center' }}>No recent matches.</Text>
               )}
               {recentMatches.map((match, idx) => {
                 const opponent = players.find(p => p.id === Number(match.opponentId));
                 const [score1, score2] = match.result.split(' : ').map(Number);
                 const win = score1 > score2;
                 return (
                   <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                     <Text style={{ flex: 1, color: '#333' }}>
                       v {opponent?.name || 'Unknown'}
                     </Text>
                     <Text style={{ width: 60, textAlign: 'center', color: win ? '#28a745' : '#d32f2f', fontWeight: win ? 'bold' : '600' }}>
                       {match.result}
                     </Text>
                     <Text style={{ width: 80, textAlign: 'center', color: '#555' }}>
                       {match.date}
                     </Text>
                     <Text style={{ width: 40, textAlign: 'right', color: win ? '#28a745' : '#d32f2f', fontWeight: 'bold' }}>
                       {win ? 'win' : 'lose'}
                     </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  rank: {
    width: 30,
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
    color: '#444',
  },
  firstPlace: {
    backgroundColor: '#FFD70033', 
  },
  secondPlace: {
    backgroundColor: '#C0C0C033', 
  },
  thirdPlace: {
    backgroundColor: '#CD7F3233', 
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 12,
    zIndex: 2,
  },
  closeText: {
    fontSize: 28,
    color: '#888',
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
    marginBottom: 12,
    marginTop: 10,
  },
  playerName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  tabRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabActive: {
    fontWeight: '700',
    color: '#1976d2',
    marginRight: 32,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderColor: '#1976d2',
  },
  tabInactive: {
    color: '#888',
    paddingBottom: 6,
    marginLeft: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    marginTop: 10,
    backgroundColor: '#eee',
  },
});

