import { MatchSearchBar } from "@/shared/components/common/matchSearchBar";
import React from "react";
import { Animated } from "react-native";
import { historyStyles } from "../styles";

type HistorySearchProps = {
  fadeAnim: Animated.AnimatedInterpolation<string | number> | Animated.Value;
  slideAnim: Animated.AnimatedInterpolation<string | number> | Animated.Value;
  scaleAnim: Animated.AnimatedInterpolation<string | number> | Animated.Value;
  searchText: string;
  setSearchText: (text: string) => void;
  dateText: string;
  setDateText: (text: string) => void;
};

export function HistorySearch({
  fadeAnim,
  slideAnim,
  scaleAnim,
  searchText,
  setSearchText,
  dateText,
  setDateText,
}: HistorySearchProps) {
  return (
    <Animated.View
      style={[
        historyStyles.searchContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <MatchSearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        dateText={dateText}
        setDateText={setDateText}
        showDateInput={true}
        showFilterIcon={false}
      />
    </Animated.View>
  );
}
