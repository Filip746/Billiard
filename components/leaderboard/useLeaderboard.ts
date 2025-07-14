import { db } from '@/lib/firebase';
import { usePlayers } from '@/lib/usePlayers';
import { leaderboardAtom, leaderboardLoadingAtom } from '@/state/leaderboardAtoms';
import { collection, getDocs } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useAtom(leaderboardAtom);
  const [loading, setLoading] = useAtom(leaderboardLoadingAtom);
  const players = usePlayers();

  useEffect(() => {
    fetchLeaderboard();
  }, [players.length]); 

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const data: LeaderboardEntry[] = [];

      snapshot.forEach(docSnap => {
        const user = docSnap.data();
        if (!user.name) return;

        const player = players.find(
          p => p.id === user.playerId || p.name === user.name
        );

        data.push({
          id: docSnap.id,
          name: user.name,
          points: user.points ?? 0,
          avatar: user.avatar || player?.avatar || null,
        });
      });

      const sorted = data.sort((a, b) => b.points - a.points);
      setLeaderboard(sorted);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  return { leaderboard, loading };
}
