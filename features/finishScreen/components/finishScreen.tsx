import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { usePlayerModal } from '@/hooks/usePlayerModal';
import { usePlayers } from '@/lib/usePlayers';
import { LeaderboardPlayerModal } from '@/modules/billiard/utils/leaderboardPlayerModal';
import { useFinishScreen } from '../hooks/useFinishScreen';
import { finishStyles } from '../styles/finishStyles';

export function finishScreen() {
  const {
    player1,
    player2,
    scorePlayer1,
    scorePlayer2,
    winner,
    formattedTime,
  } = useFinishScreen();

  const [playerModalVisible, setPlayerModalVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const router = useRouter();
  const players = usePlayers();

  const {
    selectedPlayer,
    setSelectedPlayer,
    recentMatches,
    allMatches,
    activeTab,
    setActiveTab,
    showAllMatchesModal,
    setShowAllMatchesModal,
    handlePlayerPress,
    handleShowAllMatches,
  } = usePlayerModal(players);

  useEffect(() => {
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const onPlayerPress = async (player: Player) => {
    await handlePlayerPress(player);
    setPlayerModalVisible(true);
  };

  const closeModal = () => {
    setPlayerModalVisible(false);
    setSelectedPlayer(null);
  };

  const goToLeaderboard = () => {
    router.push('/leaderboard');
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <>
      <ScrollView contentContainerStyle={finishStyles.scrollContainer}>
        <Animated.View 
          style={[
            finishStyles.root,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Animated.View 
            style={[
              finishStyles.header,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <Text style={finishStyles.matchCompleteText}>🎯 Match Complete</Text>
          </Animated.View>

          <Animated.View 
            style={[
              finishStyles.scoreContainer,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <Text style={finishStyles.finalScore}>{scorePlayer1} : {scorePlayer2}</Text>
            {formattedTime && (
              <Text style={finishStyles.timeUsed}>⏱ {formattedTime}</Text>
            )}
          </Animated.View>

          <Animated.View 
            style={[
              finishStyles.winnerSection,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <Animated.Text 
              style={[
                finishStyles.trophyIcon,
                { transform: [{ rotate: spin }] }
              ]}
            >
              🏆
            </Animated.Text>
            <Text style={finishStyles.winnerTitle}>Champion</Text>
            {winner?.avatar && (
              <TouchableOpacity onPress={() => winner && onPlayerPress(winner)}>
                <Image source={winner.avatar} style={finishStyles.winnerAvatar} />
              </TouchableOpacity>
            )}
            <Text style={finishStyles.winnerName}>{winner?.name}</Text>
          </Animated.View>

          <View style={finishStyles.playersSection}>
            <Text style={finishStyles.playersTitle}>Match Players</Text>
            
            <View style={finishStyles.playersRow}>
              <Animated.View 
                style={[
                  finishStyles.playerCard,
                  winner?.name === player1?.name && finishStyles.winnerCard,
                  { transform: [{ scale: scaleAnim }] }
                ]}
              >
                <TouchableOpacity onPress={() => player1 && onPlayerPress(player1)}>
                  {player1?.avatar && (
                    <Image source={player1.avatar} style={finishStyles.playerAvatar} />
                  )}
                  <Text style={finishStyles.playerName}>{player1?.name}</Text>
                  <View style={finishStyles.scoreCircle}>
                    <Text style={finishStyles.playerScore}>{scorePlayer1}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>

              <Text style={finishStyles.vsText}>VS</Text>

              <Animated.View 
                style={[
                  finishStyles.playerCard,
                  winner?.name === player2?.name && finishStyles.winnerCard,
                  { transform: [{ scale: scaleAnim }] }
                ]}
              >
                <TouchableOpacity onPress={() => player2 && onPlayerPress(player2)}>
                  {player2?.avatar && (
                    <Image source={player2.avatar} style={finishStyles.playerAvatar} />
                  )}
                  <Text style={finishStyles.playerName}>{player2?.name}</Text>
                  <View style={finishStyles.scoreCircle}>
                    <Text style={finishStyles.playerScore}>{scorePlayer2}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={finishStyles.leaderboardBtn}
              onPress={goToLeaderboard}
              activeOpacity={0.8}
            >
              <Text style={finishStyles.leaderboardBtnText}>🏅 View Leaderboard</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>

      <LeaderboardPlayerModal
        visible={playerModalVisible}
        onClose={closeModal}
        selectedPlayer={selectedPlayer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recentMatches={recentMatches}
        allMatches={allMatches}
        showAllMatchesModal={showAllMatchesModal}
        setShowAllMatchesModal={setShowAllMatchesModal}
        onShowAllMatches={handleShowAllMatches}
      />
    </>
  );
}
