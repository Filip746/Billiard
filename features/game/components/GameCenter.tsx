import { ScoreSnapScroll } from "@/shared/hooks/scoreSnapScroll";
import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { gameStyles } from "../styles/gameStyles";

interface GameCenterProps {
  scorePlayer1: number;
  setScorePlayer1: (n: number) => void;
  scorePlayer2: number;
  setScorePlayer2: (n: number) => void;
  scoreLimit: number | null;
  spin: any;
  minutes: number;
  seconds: number;
  timerPulseAnim: any;
  shouldShowFinish: boolean;
  finishButtonAnim: any;
  scaleAnim: any;
  onFinishPress: () => void;
}

export function GameCenter({
  scorePlayer1,
  setScorePlayer1,
  scorePlayer2,
  setScorePlayer2,
  scoreLimit,
  spin,
  minutes,
  seconds,
  timerPulseAnim,
  shouldShowFinish,
  finishButtonAnim,
  scaleAnim,
  onFinishPress,
}: GameCenterProps) {
  return (
    <Animated.View
      style={[
        gameStyles.centerBlock,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={gameStyles.scoreSnapRow}>
        <View style={gameStyles.scoreSnapColumn}>
          <ScoreSnapScroll
            value={scorePlayer1}
            onChange={setScorePlayer1}
            min={0}
            max={Number(scoreLimit)}
            itemHeight={90}
          />
        </View>

        <View style={gameStyles.scoreSnapMiddle}>
          <Animated.Text
            style={[gameStyles.vsLarge, { transform: [{ rotate: spin }] }]}
          >
            ⚡
          </Animated.Text>
          <Animated.View
            style={[
              gameStyles.timerContainer,
              { transform: [{ scale: timerPulseAnim }] },
            ]}
          >
            <Text style={gameStyles.timerLarge}>
              {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
            </Text>
            <Text style={gameStyles.timerLabel}>TIME</Text>
          </Animated.View>
        </View>

        <View style={gameStyles.scoreSnapColumn}>
          <ScoreSnapScroll
            value={scorePlayer2}
            onChange={setScorePlayer2}
            min={0}
            max={Number(scoreLimit)}
            itemHeight={90}
          />
        </View>
      </View>

      {shouldShowFinish ? (
        <Animated.View
          style={{
            opacity: finishButtonAnim,
            transform: [{ scale: finishButtonAnim }],
          }}
        >
          <TouchableOpacity
            style={gameStyles.finishButton}
            onPress={onFinishPress}
            activeOpacity={0.9}
          >
            <Text style={gameStyles.finishButtonText}>🏁 Finish Match</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={{ minHeight: 60, width: "100%" }} />
      )}
    </Animated.View>
  );
}
