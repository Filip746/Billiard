import { Player } from "@/shared/types/players";
import React from "react";
import {
  Animated,
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { gameStyles } from "../styles/gameStyles";

interface PlayerCardProps {
  player?: Player;
  badge: string;
  onPress: (player: Player) => void;
  animStyle?: StyleProp<ViewStyle>;
}

export function PlayerCard({
  player,
  badge,
  onPress,
  animStyle,
}: PlayerCardProps) {
  if (!player) return null;
  return (
    <Animated.View style={[gameStyles.sidePlayer, animStyle]}>
      <TouchableOpacity onPress={() => onPress(player)}>
        <Animated.View style={gameStyles.playerContainer}>
          <Image source={player.avatar} style={gameStyles.avatarLarge} />
          <View style={gameStyles.playerBadge}>
            <Text style={gameStyles.playerBadgeText}>{badge}</Text>
          </View>
        </Animated.View>
        <Text style={gameStyles.playerName}>{player.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
