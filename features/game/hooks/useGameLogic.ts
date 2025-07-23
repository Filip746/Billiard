import {
  elapsedTimeAtom,
  scorePlayer1Atom,
  scorePlayer2Atom,
} from '@/features/game/state';
import {
  endTimeAtom,
  scoreLimitAtom,
  selectedMinutesAtom,
  selectedPlayer1Atom,
  selectedPlayer2Atom,
} from '@/features/playerSelection/state/';
import { useCountdown } from '@/shared/hooks/useCountdown';
import { usePlayers } from '@/shared/hooks/usePlayers';
import { addMatch } from '@/shared/services/matchService';
import { router } from 'expo-router';
import { useAtom } from 'jotai';

export function useGameLogic() {
  const [selectedPlayer1] = useAtom(selectedPlayer1Atom);
  const [selectedPlayer2] = useAtom(selectedPlayer2Atom);
  const [selectedMinutes] = useAtom(selectedMinutesAtom);
  const [scoreLimit] = useAtom(scoreLimitAtom);
  const [endTime] = useAtom(endTimeAtom);

  const [scorePlayer1, setScorePlayer1] = useAtom(scorePlayer1Atom);
  const [scorePlayer2, setScorePlayer2] = useAtom(scorePlayer2Atom);
  const [, setElapsedTime] = useAtom(elapsedTimeAtom);

  const timeLeft = useCountdown(endTime ?? (Date.now() + (selectedMinutes ?? 0) * 60 * 1000))[0];

  const players = usePlayers();
  const player1 = players.find(p => p.id === selectedPlayer1);
  const player2 = players.find(p => p.id === selectedPlayer2);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const handleFinishMatch = async () => {
    const totalTimeMs = Number(selectedMinutes) * 60 * 1000;
    const timeUsed = totalTimeMs - timeLeft;
    setElapsedTime(timeUsed);

    try {
      await addMatch({
        player1Id: String(selectedPlayer1),
        player2Id: String(selectedPlayer2),
        player1Name: player1?.name || '',
        player2Name: player2?.name || '',
        scorePlayer1,
        scorePlayer2,
        timeUsedMs: timeUsed,
      });
    } catch (error) {
      console.error('Error saving match:', error);
    }

    router.push('/finish');
  };

  const shouldShowFinish =
    (scorePlayer1 === scoreLimit || scorePlayer2 === scoreLimit) &&
    scorePlayer1 !== scorePlayer2;

  return {
    player1,
    player2,
    scorePlayer1,
    setScorePlayer1,
    scorePlayer2,
    setScorePlayer2,
    minutes,
    seconds,
    handleFinishMatch,
    shouldShowFinish,
    scoreLimit,
  };
}

