import { Player } from "@/shared/types/players";
import React from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import { finishStyles } from "../styles";

export function ChampionSection({
  winner,
  spin,
  pulseAnim,
  onPlayerPress,
}: {
  winner: Player;
  spin: any;
  pulseAnim: any;
  onPlayerPress: (player: any) => void;
}) {
  return (
    <Animated.View
      style={[
        finishStyles.winnerSection,
        { transform: [{ scale: pulseAnim }] },
      ]}
    >
      <Animated.Text
        style={[finishStyles.trophyIcon, { transform: [{ rotate: spin }] }]}
      >
        🏆
      </Animated.Text>
      <Text style={finishStyles.winnerTitle}>Champion</Text>
      {winner?.avatar && (
        <TouchableOpacity onPress={() => onPlayerPress(winner)}>
          <Image source={winner.avatar} style={finishStyles.winnerAvatar} />
        </TouchableOpacity>
      )}
      <Text style={finishStyles.winnerName}>{winner?.name}</Text>
    </Animated.View>
  );
}
