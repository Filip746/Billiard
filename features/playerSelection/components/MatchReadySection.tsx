import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { playerStyles } from "../styles";

export function MatchReadySection({
  fadeAnim,
  bounceAnim,
  players,
  selectedPlayer1,
  selectedPlayer2,
  selectedMinutes,
  scoreLimit,
  startMatch,
}: any) {
  if (
    !(
      selectedPlayer1 &&
      selectedPlayer2 &&
      selectedPlayer1 !== selectedPlayer2 &&
      selectedMinutes &&
      scoreLimit
    )
  )
    return null;

  const player1 = players.find((p: any) => p.id === selectedPlayer1);
  const player2 = players.find((p: any) => p.id === selectedPlayer2);

  return (
    <Animated.View
      style={[
        playerStyles.matchupTable,
        {
          opacity: fadeAnim,
          transform: [{ scale: bounceAnim }],
        },
      ]}
    >
      <View style={playerStyles.matchupHeader}>
        <Text style={playerStyles.matchupTitle}>🎱 MATCH READY</Text>
        <Text style={playerStyles.matchupSubtitle}>
          Players selected for battle
        </Text>
      </View>
      <View style={playerStyles.battleArena}>
        <View style={playerStyles.playerBallContainer}>
          <View
            style={[
              playerStyles.matchBall,
              { backgroundColor: player1?.color || "#FF6B6B" },
            ]}
          >
            <View style={playerStyles.ballGloss} />
            <View style={playerStyles.avatarContainer}>
              <Image source={player1?.avatar} style={playerStyles.avatar} />
            </View>
          </View>
          <Text style={playerStyles.battlePlayerName}>{player1?.name}</Text>
        </View>
        <View style={playerStyles.vsIndicator}>
          <Text style={playerStyles.vsText}>VS</Text>
          <View style={playerStyles.vsLine} />
        </View>
        <View style={playerStyles.playerBallContainer}>
          <View
            style={[
              playerStyles.matchBall,
              { backgroundColor: player2?.color || "#4ECDC4" },
            ]}
          >
            <View style={playerStyles.ballGloss} />
            <View style={playerStyles.avatarContainer}>
              <Image source={player2?.avatar} style={playerStyles.avatar} />
            </View>
          </View>
          <Text style={playerStyles.battlePlayerName}>{player2?.name}</Text>
        </View>
      </View>
      <View style={playerStyles.matchInfo}>
        <Text style={playerStyles.matchInfoText}>
          🔥 {selectedMinutes} minutes • {scoreLimit} points to win
        </Text>
      </View>
      <TouchableOpacity
        style={playerStyles.breakButton}
        onPress={startMatch}
        activeOpacity={0.9}
      >
        <View style={playerStyles.cueStickButton}>
          <Text style={playerStyles.breakButtonText}>🎯 BREAK!</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
