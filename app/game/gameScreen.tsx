import { billiard } from '@/const/images';
import React from 'react';
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { gameStyles } from './gameStyles';
import { useGameLogic } from './useGameLogic';

export function GameScreen() {
  const {
    player1,
    player2,
    scorePlayer1,
    scorePlayer2,
    minutes,
    seconds,
    increaseScore1,
    increaseScore2,
    handleFinishMatch,
    shouldShowFinish,
  } = useGameLogic();

  return (
    <ImageBackground source={billiard} style={gameStyles.background}>
      <View style={gameStyles.topRow}>
        <View style={gameStyles.player}>
          <Image source={player1?.avatar} style={gameStyles.avatar} />
          <Text style={gameStyles.playerName}>{player1?.name}</Text>
        </View>
        <View style={gameStyles.player}>
          <Image source={player2?.avatar} style={gameStyles.avatar} />
          <Text style={gameStyles.playerName}>{player2?.name}</Text>
        </View>
      </View>

      <View style={gameStyles.centerContainer}>
        <View style={gameStyles.scoreContainer}>
          <TouchableOpacity style={gameStyles.scoreBox} onPress={increaseScore1}>
            <Text style={gameStyles.scoreText}>{scorePlayer1}</Text>
          </TouchableOpacity>

          <Text style={gameStyles.vs}>:</Text>

          <TouchableOpacity style={gameStyles.scoreBox} onPress={increaseScore2}>
            <Text style={gameStyles.scoreText}>{scorePlayer2}</Text>
          </TouchableOpacity>
        </View>

        <Text style={gameStyles.timer}>
          {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
        </Text>

        {shouldShowFinish && (
          <TouchableOpacity style={gameStyles.finishButton} onPress={handleFinishMatch}>
            <Text style={gameStyles.finishButtonText}>Finish Match</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}
