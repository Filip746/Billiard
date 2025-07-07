import { useCountdown } from '@/hooks/useCountdown';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export function usePlayerSelection(initialEndTime: number) {
  const [selectedPlayer1, setSelectedPlayer1] = useState<number | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<number | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number | null>(null);

  const router = useRouter();
  const [_, setEndTime] = useCountdown(initialEndTime);

  function handleTimeChange(value: number | null) {
    setSelectedMinutes(value);
    if (value) {
      const newEndTime = Date.now() + value * 60 * 1000;
      setEndTime(newEndTime);
    }
  }

  function startMatch() {
    router.push({
      pathname: '/game',
      params: {
        player1Id: selectedPlayer1,
        player2Id: selectedPlayer2,
        timeLimitMinutes: selectedMinutes,
        scoreLimit: scoreLimit,
      },
    });
  }

  return {
    selectedPlayer1,
    setSelectedPlayer1,
    selectedPlayer2,
    setSelectedPlayer2,
    selectedMinutes,
    setSelectedMinutes,
    scoreLimit,
    setScoreLimit,
    handleTimeChange,
    startMatch,
  };
}
