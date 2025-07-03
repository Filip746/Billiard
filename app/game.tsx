import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCountdown from '../components/timer';

export default function GameScreen() {
  const initialEndTime = new Date().getTime() + 5 * 60 * 1000;
  const [timeLeft] = useCountdown(initialEndTime);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const { player1name, player2name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
        <Text style={styles.timer}>{player1name} vs {player2name}</Text>
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
    alignItems: 'center' 
},
  timer: { 
    fontSize: 48, 
    fontWeight: 'bold' 
},
});