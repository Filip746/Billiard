import { leaderboardModalStyles } from '@/features/leaderboard/styles/leaderboardStyles';
import { ViewMatch } from '@/shared/types/viewMatch';
import React from 'react';
import { Text, View } from 'react-native';

type MatchListProps = {
  matches: ViewMatch[];
  emptyText?: string;
};

export const MatchList: React.FC<MatchListProps> = ({ matches, emptyText = "No matches." }) => {
  if (!matches.length) {
    return (
      <Text style={leaderboardModalStyles.noMatchesText}>{emptyText}</Text>
    );
  }
  return (
    <>
      {matches.map((match, idx) => (
        <View key={idx} style={leaderboardModalStyles.matchRow}>
          <Text style={leaderboardModalStyles.matchOpponent}>
            v {match.opponentName || "Unknown"}
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
      ))}
    </>
  );
};
