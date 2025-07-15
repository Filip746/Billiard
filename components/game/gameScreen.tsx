import { billiard } from '@/const/images';
import { ScoreSnapScroll } from '@/hooks/scoreSnapScroll';
import { usePlayerModal } from '@/hooks/usePlayerModal';
import { usePlayers } from '@/lib/usePlayers';
import { LeaderboardPlayerModal } from '@/modules/billiard/utils/leaderboardPlayerModal';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { gameStyles } from './gameStyles';
import { useGameLogic } from './useGameLogic';

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
    recentMatches,
    allMatches,
    activeTab,
    setActiveTab,
    showAllMatchesModal,
    setShowAllMatchesModal,
    handlePlayerPress,
    handleShowAllMatches,
  } = usePlayerModal(players);

  return (
    <ImageBackground source={billiard} style={gameStyles.background}>
      <View style={gameStyles.landscapeRow}>
        <TouchableOpacity onPress={() => player1 && handlePlayerPress(player1)}>
          <Image source={player1?.avatar} style={gameStyles.avatarLarge} />
          <Text style={gameStyles.playerName}>{player1?.name}</Text>
        </TouchableOpacity>
        
        <View style={gameStyles.centerBlock}>
          <View style={gameStyles.scoreSnapRow}>
            <View style={gameStyles.scoreSnapColumn}>
              <ScoreSnapScroll value={scorePlayer1} onChange={setScorePlayer1} max={Number(scoreLimit)} />
              <Text style={gameStyles.playerLabel}>Player 1</Text>
            </View>
            <View style={gameStyles.scoreSnapMiddle}>
              <Text style={gameStyles.vsLarge}>:</Text>
              <Text style={gameStyles.timerLarge}>
                {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
              </Text>
            </View>
            <View style={gameStyles.scoreSnapColumn}>
              <ScoreSnapScroll value={scorePlayer2} onChange={setScorePlayer2} max={Number(scoreLimit)} />
              <Text style={gameStyles.playerLabel}>Player 2</Text>
            </View>
          </View>

          {shouldShowFinish && (
            <TouchableOpacity
              style={gameStyles.finishButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={gameStyles.finishButtonText}>Finish Match</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity onPress={() => player2 && handlePlayerPress(player2)}>
          <Image source={player2?.avatar} style={gameStyles.avatarLarge} />
          <Text style={gameStyles.playerName}>{player2?.name}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={gameStyles.modalOverlay}>
          <View style={gameStyles.modalContent}>
            <Text style={gameStyles.modalHeader}>Match Summary</Text>

            <Text style={gameStyles.modalText}>
              {player1?.name} vs {player2?.name}
            </Text>
            <Text style={gameStyles.modalText}>
              {scorePlayer1} : {scorePlayer2}
            </Text>

            <TouchableOpacity
              style={gameStyles.confirmButton}
              onPress={() => {
                setModalVisible(false);
                handleFinishMatch(); 
              }}
            >
              <Text style={gameStyles.confirmButtonText}>Confirm & Finish</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={gameStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LeaderboardPlayerModal
        visible={playerModalVisible}
        onClose={() => setPlayerModalVisible(false)}
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
