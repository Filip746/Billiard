import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useLeaderboard } from './useLeaderboard';

export default function leaderboardScreen() {
  const { leaderboard, loading } = useLeaderboard();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  
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
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.points}>{item.points} pts</Text>
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
