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
    <View style={finishStyles.container}>
      <Text style={finishStyles.header}>Game Summary</Text>

      <View style={finishStyles.playersContainer}>
        <View style={finishStyles.playerCard}>
          <Text style={finishStyles.playerName}>{player1?.name}</Text>
          <Image source={player1?.avatar} style={finishStyles.avatar} />
          <Text style={finishStyles.score}>{scorePlayer1}</Text>
        </View>

        <Text style={finishStyles.vs}>:</Text>

        <View style={finishStyles.playerCard}>
          <Text style={finishStyles.playerName}>{player2?.name}</Text>
          <Image source={player2?.avatar} style={finishStyles.avatar} />
          <Text style={finishStyles.score}>{scorePlayer2}</Text>
        </View>
      </View>

      {formattedTime && (
        <Text style={finishStyles.timeUsed}>
          Time used: {formattedTime}
        </Text>
      )}

      <View style={finishStyles.winnerSection}>
        <Text style={finishStyles.winnerText}>The winner is:</Text>
        <Text style={finishStyles.winnerName}>{winner?.name}</Text>
        <Image
          source={winner?.avatar}
          style={[finishStyles.avatar, finishStyles.winnerAvatar]}
        />
      </View>

      <TouchableOpacity
        style={finishStyles.leaderboardButton}
        onPress={goToLeaderboard}
      >
        <Text style={finishStyles.leaderboardButtonText}>Go to Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
}
