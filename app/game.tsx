import { players } from '@/const/players';
import { useCountdown } from '@/hooks/useCountdown';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Game() {
  const { player1Id, player2Id, timeLimitMinutes, scoreLimit } = useLocalSearchParams<{
    player1Id: string,
    player2Id: string,
    timeLimitMinutes: string,
    scoreLimit: string
  }>();

  const billiard = require('../assets/images/billiard.jpg');

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
    <ImageBackground source={billiard} style={gamestyles.background}>
      <View style={gamestyles.topRow}>
        <View style={gamestyles.player}>
          <Image source={player1?.avatar} style={gamestyles.avatar} />
          <Text style={gamestyles.playerName}>{player1?.name}</Text>
        </View>
        <View style={gamestyles.player}>
          <Image source={player2?.avatar} style={gamestyles.avatar} />
          <Text style={gamestyles.playerName}>{player2?.name}</Text>
        </View>
      </View>

      <View style={gamestyles.centerContainer}>
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
    </ImageBackground>
  );
}

const gamestyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  player: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreBox: {
    width: 80,
    height: 100,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  vs: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
