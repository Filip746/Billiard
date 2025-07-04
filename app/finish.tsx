import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function finish() {
    const { scorePlayer1, scorePlayer2 } = useLocalSearchParams<{
        scorePlayer1: string,
        scorePlayer2: string,
      }>();
  return (
    <View>
      <Text>finish</Text>
    </View>
  )
}