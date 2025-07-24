import { Player } from "@/shared/types/players";
import React from "react";
import { Animated, Text, View } from "react-native";
import { finishStyles } from "../styles";
import { PlayerCard } from "./PlayerCard";

type Props = {
  player1?: Player;
  player2?: Player;
  winner?: Player;
  scaleAnim: Animated.Value;
  scorePlayer1: number;
  scorePlayer2: number;
  onPlayerPress: (player: Player) => void;
};

export function PlayersSection({
  player1,
  player2,
  winner,
  scaleAnim,
  scorePlayer1,
  scorePlayer2,
  onPlayerPress,
}: Props) {
  return (
    <View style={finishStyles.playersSection}>
      <Text style={finishStyles.playersTitle}>Match Players</Text>
      <View style={finishStyles.playersRow}>
        <PlayerCard
          player={player1}
          isWinner={winner?.name === player1?.name}
          scaleAnim={scaleAnim}
          score={scorePlayer1}
          onPlayerPress={onPlayerPress}
        />
        <Text style={finishStyles.vsText}>VS</Text>
        <PlayerCard
          player={player2}
          isWinner={winner?.name === player2?.name}
          scaleAnim={scaleAnim}
          score={scorePlayer2}
          onPlayerPress={onPlayerPress}
        />
      </View>
    </View>
  );
}
