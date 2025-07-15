import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { usePlayerModal } from '@/hooks/usePlayerModal';
import { usePlayers } from '@/lib/usePlayers';
import { LeaderboardPlayerModal } from '@/modules/billiard/utils/leaderboardPlayerModal';
import { finishStyles } from './finishStyles';
import { useFinishScreen } from './useFinishScreen';

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

  return (
    <>
      <View style={finishStyles.root}>
        <View style={finishStyles.playerColumn}>
          <TouchableOpacity onPress={() => player1 && onPlayerPress(player1)}>
            <View style={finishStyles.cardShadow}>
              {player1?.avatar && (
                <Image source={player1.avatar} style={finishStyles.avatar} />
              )}
              <Text style={finishStyles.playerName}>{player1?.name}</Text>
              <Text style={finishStyles.score}>{scorePlayer1}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={finishStyles.centerColumn}>
          <View style={finishStyles.scoreRow}>
            <Text style={finishStyles.bigScore}>{scorePlayer1}</Text>
            <Text style={finishStyles.colon}>:</Text>
            <Text style={finishStyles.bigScore}>{scorePlayer2}</Text>
          </View>
          {formattedTime && (
            <Text style={finishStyles.timeUsed}>⏱ {formattedTime}</Text>
          )}

          <View style={finishStyles.winnerBox}>
            <Text style={finishStyles.winnerLabel}>🏆 Winner</Text>
            {winner?.avatar && (
              <Image source={winner.avatar} style={finishStyles.winnerAvatar} />
            )}
            <Text style={finishStyles.winnerName}>{winner?.name}</Text>
          </View>

          <TouchableOpacity
            style={finishStyles.leaderboardBtn}
            onPress={goToLeaderboard}
            activeOpacity={0.85}
          >
            <Text style={finishStyles.leaderboardBtnText}>View Leaderboard</Text>
          </TouchableOpacity>
        </View>

        <View style={finishStyles.playerColumn}>
          <TouchableOpacity onPress={() => player2 && onPlayerPress(player2)}>
            <View style={finishStyles.cardShadow}>
              {player2?.avatar && (
                <Image source={player2.avatar} style={finishStyles.avatar} />
              )}
              <Text style={finishStyles.playerName}>{player2?.name}</Text>
              <Text style={finishStyles.score}>{scorePlayer2}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
        players={players}
      />
    </>
  );
}
