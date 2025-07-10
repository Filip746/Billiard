import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { finishStyles } from './finishStyles';
import { useFinishScreen } from './useFinishScreen';

export function finishScreen() {
  const {
    player1,
    player2,
    scorePlayer1,
    scorePlayer2,
    winner,
    formattedTime,
  } = useFinishScreen();

  const router = useRouter();

  const goToLeaderboard = () => {
    router.push('/leaderboard');
  };

  return (
    <View style={finishStyles.root}>
      <View style={finishStyles.playerColumn}>
        <View style={finishStyles.cardShadow}>
          <Image source={player1?.avatar} style={finishStyles.avatar} />
          <Text style={finishStyles.playerName}>{player1?.name}</Text>
          <Text style={finishStyles.score}>{scorePlayer1}</Text>
        </View>
      </View>

      <View style={finishStyles.centerColumn}>
        <View style={finishStyles.scoreRow}>
          <Text style={finishStyles.bigScore}>{scorePlayer1}</Text>
          <Text style={finishStyles.colon}>:</Text>
          <Text style={finishStyles.bigScore}>{scorePlayer2}</Text>
        </View>
        {formattedTime && (
          <Text style={finishStyles.timeUsed}>⏱ {formattedTime}</Text>
        )}
        <View style={finishStyles.winnerBox}>
          <Text style={finishStyles.winnerLabel}>🏆 Winner</Text>
          <Image source={winner?.avatar} style={finishStyles.winnerAvatar} />
          <Text style={finishStyles.winnerName}>{winner?.name}</Text>
        </View>
        <TouchableOpacity
          style={finishStyles.leaderboardBtn}
          onPress={goToLeaderboard}
          activeOpacity={0.85}
        >
          <Text style={finishStyles.leaderboardBtnText}>View Leaderboard</Text>
        </TouchableOpacity>
      </View>

      <View style={finishStyles.playerColumn}>
        <View style={finishStyles.cardShadow}>
          <Image source={player2?.avatar} style={finishStyles.avatar} />
          <Text style={finishStyles.playerName}>{player2?.name}</Text>
          <Text style={finishStyles.score}>{scorePlayer2}</Text>
        </View>
      </View>
    </View>
  );
}
