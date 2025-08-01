import { Player } from "@/shared/types/players";
import React from "react";
import {
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { playerStyles } from "../styles";

type PlayerListSectionProps = {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  slideAnim: Animated.Value;
  players: Player[];
  selectedId: string | null;
  setSelected: (id: string) => void;
  pulseAnim: Animated.Value;
  title?: string;
  sectionHeader?: string;
  label?: string;
};

export function PlayerListSection({
  fadeAnim,
  scaleAnim,
  slideAnim,
  players,
  selectedId,
  setSelected,
  pulseAnim,
  sectionHeader,
  label,
}: PlayerListSectionProps) {
  return (
    <Animated.View
      style={[
        playerStyles.section,
        {
          opacity: fadeAnim,
          transform:
            sectionHeader === "Player 2"
              ? [{ translateY: slideAnim }, { scale: scaleAnim }]
              : [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={playerStyles.sectionHeader}>
        <Text style={playerStyles.title}>{label}</Text>
        {selectedId && (
          <Text style={playerStyles.selectedIndicator}>Selected ✨</Text>
        )}
      </View>
      <FlatList
        data={players}
        keyExtractor={(player) => player.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={playerStyles.scrollContainer}
        renderItem={({ item: player, index }) => {
          const isStriped = index % 2 !== 0;
          const isSelected = selectedId === player.id;
          return (
            <Animated.View
              style={[
                playerStyles.playerContainer,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: fadeAnim,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setSelected(player.id)}
                activeOpacity={0.8}
                style={playerStyles.playerTouchable}
              >
                <View style={playerStyles.ballAndFlagContainer}>
                  <View
                    style={[
                      playerStyles.billiardBall,
                      { backgroundColor: isStriped ? "#FFFFFF" : player.color },
                      isSelected && playerStyles.selectedBall,
                    ]}
                  >
                    {isStriped && (
                      <View style={playerStyles.stripesContainer}>
                        <View
                          style={[
                            playerStyles.stripe,
                            { backgroundColor: "transparent" },
                          ]}
                        />
                        <View
                          style={[
                            playerStyles.stripe,
                            { backgroundColor: player.color },
                          ]}
                        />
                        <View
                          style={[
                            playerStyles.stripe,
                            { backgroundColor: "transparent" },
                          ]}
                        />
                      </View>
                    )}
                    <View style={playerStyles.ballGloss} />
                    {isSelected && (
                      <Animated.View
                        style={[
                          playerStyles.selectedGlow,
                          { transform: [{ scale: pulseAnim }] },
                        ]}
                      >
                        <Text style={playerStyles.selectedCheckmark}>✓</Text>
                      </Animated.View>
                    )}
                    <View style={playerStyles.avatarContainer}>
                      <Image
                        source={player.avatar}
                        style={playerStyles.avatar}
                      />
                    </View>
                  </View>
                  <View style={playerStyles.nationalityOverlay}>
                    <Image
                      source={player.image}
                      style={playerStyles.nationality}
                    />
                  </View>
                </View>
                <Text style={playerStyles.playerName}>{player.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </Animated.View>
  );
}
