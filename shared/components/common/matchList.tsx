import { leaderboardModalStyles } from "@/features/leaderboard/styles/leaderboardStyles";
import { ViewMatch } from "@/shared/types/viewMatch";
import React from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";

type MatchListProps = {
  matches: ViewMatch[];
  emptyText?: string;
};

export const MatchList: React.FC<MatchListProps> = ({
  matches,
  emptyText = "No matches.",
}) => {
  const renderItem = ({ item }: ListRenderItemInfo<ViewMatch>) => (
    <View style={leaderboardModalStyles.matchRow}>
      <Text style={leaderboardModalStyles.matchOpponent}>
        v {item.opponentName || "Unknown"}
      </Text>
      <Text
        style={{
          width: 60,
          textAlign: "center",
          color: item.win ? "#28a745" : "#d32f2f",
          fontWeight: item.win ? "bold" : "600",
        }}
      >
        {item.scoreSelf} : {item.scoreOpponent}
      </Text>
      <Text style={leaderboardModalStyles.matchDate}>{item.date}</Text>
      <View
        style={[
          leaderboardModalStyles.winLoseBox,
          item.win ? leaderboardModalStyles.win : leaderboardModalStyles.lose,
        ]}
      >
        <Text style={leaderboardModalStyles.winLoseText}>
          {item.win ? "W" : "L"}
        </Text>
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <Text style={leaderboardModalStyles.noMatchesText}>{emptyText}</Text>
  );

  return (
    <FlatList
      data={matches}
      renderItem={renderItem}
      keyExtractor={(_, idx) => idx.toString()}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        matches.length === 0
          ? { flexGrow: 1, justifyContent: "center", alignItems: "center" }
          : undefined
      }
    />
  );
};
