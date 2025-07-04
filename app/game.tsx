import { players } from '@/const/players';
import { useCountdown } from '@/hooks/useCountdown';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Game() {
  const { player1Id, player2Id, timeLimitMinutes, scoreLimit } = useLocalSearchParams<{
    player1Id: string,
    player2Id: string,
    timeLimitMinutes: string,
    scoreLimit: string
  }>();

  const initialEndTime = new Date().getTime() + Number(timeLimitMinutes) * 60 * 1000;
  const [timeLeft] = useCountdown(initialEndTime);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  const player1 = players.find(p => p.id === Number(player1Id));
  const player2 = players.find(p => p.id === Number(player2Id));

  const increaseScore1 = () => {
    if (scorePlayer1 < Number(scoreLimit)) {
      setScorePlayer1(scorePlayer1 + 1);
    }
  };

  const increaseScore2 = () => {
    if (scorePlayer2 < Number(scoreLimit)) {
      setScorePlayer2(scorePlayer2 + 1);
    }
  };

  const handleFinishMatch = () => {
    const totalTimeMs = Number(timeLimitMinutes) * 60 * 1000;
    const timeUsed = totalTimeMs - timeLeft;
    setElapsedTime(timeUsed);
    router.push({
      pathname: '/finish',
      params: {
        scorePlayer1: scorePlayer1,
        scorePlayer2: scorePlayer2,
        player1Id: player1Id,
        player2Id: player2Id,
        elapsedTime: timeUsed,
      }
    });
  };

  return (
    <View style={gamestyles.container}>
      <Text style={gamestyles.header}>Game On!</Text>

      <View style={gamestyles.playersContainer}>
        <View style={gamestyles.player}>
          <Text style={gamestyles.playerName}>{player1?.name}</Text>
          <Image source={player1?.avatar} style={gamestyles.avatar} />
        </View>

        <Text style={gamestyles.vs}>vs</Text>

        <View style={gamestyles.player}>
          <Text style={gamestyles.playerName}>{player2?.name}</Text>
          <Image source={player2?.avatar} style={gamestyles.avatar} />
        </View>
      </View>

      <View style={gamestyles.scoreContainer}>
        <TouchableOpacity style={gamestyles.scoreBox} onPress={increaseScore1}>
          <Text style={gamestyles.scoreText}>{scorePlayer1}</Text>
        </TouchableOpacity>

        <Text style={gamestyles.vs}>:</Text>

        <TouchableOpacity style={gamestyles.scoreBox} onPress={increaseScore2}>
          <Text style={gamestyles.scoreText}>{scorePlayer2}</Text>
        </TouchableOpacity>
      </View>

      <Text style={gamestyles.timer}>
        {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
      </Text>

      {(scorePlayer1 === Number(scoreLimit) || scorePlayer2 === Number(scoreLimit)) && scorePlayer1 !== scorePlayer2 && (
        <TouchableOpacity style={gamestyles.finishButton} onPress={handleFinishMatch}>
          <Text style={gamestyles.finishButtonText}>Finish Match</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const gamestyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 40,
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  player: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007AFF',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  vs: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#444',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  scoreBox: {
    width: 80,
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  finishButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
