import { router } from 'expo-router';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { playerStyles } from '../styles';

export function PlayerSelectionHeader({ fadeAnim, headerAnim, pulseAnim }: any) {
  return (
    <Animated.View 
      style={[
        playerStyles.headerSection,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: headerAnim },
            { scale: pulseAnim }
          ]
        }
      ]}
    >
      <View style={playerStyles.headerRow}>
        <TouchableOpacity
          style={playerStyles.historyButton}
          onPress={() => router.push('/history')}
          activeOpacity={0.8}
        >
          <Text style={playerStyles.historyButtonText}>📚 History</Text>
        </TouchableOpacity>
      </View>
      <Text style={playerStyles.header}>🎯 Select Your Players</Text>
      <Text style={playerStyles.subtitle}>Choose your champions for the ultimate billiard showdown</Text>
    </Animated.View>
  );
}
