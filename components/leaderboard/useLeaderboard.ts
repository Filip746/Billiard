import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useLeaderboard() {
  const [users, setUsers] = useState<{ name: string; points: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersCol = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCol);
        const usersList: { name: string; points: number }[] = [];

        usersSnapshot.forEach(doc => {
          const data = doc.data();
          usersList.push({
            name: data.name || 'No Name',
            points: data.points || 0,
          });
        });

        usersList.sort((a, b) => b.points - a.points);
        setUsers(usersList);
      } catch (e) {
        setError('Failed to load leaderboard data');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}
