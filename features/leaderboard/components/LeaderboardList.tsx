import { LeaderboardEntry } from "@/shared/types/leaderboard";
import React from "react";
import { Animated, FlatList, View } from "react-native";
import { leaderboardStyles } from "../styles";
import { LeaderboardListItem } from "./LeaderboardListItem";

type LeaderboardListProps = {
  leaderboard: LeaderboardEntry[];
  listAnim: Animated.Value;
  onNamePress: (entry: LeaderboardEntry) => void;
};

export function LeaderboardList({
  leaderboard,
  listAnim,
  onNamePress,
}: LeaderboardListProps) {
  return (
    <Animated.View style={{ opacity: listAnim, flex: 1 }}>
      <FlatList
        data={leaderboard}
        renderItem={({ item, index }) => (
          <LeaderboardListItem
            item={item}
            index={index}
            onNamePress={onNamePress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={leaderboardStyles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={leaderboardStyles.separator} />
        )}
      />
    </Animated.View>
  );
}
