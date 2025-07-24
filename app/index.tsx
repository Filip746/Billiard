import { useScreenOrientationLock } from "@/features/finishScreen/hooks/useScreenOrientationLock";
import {
  MatchReadySection,
  PlayerListSection,
  PlayerSelectionHeader,
  TableSetupSection,
} from "@/features/playerSelection/components";
import {
  usePlayerSelection,
  usePlayerSelectionAnimations,
} from "@/features/playerSelection/hooks";
import { playerStyles } from "@/features/playerSelection/styles";
import { usePlayers } from "@/shared/hooks";
import { usePlayersListener } from "@/shared/hooks/usePlayersListener";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { FlatList, SafeAreaView } from "react-native";

const MAX_MINUTES = 60;
const timeOptions = Array.from(
  { length: MAX_MINUTES / 5 },
  (_, i) => (i + 1) * 5
);

export default function HomeScreen() {
  usePlayersListener();
  useScreenOrientationLock(ScreenOrientation.OrientationLock.PORTRAIT);

  const {
    selectedPlayer1,
    setSelectedPlayer1,
    selectedPlayer2,
    setSelectedPlayer2,
    selectedMinutes,
    handleTimeChange,
    scoreLimit,
    setScoreLimit,
    startMatch,
  } = usePlayerSelection();
  const players = usePlayers();

  const isReady = Boolean(
    selectedPlayer1 &&
      selectedPlayer2 &&
      selectedPlayer1 !== selectedPlayer2 &&
      selectedMinutes &&
      scoreLimit
  );

  const { fadeAnim, slideAnim, scaleAnim, headerAnim, pulseAnim, bounceAnim } =
    usePlayerSelectionAnimations(isReady);

  const screenBlocks = [
    { type: "header" },
    { type: "player1" },
    { type: "player2" },
    { type: "setup" },
    { type: "matchReady" },
  ];

  const renderBlock = ({ item }: { item: { type: string } }) => {
    switch (item.type) {
      case "header":
        return (
          <PlayerSelectionHeader
            fadeAnim={fadeAnim}
            headerAnim={headerAnim}
            pulseAnim={pulseAnim}
          />
        );
      case "player1":
        return (
          <PlayerListSection
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
            slideAnim={slideAnim}
            players={players}
            selectedId={selectedPlayer1}
            setSelected={setSelectedPlayer1}
            pulseAnim={pulseAnim}
            sectionHeader="Player 1"
            label="🥇 Player 1"
            title=""
          />
        );
      case "player2":
        return (
          <PlayerListSection
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
            slideAnim={slideAnim}
            players={players}
            selectedId={selectedPlayer2}
            setSelected={setSelectedPlayer2}
            pulseAnim={pulseAnim}
            sectionHeader="Player 2"
            label="🥈 Player 2"
            title=""
          />
        );
      case "setup":
        return (
          <TableSetupSection
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
            timeOptions={timeOptions}
            selectedMinutes={selectedMinutes}
            handleTimeChange={handleTimeChange}
            scoreLimit={scoreLimit}
            setScoreLimit={setScoreLimit}
          />
        );
      case "matchReady":
        return (
          <MatchReadySection
            fadeAnim={fadeAnim}
            bounceAnim={bounceAnim}
            players={players}
            selectedPlayer1={selectedPlayer1}
            selectedPlayer2={selectedPlayer2}
            selectedMinutes={selectedMinutes}
            scoreLimit={scoreLimit}
            startMatch={startMatch}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={screenBlocks}
        renderItem={renderBlock}
        keyExtractor={(item) => item.type}
        contentContainerStyle={playerStyles.container}
      />
    </SafeAreaView>
  );
}
