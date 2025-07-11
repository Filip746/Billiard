import { players } from '@/const/players';
import { getMatchesForUser } from '@/lib/services/userMatchService';
import { LeaderboardPlayerModal } from '@/modules/billiard/utils/leaderboardPlayerModal';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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

  const router = useRouter();

  const goToLeaderboard = () => {
    router.push('/leaderboard');
  };

  const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'about'>('stats');
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [showAllMatchesModal, setShowAllMatchesModal] = useState(false);

  const handlePlayerPress = async (player: Player) => {
      setSelectedPlayer(player);
      setPlayerModalVisible(true);
      setActiveTab('stats');
      const matches = await getMatchesForUser(String(player.id), 5);
      setRecentMatches(matches);
    };

  const handleShowAllMatches = async () => {
    if (selectedPlayer) {
      const matches = await getMatchesForUser(String(selectedPlayer.id));
      setAllMatches(matches);
      setShowAllMatchesModal(true);
    }
  };
  return (
    <>
    <View style={finishStyles.root}>
      <View style={finishStyles.playerColumn}>
        <TouchableOpacity onPress={() => player1 && handlePlayerPress(player1)}>
          <View style={finishStyles.cardShadow}>
            <Image source={player1?.avatar} style={finishStyles.avatar} />
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
          <Image source={winner?.avatar} style={finishStyles.winnerAvatar} />
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
        <TouchableOpacity onPress={() => player2 && handlePlayerPress(player2)}>
          <View style={finishStyles.cardShadow}>
            <Image source={player2?.avatar} style={finishStyles.avatar} />
            <Text style={finishStyles.playerName}>{player2?.name}</Text>
            <Text style={finishStyles.score}>{scorePlayer2}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
        players={players} /></>
  );
}
