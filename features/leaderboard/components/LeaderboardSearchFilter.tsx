import { MatchSearchBar } from "@/shared/components/common/matchSearchBar";
import YearMonthFilter from "@/shared/utils/filter";
import React from "react";
import { Animated } from "react-native";
import { leaderboardStyles } from "../styles";

type LeaderboardSearchFilterProps = {
  searchText: string;
  setSearchText: (value: string) => void;
  showFilterBox: boolean;
  setShowFilterBox: React.Dispatch<React.SetStateAction<boolean>>;
  setDateFilter: (value: { year: string; month: string }) => void;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
};

export function LeaderboardSearchFilter({
  searchText,
  setSearchText,
  showFilterBox,
  setShowFilterBox,
  setDateFilter,
  fadeAnim,
  slideAnim,
}: LeaderboardSearchFilterProps) {
  return (
    <Animated.View
      style={[
        leaderboardStyles.searchContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <MatchSearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onFilterPress={() => setShowFilterBox((prev) => !prev)}
      />
      {showFilterBox && <YearMonthFilter onFilterChange={setDateFilter} />}
    </Animated.View>
  );
}
