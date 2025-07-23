import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { finishStyles } from '../styles';

export function PlayerCard({
  player,
  isWinner,
  scaleAnim,
  score,
  onPlayerPress,
}: {
  player: any;
  isWinner: boolean;
  scaleAnim: any;
  score: number;
  onPlayerPress: (player: any) => void;
}) {
  return (
    <Animated.View
      style={[
        finishStyles.playerCard,
        isWinner && finishStyles.winnerCard,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <TouchableOpacity onPress={() => player && onPlayerPress(player)}>
        {player?.avatar && (
          <Image source={player.avatar} style={finishStyles.playerAvatar} />
        )}
        <Text style={finishStyles.playerName}>{player?.name}</Text>
        <View style={finishStyles.scoreCircle}>
          <Text style={finishStyles.playerScore}>{score}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
