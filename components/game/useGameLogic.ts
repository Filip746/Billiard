import { useCountdown } from '@/hooks/useCountdown';
import { addMatchForUser } from '@/lib/addMatchForUser';
import { addMatch } from '@/lib/services/addMatch';
import { usePlayers } from '@/lib/usePlayers';
import {
  elapsedTimeAtom,
  scorePlayer1Atom,
  scorePlayer2Atom,
} from '@/state/gameAtoms';
import {
  endTimeAtom,
  scoreLimitAtom,
  selectedMinutesAtom,
  selectedPlayer1Atom,
  selectedPlayer2Atom,
} from '@/state/playerSelectionAtoms';
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

  const increaseScore1 = () => {
    if (scorePlayer1 < Number(scoreLimit)) setScorePlayer1(prev => prev + 1);
  };
  const increaseScore2 = () => {
    if (scorePlayer2 < Number(scoreLimit)) setScorePlayer2(prev => prev + 1);
  };

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

      const today = new Date();
      const dateString = `${today.getDate()}. ${today.getMonth()}. ${today.getFullYear()}.`;

      await addMatchForUser(
        String(selectedPlayer1),
        player1?.name || '',
        String(selectedPlayer2),
        `${scorePlayer1} : ${scorePlayer2}`,
        dateString,
        players
      );
      await addMatchForUser(
        String(selectedPlayer2),
        player2?.name || '',
        String(selectedPlayer1),
        `${scorePlayer2} : ${scorePlayer1}`,
        dateString,
        players
      );
    } catch (error) {
      console.error('Error saving match:', error);
    }

    router.push('/finish');
  };

  const shouldShowFinish =
    (scorePlayer1 === Number(scoreLimit) || scorePlayer2 === Number(scoreLimit)) &&
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
    increaseScore1,
    increaseScore2,
    handleFinishMatch,
    shouldShowFinish,
    scoreLimit,
  };
}
