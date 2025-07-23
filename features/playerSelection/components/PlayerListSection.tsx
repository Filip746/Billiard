import React from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { playerStyles } from '../styles';

export function PlayerListSection({
  fadeAnim, scaleAnim, slideAnim, players, selectedId, setSelected, pulseAnim, title, sectionHeader, label
}: any) {
  return (
    <Animated.View
      style={[
        playerStyles.section,
        {
          opacity: fadeAnim,
          transform: sectionHeader === 'Player 2'
            ? [{ translateY: slideAnim }, { scale: scaleAnim }]
            : [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={playerStyles.sectionHeader}>
        <Text style={playerStyles.title}>{label}</Text>
        {selectedId && (
          <Text style={playerStyles.selectedIndicator}>Selected ✨</Text>
        )}
      </View>
      <ScrollView horizontal contentContainerStyle={playerStyles.scrollContainer} showsHorizontalScrollIndicator={false}>
        {players.map((player: any, index: number) => {
          const isStriped = index % 2 !== 0;
          const isSelected = selectedId === player.id;
          return (
            <Animated.View
              key={player.id}
              style={[
                playerStyles.playerContainer,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: fadeAnim,
                }
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
                      { backgroundColor: isStriped ? '#FFFFFF' : player.color },
                      isSelected && playerStyles.selectedBall,
                    ]}
                  >
                    {isStriped && (
                      <View style={playerStyles.stripesContainer}>
                        <View style={[playerStyles.stripe, { backgroundColor: 'transparent' }]} />
                        <View style={[playerStyles.stripe, { backgroundColor: player.color }]} />
                        <View style={[playerStyles.stripe, { backgroundColor: 'transparent' }]} />
                      </View>
                    )}
                    <View style={playerStyles.ballGloss} />
                    {isSelected && (
                      <Animated.View style={[playerStyles.selectedGlow, { transform: [{ scale: pulseAnim }] }]}>
                        <Text style={playerStyles.selectedCheckmark}>✓</Text>
                      </Animated.View>
                    )}
                    <View style={playerStyles.avatarContainer}>
                      <Image source={player.avatar} style={playerStyles.avatar} />
                    </View>
                  </View>
                  <View style={playerStyles.nationalityOverlay}>
                    <Image source={player.image} style={playerStyles.nationality} />
                  </View>
                </View>
                <Text style={playerStyles.playerName}>{player.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
