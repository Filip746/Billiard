import {
  ChampionSection,
  FinalScoreInfo,
  LeaderboardButton,
  MatchCompleteHeader,
  PlayersSection,
} from "@/features/finishScreen/components";
import {
  useFinishAnimations,
  useFinishScreen,
} from "@/features/finishScreen/hooks";
import { finishStyles } from "@/features/finishScreen/styles";
import { LeaderboardPlayerModal } from "@/shared/components/common/leaderboardPlayerModal";
import { usePlayerModal, usePlayers } from "@/shared/hooks";
import { Player } from "@/shared/types/players";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState } from "react";
import { Animated, ScrollView } from "react-native";

export default function Finish() {
  useFocusEffect(
    React.useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, [])
  );

  const {
    player1,
    player2,
    scorePlayer1,
    scorePlayer2,
    winner,
    formattedTime,
  } = useFinishScreen();

  const [playerModalVisible, setPlayerModalVisible] = useState(false);

  const { fadeAnim, slideAnim, scaleAnim, pulseAnim, spin } =
    useFinishAnimations();

  const router = useRouter();
  const players = usePlayers();

  const {
    selectedPlayer,
    setSelectedPlayer,
    recentMatches,
    allMatches,
    activeTab,
    setActiveTab,
    showAllMatchesModal,
    setShowAllMatchesModal,
    handlePlayerPress,
    handleShowAllMatches,
  } = usePlayerModal(players);

  const onPlayerPress = async (player: Player) => {
    await handlePlayerPress(player);
    setPlayerModalVisible(true);
  };

  const closeModal = () => {
    setPlayerModalVisible(false);
    setSelectedPlayer(null);
  };

  const goToLeaderboard = () => {
    router.push("/leaderboard");
  };

  if (!player1 || !player2 || !winner) return null;

  return (
    <>
      <ScrollView contentContainerStyle={finishStyles.scrollContainer}>
        <Animated.View
          style={[
            finishStyles.root,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <MatchCompleteHeader scaleAnim={scaleAnim} />
          <FinalScoreInfo
            scorePlayer1={scorePlayer1}
            scorePlayer2={scorePlayer2}
            formattedTime={formattedTime ?? undefined}
            scaleAnim={scaleAnim}
          />
          {winner && (
            <ChampionSection
              winner={winner}
              spin={spin}
              pulseAnim={pulseAnim}
              onPlayerPress={onPlayerPress}
            />
          )}
          <PlayersSection
            player1={player1}
            player2={player2}
            winner={winner}
            scaleAnim={scaleAnim}
            scorePlayer1={scorePlayer1}
            scorePlayer2={scorePlayer2}
            onPlayerPress={onPlayerPress}
          />
          <LeaderboardButton scaleAnim={scaleAnim} onPress={goToLeaderboard} />
        </Animated.View>
      </ScrollView>
      <LeaderboardPlayerModal
        visible={playerModalVisible}
        onClose={closeModal}
        selectedPlayer={selectedPlayer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recentMatches={recentMatches}
        allMatches={allMatches}
        showAllMatchesModal={showAllMatchesModal}
        setShowAllMatchesModal={setShowAllMatchesModal}
        onShowAllMatches={handleShowAllMatches}
      />
    </>
  );
}
