import { players } from '@/const/players';
import { useCountdown } from '@/hooks/useCountdown';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles/styles';

export default function game() {
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

  return (
    <View style={styles.container}>
        <View style={styles.playersContainer}>
            <View style={styles.player}>
                <Text style={styles.title}>{player1?.name}</Text>
                <Image source={player1?.avatar} style={styles.avatar} />
            </View>

            <Text style={styles.vs}>vs</Text>

            <View style={styles.player}>
                <Text style={styles.title}>{player2?.name}</Text>
                <Image source={player2?.avatar} style={styles.avatar} />
            </View>
        </View>

        <View style={styles.playersContainer}>
          <TouchableOpacity style={styles.score} onPress={increaseScore1}>
            <Text style={{ color: "blue" }}>{scorePlayer1}</Text>
          </TouchableOpacity>

          <Text style={styles.vs}>:</Text>

          <TouchableOpacity style={styles.score} onPress={increaseScore2}>
            <Text style={{ color: "blue" }}>{scorePlayer2}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.timer}>
            {`${minutes}:${(seconds) < 10 ? '0' : ''}${seconds}`}
        </Text>

        <View>
            <Button
          title="Finish match"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        </View>
    </View>

);
}

const gamestyles = StyleSheet.create({
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  vs: {
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
});