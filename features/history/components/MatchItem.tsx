import { Player } from "@/shared/types/players";
import { Router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  InteractionManager,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FirestoreMatch } from "../hooks/useHistoryScreen";
import { historyStyles } from "../styles";

type MatchItemProps = {
  item: FirestoreMatch;
  index: number;
  players: Player[];
  router: Router;
};

export const MatchItem = React.memo(
  ({ item, index, players, router }: MatchItemProps) => {
    const [animationsEnabled, setAnimationsEnabled] = useState(false);
    const itemAnim = useRef(new Animated.Value(0)).current;
    const scaleItemAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
      InteractionManager.runAfterInteractions(() => {
        setAnimationsEnabled(true);

        Animated.parallel([
          Animated.timing(itemAnim, {
            toValue: 1,
            delay: Math.min(index * 50, 500),
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleItemAnim, {
            toValue: 1,
            delay: Math.min(index * 50, 500),
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, [index, itemAnim, scaleItemAnim]);

    const player1 = players.find((p) => p.id === item.player1Id);
    const player2 = players.find((p) => p.id === item.player2Id);
    const dateStr =
      (typeof item.createdAt === "object" &&
        item.createdAt?.seconds &&
        new Date(item.createdAt.seconds * 1000).toLocaleDateString()) ||
      (typeof item.createdAt === "string" && item.createdAt) ||
      (typeof item.date === "string" && item.date) ||
      "N/A";

    const winner =
      item.scorePlayer1 > item.scorePlayer2 ? player1?.name : player2?.name;
    const isPlayer1Winner = item.scorePlayer1 > item.scorePlayer2;

    const handlePress = useCallback(() => {
      router.push({
        pathname: "/finish",
        params: {
          matchId: item.id,
        },
      });
    }, [item, router]);

    if (!animationsEnabled && index > 10) {
      return (
        <View style={historyStyles.matchRow}>
          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            style={historyStyles.matchContent}
          >
            <View style={historyStyles.playersSection}>
              <Text style={historyStyles.matchPlayers}>
                {player1?.name || "Player 1"}
                <Text style={historyStyles.vsText}> vs </Text>
                {player2?.name || "Player 2"}
              </Text>
              <Text style={historyStyles.winnerText}>🏆 {winner} wins!</Text>
            </View>

            <View style={historyStyles.scoreSection}>
              <View
                style={[
                  historyStyles.scoreContainer,
                  isPlayer1Winner && historyStyles.winnerScore,
                ]}
              >
                <Text
                  style={[
                    historyStyles.matchResult,
                    isPlayer1Winner && historyStyles.winnerScoreText,
                  ]}
                >
                  {item.scorePlayer1} : {item.scorePlayer2}
                </Text>
              </View>
            </View>

            <View style={historyStyles.dateSection}>
              <Text style={historyStyles.matchDate}>📅 {dateStr}</Text>
            </View>

            <View style={historyStyles.matchIndicator} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Animated.View
        style={
          animationsEnabled
            ? [
                {
                  opacity: itemAnim,
                  transform: [
                    { scale: scaleItemAnim },
                    {
                      translateY: itemAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]
            : {}
        }
      >
        <TouchableOpacity
          style={historyStyles.matchRow}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <View style={historyStyles.matchContent}>
            <View style={historyStyles.playersSection}>
              <Text style={historyStyles.matchPlayers}>
                {player1?.name || "Player 1"}
                <Text style={historyStyles.vsText}> vs </Text>
                {player2?.name || "Player 2"}
              </Text>
              <Text style={historyStyles.winnerText}>🏆 {winner} wins!</Text>
            </View>

            <View style={historyStyles.scoreSection}>
              <View
                style={[
                  historyStyles.scoreContainer,
                  isPlayer1Winner && historyStyles.winnerScore,
                ]}
              >
                <Text
                  style={[
                    historyStyles.matchResult,
                    isPlayer1Winner && historyStyles.winnerScoreText,
                  ]}
                >
                  {item.scorePlayer1} : {item.scorePlayer2}
                </Text>
              </View>
            </View>

            <View style={historyStyles.dateSection}>
              <Text style={historyStyles.matchDate}>📅 {dateStr}</Text>
            </View>
          </View>

          <View style={historyStyles.matchIndicator} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

MatchItem.displayName = "MatchItem";
