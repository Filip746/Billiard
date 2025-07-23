import { LeaderboardEntry } from "@/shared/types/leaderboard";
import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { leaderboardStyles } from "../styles";

type LeaderboardListItemProps = {
  item: LeaderboardEntry;
  index: number;
  onNamePress: (entry: LeaderboardEntry) => void;
};

const rankEmoji: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

const rankIcon: Record<number, string> = {
  1: "👑",
  2: "👑",
  3: "👑",
  4: "⭐",
  5: "⭐",
};

const podiumStyles: Record<number, object> = {
  1: leaderboardStyles.firstPlace,
  2: leaderboardStyles.secondPlace,
  3: leaderboardStyles.thirdPlace,
};

export function LeaderboardListItem({
  item,
  index,
  onNamePress,
}: LeaderboardListItemProps) {
  const rank = index + 1;
  const isTopThree = rank <= 3;

  const emoji = rankEmoji[rank] ?? "🏅";
  const icon = rankIcon[rank] ?? "💪";
  const podiumStyle = podiumStyles[rank] ?? {};

  return (
    <Animated.View style={[leaderboardStyles.itemContainer, podiumStyle]}>
      <View style={leaderboardStyles.rankSection}>
        <Text
          style={[
            leaderboardStyles.rankNumber,
            isTopThree && leaderboardStyles.topThreeRank,
          ]}
        >
          {rank}
        </Text>
        <Text style={leaderboardStyles.rankEmoji}>{emoji}</Text>
      </View>

      <View style={leaderboardStyles.avatarSection}>
        {item.avatar ? (
          <Image
            source={item.avatar}
            style={[
              leaderboardStyles.avatar,
              isTopThree && leaderboardStyles.topThreeAvatar,
            ]}
          />
        ) : (
          <View
            style={[
              leaderboardStyles.avatarPlaceholder,
              isTopThree && leaderboardStyles.topThreeAvatar,
            ]}
          >
            <Text style={leaderboardStyles.avatarIcon}>👤</Text>
          </View>
        )}
        {isTopThree && <Text style={leaderboardStyles.crownIcon}>{icon}</Text>}
      </View>

      <TouchableOpacity
        style={leaderboardStyles.playerInfo}
        onPress={() => onNamePress(item)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            leaderboardStyles.name,
            isTopThree && leaderboardStyles.topThreeName,
          ]}
        >
          {item.name}
        </Text>
        <Text style={leaderboardStyles.tapHint}>Tap for details</Text>
      </TouchableOpacity>

      <View style={leaderboardStyles.scoreSection}>
        <Text
          style={[
            leaderboardStyles.points,
            isTopThree && leaderboardStyles.topThreePoints,
          ]}
        >
          {item.points.toFixed(2)}%
        </Text>
        <View
          style={[
            leaderboardStyles.progressBar,
            isTopThree && leaderboardStyles.topThreeProgress,
          ]}
        >
          <Animated.View
            style={[
              leaderboardStyles.progressFill,
              {
                width: `${item.points * 100}%`,
                backgroundColor: isTopThree ? "#FFD700" : "#4CAF50",
              },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
}
