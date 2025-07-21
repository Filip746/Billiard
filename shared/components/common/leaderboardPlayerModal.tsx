import { leaderboardModalStyles } from '@/features/leaderboard/styles/leaderboardStyles';
import React from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type RawMatch = {
  player1Id: string;
  player2Id: string;
  player1Name: string;
  player2Name: string;
  scorePlayer1: number;
  scorePlayer2: number;
  createdAt: any;
};

type FormattedMatch = {
  opponentId: string;
  opponentName: string;
  scoreSelf: number;
  scoreOpponent: number;
  date: string;
  win: boolean;
};

type LeaderboardPlayerModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedPlayer: Player | null;
  activeTab: 'stats' | 'about';
  setActiveTab: (tab: 'stats' | 'about') => void;
  recentMatches: RawMatch[];
  allMatches: RawMatch[];
  showAllMatchesModal: boolean;
  setShowAllMatchesModal: (b: boolean) => void;
  onShowAllMatches: () => Promise<void>;
};

function formatMatches(matches: RawMatch[], selectedPlayer: Player | null): FormattedMatch[] {
  if (!selectedPlayer) return [];
  return matches.map(match => {
    const isPlayer1 = match.player1Id === String(selectedPlayer.id);
    const opponentId = isPlayer1 ? match.player2Id : match.player1Id;
    const opponentName = isPlayer1 ? match.player2Name : match.player1Name;
    const scoreSelf = isPlayer1 ? match.scorePlayer1 : match.scorePlayer2;
    const scoreOpponent = isPlayer1 ? match.scorePlayer2 : match.scorePlayer1;
    let dateStr = '';
    if (match.createdAt && typeof match.createdAt === 'object' && match.createdAt.seconds) {
      dateStr = new Date(match.createdAt.seconds * 1000).toLocaleDateString();
    } else if (typeof match.createdAt === 'string') {
      dateStr = match.createdAt;
    }
    return {
      opponentId,
      opponentName,
      scoreSelf,
      scoreOpponent,
      date: dateStr,
      win: scoreSelf > scoreOpponent,
    };
  });
}

export function LeaderboardPlayerModal({
  visible,
  onClose,
  selectedPlayer,
  activeTab,
  setActiveTab,
  recentMatches,
  allMatches,
  showAllMatchesModal,
  setShowAllMatchesModal,
  onShowAllMatches,
}: LeaderboardPlayerModalProps) {
  const formattedRecentMatches = formatMatches(recentMatches, selectedPlayer);
  const formattedAllMatches = formatMatches(allMatches, selectedPlayer);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={leaderboardModalStyles.overlay}>
        <View style={leaderboardModalStyles.container}>
          <TouchableOpacity style={leaderboardModalStyles.closeBtn} onPress={onClose}>
            <Text style={leaderboardModalStyles.closeText}>×</Text>
          </TouchableOpacity>
          {selectedPlayer && selectedPlayer.avatar ? (
            <Image source={selectedPlayer.avatar} style={leaderboardModalStyles.avatar} />
          ) : (
            <View style={leaderboardModalStyles.profileCircle} />
          )}
          <Text style={leaderboardModalStyles.playerName}>{selectedPlayer?.name}</Text>
          <View style={leaderboardModalStyles.tabRow}>
            <TouchableOpacity onPress={() => setActiveTab('stats')} style={{ flex: 1 }}>
              <Text style={activeTab === 'stats' ? leaderboardModalStyles.tabActive : leaderboardModalStyles.tabInactive}>
                Last 5 matches
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('about')} style={{ flex: 1 }}>
              <Text style={activeTab === 'about' ? leaderboardModalStyles.tabActive : leaderboardModalStyles.tabInactive}>
                All matches
              </Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'stats' ? (
            <View style={leaderboardModalStyles.matchesList}>
              {formattedRecentMatches.length === 0 ? (
                <Text style={leaderboardModalStyles.noMatchesText}>No recent matches.</Text>
              ) : (
                formattedRecentMatches.map((match, idx) => (
                  <View key={idx} style={leaderboardModalStyles.matchRow}>
                    <Text style={leaderboardModalStyles.matchOpponent}>
                      v {match.opponentName || 'Unknown'}
                    </Text>
                    <Text style={{
                      width: 60,
                      textAlign: 'center',
                      color: match.win ? '#28a745' : '#d32f2f',
                      fontWeight: match.win ? 'bold' : '600'
                    }}>
                      {match.scoreSelf} : {match.scoreOpponent}
                    </Text>
                    <Text style={leaderboardModalStyles.matchDate}>
                      {match.date}
                    </Text>
                    <View
                      style={[
                        leaderboardModalStyles.winLoseBox,
                        match.win ? leaderboardModalStyles.win : leaderboardModalStyles.lose,
                      ]}
                    >
                      <Text style={leaderboardModalStyles.winLoseText}>
                        {match.win ? 'W' : 'L'}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          ) : (
            <View style={{ width: '100%', marginTop: 20, alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1976d2',
                  paddingVertical: 10,
                  paddingHorizontal: 28,
                  borderRadius: 8,
                  marginTop: 8,
                }}
                onPress={onShowAllMatches}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Show All Matches</Text>
              </TouchableOpacity>
            </View>
          )}

          <Modal
            visible={showAllMatchesModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowAllMatchesModal(false)}
          >
            <View style={leaderboardModalStyles.overlay}>
              <View style={[leaderboardModalStyles.container, { maxHeight: '80%' }]}>
                <TouchableOpacity
                  style={leaderboardModalStyles.closeBtn}
                  onPress={() => setShowAllMatchesModal(false)}
                >
                  <Text style={leaderboardModalStyles.closeText}>×</Text>
                </TouchableOpacity>
                <Text style={[leaderboardModalStyles.playerName, { marginBottom: 12 }]}>All Matches</Text>
                <View style={{ width: '100%', maxHeight: '85%' }}>
                  <ScrollView>
                    {formattedAllMatches.length === 0 ? (
                      <Text style={leaderboardModalStyles.noMatchesText}>No matches found.</Text>
                    ) : (
                      formattedAllMatches.map((match, idx) => (
                        <View key={idx} style={leaderboardModalStyles.matchRow}>
                          <Text style={leaderboardModalStyles.matchOpponent}>
                            v {match.opponentName || 'Unknown'}
                          </Text>
                          <Text style={{
                            width: 60,
                            textAlign: 'center',
                            color: match.win ? '#28a745' : '#d32f2f',
                            fontWeight: match.win ? 'bold' : '600'
                          }}>
                            {match.scoreSelf} : {match.scoreOpponent}
                          </Text>
                          <Text style={leaderboardModalStyles.matchDate}>{match.date}</Text>
                          <View
                            style={[
                              leaderboardModalStyles.winLoseBox,
                              match.win ? leaderboardModalStyles.win : leaderboardModalStyles.lose,
                            ]}
                          >
                            <Text style={leaderboardModalStyles.winLoseText}>
                              {match.win ? 'W' : 'L'}
                            </Text>
                          </View>
                        </View>
                      ))
                    )}
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
}
