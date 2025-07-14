import { usePlayers } from '@/lib/usePlayers';
import {
  elapsedTimeAtom,
  scorePlayer1Atom,
  scorePlayer2Atom,
} from '@/state/gameAtoms';
import {
  selectedPlayer1Atom,
  selectedPlayer2Atom,
} from '@/state/playerSelectionAtoms';
import { useAtom } from 'jotai';

export function useFinishScreen() {
  const players = usePlayers();

  const [selectedPlayer1] = useAtom(selectedPlayer1Atom);
  const [selectedPlayer2] = useAtom(selectedPlayer2Atom);
  const [scorePlayer1] = useAtom(scorePlayer1Atom);
  const [scorePlayer2] = useAtom(scorePlayer2Atom);
  const [elapsedTime] = useAtom(elapsedTimeAtom);

  const player1 = players.find(p => p.id === selectedPlayer1);
  const player2 = players.find(p => p.id === selectedPlayer2);

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
