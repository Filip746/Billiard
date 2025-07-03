import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { players } from '../components/PlayerSelection';
import useCountdown from '../components/timer';

export default function GameScreen() {
  const initialEndTime = new Date().getTime() + 5 * 60 * 1000;
  const [timeLeft] = useCountdown(initialEndTime);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const { player1name, player2name, player1id, player2id} = useLocalSearchParams();

  const player1 = players.find(p => p.id === Number(player1id))?.avatar;
  const player2 = players.find(p => p.id === Number(player2id))?.avatar;



  return (
  <View style={styles.container}>
    <View style={styles.playersContainer}>
      <View style={styles.player}>
        <Text style={styles.title}>{player1name}</Text>
        <Image source={player1} style={styles.avatar} />
      </View>

      <Text style={styles.vs}>vs</Text>

      <View style={styles.player}>
        <Text style={styles.title}>{player2name}</Text>
        <Image source={player2} style={styles.avatar} />
      </View>
    </View>

    <Text style={styles.timer}>
      {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
    </Text>
  </View>
);
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  vs: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  timer: { 
    fontSize: 48, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});