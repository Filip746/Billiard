import { elapsedTimeAtom, scorePlayer1Atom, scorePlayer2Atom } from '@/features/game/state/gameAtoms';
import { selectedPlayer1Atom, selectedPlayer2Atom } from '@/features/playerSelection/state/playerSelectionAtoms';
import { usePlayers } from '@/lib/usePlayers';
import { useLocalSearchParams } from 'expo-router';
import { useAtomValue } from 'jotai';

export function useFinishScreen() {
  const players = usePlayers();
  const params = useLocalSearchParams();

  const player1Id = params.player1Id ? Number(params.player1Id) : useAtomValue(selectedPlayer1Atom);
  const player2Id = params.player2Id ? Number(params.player2Id) : useAtomValue(selectedPlayer2Atom);
  const scorePlayer1 = params.scorePlayer1 ? Number(params.scorePlayer1) : useAtomValue(scorePlayer1Atom);
  const scorePlayer2 = params.scorePlayer2 ? Number(params.scorePlayer2) : useAtomValue(scorePlayer2Atom);
  const elapsedTime = params.elapsedTime
    ? Number(params.elapsedTime)
    : useAtomValue(elapsedTimeAtom);

  const player1 = players.find(p => p.id === player1Id);
  const player2 = players.find(p => p.id === player2Id);

  const winner =
    scorePlayer1 > scorePlayer2
      ? player1
      : player2;

  const formattedTime = elapsedTime !== null
    ? `${Math.floor(elapsedTime / 60000)}:${(Math.floor((elapsedTime % 60000) / 1000) + 1)
        .toString()
        .padStart(2, '0')}`
    : null;

  return {
    player1,
    player2,
    scorePlayer1,
    scorePlayer2,
    winner,
    formattedTime,
  };
}
