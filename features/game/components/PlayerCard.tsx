import React from "react";
import { Animated, Image, ImageSourcePropType, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { gameStyles } from "../styles/gameStyles";

interface PlayerCardProps {
  player?: { name: string; avatar: ImageSourcePropType } | null;
  badge: string;
  onPress: (player: { name: string; avatar: ImageSourcePropType }) => void;
  animStyle?: StyleProp<ViewStyle>;
}

export default function PlayerCard({ player, badge, onPress, animStyle }: PlayerCardProps) {
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