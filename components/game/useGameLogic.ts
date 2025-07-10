import { players } from '@/const/players';
import { useCountdown } from '@/hooks/useCountdown';
import { addMatch } from '@/lib/matchesCollection';
import { saveMatchForUser } from '@/lib/saveMatchForUser';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export function useGameLogic() {
  const { player1Id, player2Id, timeLimitMinutes, scoreLimit } = useLocalSearchParams<{
    player1Id: string;
    player2Id: string;
    timeLimitMinutes: string;
    scoreLimit: string;
  }>();

  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [_, setElapsedTime] = useState<number | null>(null);

  const initialEndTime = new Date().getTime() + Number(timeLimitMinutes) * 60 * 1000;
  const [timeLeft] = useCountdown(initialEndTime);

  const player1 = players.find(p => p.id === Number(player1Id));
  const player2 = players.find(p => p.id === Number(player2Id));

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const increaseScore1 = () => {
    if (scorePlayer1 < Number(scoreLimit)) {
      setScorePlayer1(prev => prev + 1);
    }
  };

  const increaseScore2 = () => {
    if (scorePlayer2 < Number(scoreLimit)) {
      setScorePlayer2(prev => prev + 1);
    }
  };

  const handleFinishMatch = async () => {
    const totalTimeMs = Number(timeLimitMinutes) * 60 * 1000;
    const timeUsed = totalTimeMs - timeLeft;
    setElapsedTime(timeUsed);

    try {
      await addMatch({
        player1Id,
        player2Id,
        player1Name: player1?.name || '',
        player2Name: player2?.name || '',
        scorePlayer1,
        scorePlayer2,
        timeUsedMs: timeUsed,
      });

      const today = new Date();
      const dateString = `${today.getDate()}. ${today.getMonth()}. ${today.getFullYear()}.`;

      await saveMatchForUser(
        player1Id,
        player1?.name || '',
        player2Id,
        `${scorePlayer1} : ${scorePlayer2}`,
        dateString
      );

      await saveMatchForUser(
        player2Id,
        player2?.name || '',
        player1Id,
        `${scorePlayer2} : ${scorePlayer1}`,
        dateString
      );

      console.log('Match saved');
    } catch (error) {
      console.error('Error saving match:', error);
    }

    router.push({
      pathname: '/finish',
      params: {
        scorePlayer1,
        scorePlayer2,
        player1Id,
        player2Id,
        elapsedTime: timeUsed,
      },
    });
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
    scoreLimit
  };
}
