import { usePlayers } from '@/shared/hooks/usePlayers';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { usePlayerSelection } from '../hooks';
import { playerStyles } from '../styles';

const MAX_MINUTES = 60;

const timeOptions = Array.from(
  { length: MAX_MINUTES / 5 },
  (_, i) => (i + 1) * 5
);

export function PlayerSelection() {
  const {
    selectedPlayer1, setSelectedPlayer1,
    selectedPlayer2, setSelectedPlayer2,
    selectedMinutes, handleTimeChange,
    scoreLimit, setScoreLimit,
    startMatch,
  } = usePlayerSelection();
  const players = usePlayers();

  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const headerAnim = useRef(new Animated.Value(-100)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(headerAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.bounce),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();

    
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  
  useEffect(() => {
    if (selectedPlayer1 && selectedPlayer2 && selectedPlayer1 !== selectedPlayer2 && selectedMinutes && scoreLimit) {
      Animated.spring(bounceAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      bounceAnim.setValue(0);
    }
  }, [selectedPlayer1, selectedPlayer2, selectedMinutes, scoreLimit]);

  const renderPlayerCard = (player: any, isSelected: boolean, onPress: () => void, index: number) => {
    const isStriped = index % 2 !== 0;
    
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
          onPress={onPress}
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
  };
  return (
    <ScrollView contentContainerStyle={playerStyles.container} showsVerticalScrollIndicator={false}>
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

      <Animated.View 
        style={[
          playerStyles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={playerStyles.sectionHeader}>
          <Text style={playerStyles.title}>🥇 Player 1</Text>
          {selectedPlayer1 && (
            <Text style={playerStyles.selectedIndicator}>Selected ✨</Text>
          )}
        </View>
        <ScrollView horizontal contentContainerStyle={playerStyles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {players.map((player, index) => 
            renderPlayerCard(
              player, 
              selectedPlayer1 === player.id, 
              () => setSelectedPlayer1(player.id),
              index
            )
          )}
        </ScrollView>
      </Animated.View>

      <Animated.View 
        style={[
          playerStyles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
          }
        ]}
      >
        <View style={playerStyles.sectionHeader}>
          <Text style={playerStyles.title}>🥈 Player 2</Text>
          {selectedPlayer2 && (
            <Text style={playerStyles.selectedIndicator}>Selected ✨</Text>
          )}
        </View>
        <ScrollView horizontal contentContainerStyle={playerStyles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {players.map((player, index) => 
            renderPlayerCard(
              player, 
              selectedPlayer2 === player.id, 
              () => setSelectedPlayer2(player.id),
              index
            )
          )}
        </ScrollView>
      </Animated.View>

      <Animated.View 
        style={[
          playerStyles.billiardTable,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={playerStyles.tableHeader}>
          <Text style={playerStyles.tableTitle}>🎱 TABLE SETUP</Text>
          <Text style={playerStyles.tableSubtitle}>Configure your match</Text>
        </View>
        
        <View style={playerStyles.tableRail}>
          <View style={playerStyles.railSection}>
            <View style={playerStyles.ballIndicator}>
              <Text style={playerStyles.ballNumber}>⏰</Text>
            </View>
            <Text style={playerStyles.railLabel}>TIME LIMIT</Text>
            <View style={playerStyles.cueStick}>
              <Picker
                selectedValue={selectedMinutes}
                onValueChange={handleTimeChange}
                style={playerStyles.picker}
              >
                <Picker.Item label="Select time" value={null} />
                {timeOptions.map(minutes => (
                  <Picker.Item
                    key={minutes}
                    label={`${minutes} min`}
                    value={minutes}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        
        <View style={playerStyles.tableRail}>
          <View style={playerStyles.railSection}>
            <View style={playerStyles.ballIndicator}>
              <Text style={playerStyles.ballNumber}>🎯</Text>
            </View>
            <Text style={playerStyles.railLabel}>SCORE LIMIT</Text>
            <View style={playerStyles.cueStick}>
              <Picker
                selectedValue={scoreLimit}
                onValueChange={setScoreLimit}
                style={playerStyles.picker}
              >
                <Picker.Item label="Select points" value={null} />
                <Picker.Item label="3 points" value={3} />
                <Picker.Item label="5 points" value={5} />
                <Picker.Item label="7 points" value={7} />
                <Picker.Item label="10 points" value={10} />
              </Picker>
            </View>
          </View>
        </View>
      </Animated.View>


      {selectedPlayer1 && selectedPlayer2 && selectedPlayer1 !== selectedPlayer2 && selectedMinutes && scoreLimit && (
        <Animated.View 
          style={[
            playerStyles.matchupTable,
            {
              opacity: fadeAnim,
              transform: [{ scale: bounceAnim }]
            }
          ]}
        >
          <View style={playerStyles.matchupHeader}>
            <Text style={playerStyles.matchupTitle}>🎱 MATCH READY</Text>
            <Text style={playerStyles.matchupSubtitle}>Players selected for battle</Text>
          </View>

          <View style={playerStyles.battleArena}>
            <View style={playerStyles.playerBallContainer}>
              <View style={[
                playerStyles.matchBall,
                { backgroundColor: players.find(p => p.id === selectedPlayer1)?.color || '#FF6B6B' }
              ]}>
                <View style={playerStyles.ballGloss} />
                <View style={playerStyles.avatarContainer}>
                  <Image 
                    source={players.find(p => p.id === selectedPlayer1)?.avatar} 
                    style={playerStyles.avatar} 
                  />
                </View>
              </View>
              <Text style={playerStyles.battlePlayerName}>
                {players.find(p => p.id === selectedPlayer1)?.name}
              </Text>
            </View>
            
            <View style={playerStyles.vsIndicator}>
              <Text style={playerStyles.vsText}>VS</Text>
              <View style={playerStyles.vsLine} />
            </View>
            
            <View style={playerStyles.playerBallContainer}>
              <View style={[
                playerStyles.matchBall,
                { backgroundColor: players.find(p => p.id === selectedPlayer2)?.color || '#4ECDC4' }
              ]}>
                <View style={playerStyles.ballGloss} />
                <View style={playerStyles.avatarContainer}>
                  <Image 
                    source={players.find(p => p.id === selectedPlayer2)?.avatar} 
                    style={playerStyles.avatar} 
                  />
                </View>
              </View>
              <Text style={playerStyles.battlePlayerName}>
                {players.find(p => p.id === selectedPlayer2)?.name}
              </Text>
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

      )}
    </ScrollView>
  );
}
