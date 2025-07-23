import React from "react";
import { Text, View } from "react-native";
import { finishStyles } from "../styles";
import { PlayerCard } from "./PlayerCard";

export function PlayersSection({
  player1,
  player2,
  winner,
  scaleAnim,
  scorePlayer1,
  scorePlayer2,
  onPlayerPress,
}: any) {
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
