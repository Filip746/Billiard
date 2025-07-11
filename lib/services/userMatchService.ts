import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getMatchesForUser(userId: string, n?: number) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists() || !userSnap.data().matches) return [];
  const matches = userSnap.data().matches;
  const reversed = [...matches].reverse();
  if (typeof n === 'number') {
    return reversed.slice(0, n);
  }
  return reversed;
}