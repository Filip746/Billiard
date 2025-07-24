import {
  LeaderboardHeader,
  LeaderboardList,
  LeaderboardLoading,
  LeaderboardSearchFilter,
  leaderboardStyles,
  useLeaderboard,
} from "@/features/leaderboard";
import { usePlayerModal } from "@/features/leaderboard/hooks/usePlayerModal";

import { useScreenOrientationLock } from "@/features/finishScreen/hooks/useScreenOrientationLock";
import { useLeaderboardAnimations } from "@/features/leaderboard/hooks/useLeaderboardAnimations";
import { LeaderboardPlayerModal } from "@/shared/components/common/leaderboardPlayerModal";
import { usePlayers } from "@/shared/hooks";
import { LeaderboardEntry } from "@/shared/types/leaderboard";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState } from "react";
import { View } from "react-native";

export default function Leaderboard() {
  useScreenOrientationLock(ScreenOrientation.OrientationLock.PORTRAIT);

  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateFilter, setDateFilter] = useState({ year: "", month: "" });
  const [showFilterBox, setShowFilterBox] = useState(false);

  const { fadeAnim, slideAnim, scaleAnim, listAnim } =
    useLeaderboardAnimations();

  const players = usePlayers();
  const { leaderboard, loading } = useLeaderboard(dateFilter);

  const {
    selectedPlayer,
    recentMatches,
    allMatches,
    activeTab,
    setActiveTab,
    showAllMatchesModal,
    setShowAllMatchesModal,
    handlePlayerPress,
    handleShowAllMatches,
  } = usePlayerModal(players);

  const searchedLeaderboard = leaderboard.filter((player) =>
    player.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  const handleNamePress = async (entry: LeaderboardEntry): Promise<void> => {
    const player = players.find(
      (p) => p.id === entry.id || p.name === entry.name
    );
    if (player) await handlePlayerPress(player);
    setModalVisible(true);
  };

  return (
    <View style={leaderboardStyles.container}>
      <LeaderboardHeader
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
        scaleAnim={scaleAnim}
      />

      <LeaderboardSearchFilter
        searchText={searchText}
        setSearchText={setSearchText}
        showFilterBox={showFilterBox}
        setShowFilterBox={setShowFilterBox}
        setDateFilter={setDateFilter}
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
      />

      {loading ? (
        <LeaderboardLoading fadeAnim={fadeAnim} />
      ) : (
        <LeaderboardList
          leaderboard={searchedLeaderboard}
          listAnim={listAnim}
          onNamePress={handleNamePress}
        />
      )}

      <LeaderboardPlayerModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        selectedPlayer={selectedPlayer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recentMatches={recentMatches}
        allMatches={allMatches}
        showAllMatchesModal={showAllMatchesModal}
        setShowAllMatchesModal={setShowAllMatchesModal}
        onShowAllMatches={handleShowAllMatches}
      />
    </View>
  );
}
