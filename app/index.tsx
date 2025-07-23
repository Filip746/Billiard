import {
  MatchReadySection,
  PlayerListSection,
  PlayerSelectionHeader,
  TableSetupSection,
} from '@/features/playerSelection/components';
import { usePlayerSelection, usePlayerSelectionAnimations } from '@/features/playerSelection/hooks';
import { playerStyles } from '@/features/playerSelection/styles';
import { usePlayers } from '@/shared/hooks';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

const MAX_MINUTES = 60;
const timeOptions = Array.from(
  { length: MAX_MINUTES / 5 },
  (_, i) => (i + 1) * 5
);

export default function HomeScreen() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  const {
    selectedPlayer1, setSelectedPlayer1,
    selectedPlayer2, setSelectedPlayer2,
    selectedMinutes, handleTimeChange,
    scoreLimit, setScoreLimit,
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

  const {
    fadeAnim,
    slideAnim,
    scaleAnim,
    headerAnim,
    pulseAnim,
    bounceAnim,
  } = usePlayerSelectionAnimations(isReady);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={playerStyles.container} showsVerticalScrollIndicator={false}>
        <PlayerSelectionHeader fadeAnim={fadeAnim} headerAnim={headerAnim} pulseAnim={pulseAnim} />
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
        <TableSetupSection
          fadeAnim={fadeAnim}
          scaleAnim={scaleAnim}
          timeOptions={timeOptions}
          selectedMinutes={selectedMinutes}
          handleTimeChange={handleTimeChange}
          scoreLimit={scoreLimit}
          setScoreLimit={setScoreLimit}
        />
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
      </ScrollView>
    </SafeAreaView>
  );
}
