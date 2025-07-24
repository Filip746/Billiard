import { Player } from "@/shared/types/players";
import React from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import { finishStyles } from "../styles";

type Props = {
  winner: Player;
  spin: Animated.Value | Animated.AnimatedInterpolation<string | number>;
  pulseAnim: Animated.Value;
  onPlayerPress: (player: Player) => void;
};

export function ChampionSection({
  winner,
  spin,
  pulseAnim,
  onPlayerPress,
}: Props) {
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
