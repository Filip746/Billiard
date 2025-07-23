import React from 'react';
import { Animated, Text } from 'react-native';
import { finishStyles } from '../styles';

export function FinalScoreInfo({ scorePlayer1, scorePlayer2, formattedTime, scaleAnim }: {
  scorePlayer1: number;
  scorePlayer2: number;
  formattedTime?: string | null;
  scaleAnim: any;
}) {
  return (
    <Animated.View style={[finishStyles.scoreContainer, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={finishStyles.finalScore}>{scorePlayer1} : {scorePlayer2}</Text>
      {formattedTime && (
        <Text style={finishStyles.timeUsed}>⏱ {formattedTime}</Text>
      )}
    </Animated.View>
  );
}
