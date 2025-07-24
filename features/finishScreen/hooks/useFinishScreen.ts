import { elapsedTimeAtom, scorePlayer1Atom, scorePlayer2Atom } from "@/features/game";
import { selectedPlayer1Atom, selectedPlayer2Atom } from "@/features/playerSelection";
import { usePlayers } from "@/shared/hooks";
import { useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";

export function useFinishScreen() {
  const players = usePlayers();
  const params = useLocalSearchParams();

  const selectedPlayer1 = useAtomValue(selectedPlayer1Atom);
  const selectedPlayer2 = useAtomValue(selectedPlayer2Atom);
  const scoreFromAtom1 = useAtomValue(scorePlayer1Atom);
  const scoreFromAtom2 = useAtomValue(scorePlayer2Atom);
  const elapsedTimeAtomValue = useAtomValue(elapsedTimeAtom);

  const player1Id = params.player1Id ? params.player1Id : selectedPlayer1;
  const player2Id = params.player2Id ? params.player2Id : selectedPlayer2;
  const scorePlayer1 = params.scorePlayer1 ? Number(params.scorePlayer1) : scoreFromAtom1;
  const scorePlayer2 = params.scorePlayer2 ? Number(params.scorePlayer2) : scoreFromAtom2;
  const elapsedTime = params.elapsedTime ? Number(params.elapsedTime) : elapsedTimeAtomValue;

  const player1 = players.find(p => p.id === player1Id);
  const player2 = players.find(p => p.id === player2Id);

  const winner = scorePlayer1 > scorePlayer2 ? player1 : player2;

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
