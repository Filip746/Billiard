import { billiard } from '@/const/images';
import { LeaderboardPlayerModal } from '@/shared/components/common/leaderboardPlayerModal';
import { ScoreSnapScroll } from '@/shared/hooks/scoreSnapScroll';
import { usePlayerModal } from '@/shared/hooks/usePlayerModal';
import { usePlayers } from '@/shared/hooks/usePlayers';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { gameStyles } from '../styles/gameStyles';

export function gameScreen() {
  const {
    player1,
    player2,
    scorePlayer1,
    setScorePlayer1,
    scorePlayer2,
    setScorePlayer2,
    minutes,
    seconds,
    handleFinishMatch,
    shouldShowFinish,
    scoreLimit,
  } = useGameLogic();

  const [isModalVisible, setModalVisible] = useState(false);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const players = usePlayers();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideLeftAnim = useRef(new Animated.Value(-100)).current;
  const slideRightAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerPulseAnim = useRef(new Animated.Value(1)).current;
  const finishButtonAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideLeftAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.bounce),
        useNativeDriver: true,
      }),
      Animated.timing(slideRightAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.bounce),
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
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
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

    Animated.loop(
      Animated.sequence([
        Animated.timing(timerPulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(timerPulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    if (shouldShowFinish) {
      Animated.spring(finishButtonAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      finishButtonAnim.setValue(0);
    }
  }, [shouldShowFinish]);

  const onPlayerPress = async (player: any) => {
    await handlePlayerPress(player);
    setPlayerModalVisible(true);
  };

  const closePlayerModal = () => {
    setPlayerModalVisible(false);
    setSelectedPlayer(null);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <ImageBackground source={billiard} style={gameStyles.background}>
      <Animated.View 
        style={[
          gameStyles.landscapeRow,
          { opacity: fadeAnim }
        ]}
      >
        <Animated.View
          style={[
            gameStyles.sidePlayer,
            {
              transform: [
                { translateX: slideLeftAnim },
                { scale: pulseAnim }
              ]
            }
          ]}
        >
          <TouchableOpacity 
            onPress={() => player1 && onPlayerPress(player1)}
            activeOpacity={0.8}
          >
            <Animated.View style={gameStyles.playerContainer}>
              <Image source={player1?.avatar} style={gameStyles.avatarLarge} />
              <View style={gameStyles.playerBadge}>
                <Text style={gameStyles.playerBadgeText}>P1</Text>
              </View>
            </Animated.View>
            <Text style={gameStyles.playerName}>{player1?.name}</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View 
          style={[
            gameStyles.centerBlock,
            {
              transform: [{ scale: scaleAnim }]
            }
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
                style={[
                  gameStyles.vsLarge,
                  { transform: [{ rotate: spin }] }
                ]}
              >
                ⚡
              </Animated.Text>
              <Animated.View 
                style={[
                  gameStyles.timerContainer,
                  { transform: [{ scale: timerPulseAnim }] }
                ]}
              >
                <Text style={gameStyles.timerLarge}>
                  {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
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
                transform: [{ scale: finishButtonAnim }]
              }}
            >
              <TouchableOpacity
                style={gameStyles.finishButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.9}
              >
                <Text style={gameStyles.finishButtonText}>🏁 Finish Match</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
          <View style={{ minHeight: 60, width: '100%' }} />
          )}
        </Animated.View>
        
        <Animated.View
          style={[
            gameStyles.sidePlayer,
            {
              transform: [
                { translateX: slideRightAnim },
                { scale: pulseAnim }
              ]
            }
          ]}
        >
          <TouchableOpacity 
            onPress={() => player2 && onPlayerPress(player2)}
            activeOpacity={0.8}
          >
            <Animated.View style={gameStyles.playerContainer}>
              <Image source={player2?.avatar} style={gameStyles.avatarLarge} />
              <View style={gameStyles.playerBadge}>
                <Text style={gameStyles.playerBadgeText}>P2</Text>
              </View>
            </Animated.View>
            <Text style={gameStyles.playerName}>{player2?.name}</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={gameStyles.modalOverlay}>
          <Animated.View 
            style={[
              gameStyles.modalContent,
              {
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Text style={gameStyles.modalHeader}>🏆 Match Summary</Text>

            <View style={gameStyles.modalPlayersRow}>
              <Image source={player1?.avatar} style={gameStyles.modalAvatar} />
              <Text style={gameStyles.modalVs}>VS</Text>
              <Image source={player2?.avatar} style={gameStyles.modalAvatar} />
            </View>

            <Text style={gameStyles.modalText}>
              {player1?.name} vs {player2?.name}
            </Text>
            <Text style={gameStyles.modalScore}>
              {scorePlayer1} : {scorePlayer2}
            </Text>

            <TouchableOpacity
              style={gameStyles.confirmButton}
              onPress={() => {
                setModalVisible(false);
                handleFinishMatch(); 
              }}
              activeOpacity={0.8}
            >
              <Text style={gameStyles.confirmButtonText}>✅ Confirm & Finish</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={gameStyles.cancelText}>❌ Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <LeaderboardPlayerModal
        visible={playerModalVisible}
        onClose={closePlayerModal}
        selectedPlayer={selectedPlayer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recentMatches={recentMatches}
        allMatches={allMatches}
        showAllMatchesModal={showAllMatchesModal}
        setShowAllMatchesModal={setShowAllMatchesModal}
        onShowAllMatches={handleShowAllMatches}
      />
    </ImageBackground>
  );
}
