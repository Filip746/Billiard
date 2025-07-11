import { leaderboardModalStyles } from '@/components/leaderboard/leaderboardStyles';
import React from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Match = {
  opponentId: string;
  result: string;
  date: any;
};

type LeaderboardPlayerModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedPlayer: Player | null;
  activeTab: 'stats' | 'about';
  setActiveTab: (tab: 'stats' | 'about') => void;
  recentMatches: Match[];
  allMatches: Match[];
  showAllMatchesModal: boolean;
  setShowAllMatchesModal: (b: boolean) => void;
  onShowAllMatches: () => Promise<void>;
  players: Player[];
};

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
  players,
}: LeaderboardPlayerModalProps) {
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
              {recentMatches.length === 0 ? (
                <Text style={leaderboardModalStyles.noMatchesText}>No recent matches.</Text>
              ) : (
                recentMatches.map((match, idx) => {
                  const opponent = players.find(p => p.id === Number(match.opponentId));
                  const [score1, score2] = match.result.split(' : ').map(Number);
                  const win = score1 > score2;
                  return (
                    <View key={idx} style={leaderboardModalStyles.matchRow}>
                      <Text style={leaderboardModalStyles.matchOpponent}>
                        v {opponent?.name || 'Unknown'}
                      </Text>
                      <Text style={{
                        width: 60,
                        textAlign: 'center',
                        color: win ? '#28a745' : '#d32f2f',
                        fontWeight: win ? 'bold' : '600'
                      }}>
                        {match.result}
                      </Text>
                      <Text style={leaderboardModalStyles.matchDate}>
                        {typeof match.date === 'object' && match.date.seconds
                          ? new Date(match.date.seconds * 1000).toLocaleDateString()
                          : match.date}
                      </Text>
                      <View
                        style={[
                          leaderboardModalStyles.winLoseBox,
                          win ? leaderboardModalStyles.win : leaderboardModalStyles.lose,
                        ]}
                      >
                        <Text style={leaderboardModalStyles.winLoseText}>
                          {win ? 'W' : 'L'}
                        </Text>
                      </View>
                    </View>
                  );
                })
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
                    {allMatches.length === 0 ? (
                      <Text style={leaderboardModalStyles.noMatchesText}>No matches found.</Text>
                    ) : (
                      allMatches.map((match, idx) => {
                        const opponent = players.find(p => p.id === Number(match.opponentId));
                        const [score1, score2] = match.result.split(' : ').map(Number);
                        const win = score1 > score2;
                        let dateStr = match.date;
                        if (typeof dateStr === 'object' && dateStr.seconds) {
                          const d = new Date(dateStr.seconds * 1000);
                          dateStr = d.toLocaleDateString();
                        }
                        return (
                          <View key={idx} style={leaderboardModalStyles.matchRow}>
                            <Text style={leaderboardModalStyles.matchOpponent}>
                              v {opponent?.name || 'Unknown'}
                            </Text>
                            <Text style={{
                              width: 60,
                              textAlign: 'center',
                              color: win ? '#28a745' : '#d32f2f',
                              fontWeight: win ? 'bold' : '600'
                            }}>
                              {match.result}
                            </Text>
                            <Text style={leaderboardModalStyles.matchDate}>
                              {dateStr}
                            </Text>
                            <View
                              style={[
                                leaderboardModalStyles.winLoseBox,
                                win ? leaderboardModalStyles.win : leaderboardModalStyles.lose,
                              ]}
                            >
                              <Text style={leaderboardModalStyles.winLoseText}>
                                {win ? 'W' : 'L'}
                              </Text>
                            </View>
                          </View>
                        );
                      })
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
