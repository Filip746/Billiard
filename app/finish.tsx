import { players } from '@/const/players';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function finish() {
  const { scorePlayer1, scorePlayer2, player1Id, player2Id, elapsedTime } = useLocalSearchParams<{
    scorePlayer1: string,
    scorePlayer2: string,
    player1Id: string,
    player2Id: string,
    elapsedTime: string,
  }>();

  const player1 = players.find(p => p.id === Number(player1Id));
  const player2 = players.find(p => p.id === Number(player2Id));

  const winner = Number(scorePlayer1) > Number(scorePlayer2) ? player1 : player2;

  return (
    <View style={gamestyles.container}>
      <Text style={gamestyles.header}>Game Summary</Text>

      <View style={gamestyles.playersContainer}>
        <View style={gamestyles.playerCard}>
          <Text style={gamestyles.playerName}>{player1?.name}</Text>
          <Image source={player1?.avatar} style={gamestyles.avatar} />
          <Text style={gamestyles.score}>{scorePlayer1}</Text>
        </View>

        <Text style={gamestyles.vs}>:</Text>

        <View style={gamestyles.playerCard}>
          <Text style={gamestyles.playerName}>{player2?.name}</Text>
          <Image source={player2?.avatar} style={gamestyles.avatar} />
          <Text style={gamestyles.score}>{scorePlayer2}</Text>
        </View>
      </View>

      {elapsedTime && (
        <Text style={gamestyles.timeUsed}>
          Time used: {Math.floor(Number(elapsedTime) / 60000)}:
          {(Math.floor((Number(elapsedTime) % 60000) / 1000) + 1).toString().padStart(2, '0')}
        </Text>
      )}

      <View style={gamestyles.winnerSection}>
        <Text style={gamestyles.winnerText}>The winner is:</Text>
        <Text style={gamestyles.winnerName}>{winner?.name}</Text>
        <Image
          source={winner?.avatar}
          style={[gamestyles.avatar, gamestyles.winnerAvatar]}
        />
      </View>
    </View>
  );
}

const gamestyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  playerCard: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2a2a2a',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  vs: {
    marginHorizontal: 15,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#444',
  },
  timeUsed: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  winnerSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  winnerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
  },
  winnerName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#28a745',
  },
  winnerAvatar: {
    borderWidth: 4,
    borderColor: '#28a745',
  },
});