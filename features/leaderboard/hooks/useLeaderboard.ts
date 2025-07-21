import { avatars } from '@/const/images';
import { leaderboardAtom, leaderboardLoadingAtom } from '@/features/leaderboard/state/leaderboardAtoms';
import { db } from '@/lib/firebase';
import { updateAllPlayersPoints } from '@/lib/services/updateAllPlayerPoints';
import { usePlayers } from '@/lib/usePlayers';
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
      await updateAllPlayersPoints();
      const snapshot = await getDocs(collection(db, 'players'));
      const data: { id: string; name: any; points: any; avatar: any; }[] = [];

      snapshot.forEach(docSnap => {
        const player = docSnap.data();
        if (!player.name) return;

        data.push({
          id: docSnap.id,
          name: player.name,
          points: player.points ?? 0,
          avatar: player.avatar ? avatars[player.avatar] : null,
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