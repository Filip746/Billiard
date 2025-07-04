import { players } from '@/const/players';
import { useCountdown } from '@/hooks/useCountdown';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

        {/* <View style={styles.playersContainer}>
          <Text style={gamestyles.header}>Team 1</Text>
          <ScrollView
            pagingEnabled
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={gamestyles.container}
          >
            <View style={gamestyles.section}>
              
              <TouchableOpacity onPress={increaseScore1} style={gamestyles.scoreBox}>
                <Text style={gamestyles.score}>{scorePlayer1}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <Text style={gamestyles.header}>Team 2</Text>
          <ScrollView
            pagingEnabled
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={gamestyles.container}
          >

            <View style={gamestyles.section}>
              
              <TouchableOpacity onPress={increaseScore2} style={gamestyles.scoreBox}>
                <Text style={gamestyles.score}>{scorePlayer2}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View> */}

        <Text style={styles.timer}>
            {`${minutes}:${(seconds) < 10 ? '0' : ''}${seconds}`}
        </Text>

        {((scorePlayer1===Number(scoreLimit)) || (scorePlayer2===Number(scoreLimit))) && (
                <View>
                  
                  <Button title= "zavrsi mec" onPress={() => router.push({
                    pathname: '/finish',
                    params: {
                      scorePlayer1: scorePlayer1,
                      scorePlayer2: scorePlayer2,
                      player1Id: player1Id,
                      player2Id: player2Id,
                      timeLimitMinutes: timeLimitMinutes,
                    }
                  })}/>
                </View>
          )}

        

        
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