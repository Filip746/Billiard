import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function getMatchesForUser(userId: string, n?: number) {
  const q1 = query(collection(db, 'matches'), where('player1Id', '==', userId));
  const q2 = query(collection(db, 'matches'), where('player2Id', '==', userId));

  const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

  let matches: any[] = [];
  snap1.forEach(doc => matches.push(doc.data()));
  snap2.forEach(doc => matches.push(doc.data()));

  matches = matches.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

  if (typeof n === 'number') {
    return matches.slice(0, n);
  }
  return matches;
}
