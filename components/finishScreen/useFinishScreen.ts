import { usePlayers } from '@/lib/usePlayers';
import { useLocalSearchParams } from 'expo-router';

export function useFinishScreen() {
  const { scorePlayer1, scorePlayer2, player1Id, player2Id, elapsedTime } = useLocalSearchParams<{
    scorePlayer1: string,
    scorePlayer2: string,
    player1Id: string,
    player2Id: string,
    elapsedTime: string,
  }>();
  const players = usePlayers();

  const player1 = players.find(p => p.id === Number(player1Id));
  const player2 = players.find(p => p.id === Number(player2Id));

  const winner =
    Number(scorePlayer1) > Number(scorePlayer2)
      ? player1
      : player2;

  const formattedTime = elapsedTime
    ? `${Math.floor(Number(elapsedTime) / 60000)}:${(Math.floor((Number(elapsedTime) % 60000) / 1000) + 1)
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
