import { Player } from "@/shared/types/players";
import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { finishStyles } from "../styles";

type Props = {
  player?: Player;
  isWinner: boolean;
  scaleAnim: Animated.Value;
  score: number;
  onPlayerPress: (player: Player) => void;
};

export function PlayerCard({
  player,
  isWinner,
  scaleAnim,
  score,
  onPlayerPress,
}: Props) {
  return (
    <Animated.View
      style={[
        finishStyles.playerCard,
        isWinner && finishStyles.winnerCard,
        { transform: [{ scale: scaleAnim }] },
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
