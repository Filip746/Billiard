import { billiard } from '@/const/images';
import { LeaderboardPlayerModal } from '@/shared/components/common/leaderboardPlayerModal';
import { usePlayerModal } from '@/shared/hooks/usePlayerModal';
import { usePlayers } from '@/shared/hooks/usePlayers';
import React, { useState } from 'react';
import {
  Animated,
  ImageBackground
} from 'react-native';
import { useGameAnimations } from '../hooks/useGameAnimations';
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

  const {
    fadeAnim,
    slideLeftAnim,
    slideRightAnim,
    scaleAnim,
    pulseAnim,
    timerPulseAnim,
    finishButtonAnim,
    spin
  } = useGameAnimations(shouldShowFinish);

  const onPlayerPress = async (player: any) => {
    await handlePlayerPress(player);
    setPlayerModalVisible(true);
  };

  const closePlayerModal = () => {
    setPlayerModalVisible(false);
    setSelectedPlayer(null);
  };
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
