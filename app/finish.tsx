import { players } from '@/const/players';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import styles from './styles/styles';

export default function finish() {
    const { scorePlayer1, scorePlayer2, player1Id, player2Id, timeLimitMinutes } = useLocalSearchParams<{
        scorePlayer1: string,
        scorePlayer2: string,
        player1Id: string,
        player2Id: string,
        timeLimitMinutes: string,
      }>();

    const player1 = players.find(p => p.id === Number(player1Id));
    const player2 = players.find(p => p.id === Number(player2Id));
    return (
        <>
        <View style={gamestyles.playersContainer}>
            <View>
                <Text style={{ color: "blue" }}>{player1?.name}</Text>
                <Image source={player1?.avatar} style={styles.avatar}/>
                <Text style={{ color: "blue" }}>{scorePlayer1}</Text>
            </View>
                <Text style={gamestyles.vs}>:</Text>
            <View>
                <Text style={{ color: "blue" }}>{player2?.name}</Text>
                <Image source={player2?.avatar} style={styles.avatar}/>
                <Text style={{ color: "blue" }}>{scorePlayer2}</Text>
            </View>
        </View>
        </>
    )
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