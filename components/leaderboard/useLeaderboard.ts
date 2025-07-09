import { players } from '@/const/players';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type LeaderboardEntry = {
  id: string;
  name: string;
  points: number;
  avatar: any;
};

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const data: LeaderboardEntry[] = [];

      snapshot.forEach(docSnap => {
        const user = docSnap.data();
        if (!user.name) return;

        // Pronađi igrača po playerId ili name
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
    } finally {
      setLoading(false);
    }
  };

  return { leaderboard, loading };
}
