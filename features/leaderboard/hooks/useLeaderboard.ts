import { usePlayers } from '@/shared/hooks/usePlayers';
import { getMatchesForUser } from '@/shared/services/matchService';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { leaderboardAtom, leaderboardLoadingAtom } from '../state';

export function useLeaderboard(dateFilter: { year: string; month: string }) {
  const [leaderboard, setLeaderboard] = useAtom(leaderboardAtom);
  const [loading, setLoading] = useAtom(leaderboardLoadingAtom);
  const players = usePlayers();

  useEffect(() => {
    fetchLeaderboard();
  }, [players.length, dateFilter.year, dateFilter.month]); 

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const playerEntries = await Promise.all(players.map(async (player) => {
        const matches = await getMatchesForUser(
          String(player.id),
          undefined,
          dateFilter.year,
          dateFilter.month
        );

        const played = matches.length;
        const won = matches.reduce((count, match) => {
          const isP1Win = match.player1Id === String(player.id) && match.scorePlayer1 > match.scorePlayer2;
          const isP2Win = match.player2Id === String(player.id) && match.scorePlayer2 > match.scorePlayer1;
          return count + (isP1Win || isP2Win ? 1 : 0);
        }, 0);
        const points = played > 0 ? (won / played) * 100 : 0;
        return {
          id: String(player.id),
          name: player.name,
          points, 
          avatar: player.avatar
        };
      }));
      const sorted = playerEntries.sort((a, b) => b.points - a.points);
      setLeaderboard(sorted);
    } catch (error) {
      setLeaderboard([]);
    }
    setLoading(false);
  };


  return { leaderboard, loading };
}