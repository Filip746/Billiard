import { db } from '@/lib/firebase';
import { addDoc, collection, getDocs, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';

export type Match = {
  player1Id: string;
  player2Id: string;
  player1Name: string;
  player2Name: string;
  scorePlayer1: number;
  scorePlayer2: number;
  timeUsedMs: number;
  createdAt: Timestamp;
};

export async function addMatch(match: Omit<Match, 'createdAt'>) {
  return await addDoc(collection(db, 'matches'), {
    ...match,
    createdAt: Timestamp.now(),
  });
}

export async function getLastMatchesForPlayer(playerId: string, n: number = 5) {
  const q = query(
    collection(db, 'matches'),
    where('player1Id', '==', playerId),
    orderBy('createdAt', 'desc'),
    limit(n)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
