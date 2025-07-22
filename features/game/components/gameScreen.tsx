import { billiard } from '@/const/images';
import { LeaderboardPlayerModal } from '@/shared/components/common/leaderboardPlayerModal';
import { usePlayerModal } from '@/shared/hooks/usePlayerModal';
import { usePlayers } from '@/shared/hooks/usePlayers';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  ImageBackground
} from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { gameStyles } from '../styles/gameStyles';
import { GameCenter } from './GameCenter';
import GameSummaryModal from './GameSummaryModal';
import PlayerCard from './PlayerCard';

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
        <PlayerCard
          player={player1}
          badge="P1"
          onPress={onPlayerPress}
          animStyle={{
            transform: [
              { translateX: slideLeftAnim },
              { scale: pulseAnim }
            ]
          }}
        />
        
        <GameCenter
          scorePlayer1={scorePlayer1}
          setScorePlayer1={setScorePlayer1}
          scorePlayer2={scorePlayer2}
          setScorePlayer2={setScorePlayer2}
          scoreLimit={scoreLimit}
          spin={spin}
          minutes={minutes}
          seconds={seconds}
          timerPulseAnim={timerPulseAnim}
          shouldShowFinish={shouldShowFinish}
          finishButtonAnim={finishButtonAnim}
          scaleAnim={scaleAnim}
          onFinishPress={() => setModalVisible(true)}
        />
        
        <PlayerCard
          player={player2}
          badge="P2"
          onPress={onPlayerPress}
          animStyle={{
            transform: [
              { translateX: slideRightAnim },
              { scale: pulseAnim }
            ]
          }}
        />
      </Animated.View>

      <GameSummaryModal
        isModalVisible={isModalVisible}
        onConfirm={() => { setModalVisible(false); handleFinishMatch(); }}
        onCancel={() => setModalVisible(false)}
        player1={player1}
        player2={player2}
        score1={scorePlayer1}
        score2={scorePlayer2}
        animStyle={{ transform: [{ scale: scaleAnim }] }}
      />

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
