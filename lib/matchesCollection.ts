import { db } from '@/lib/firebase';
import { addDoc, collection, doc, getDoc, Timestamp } from 'firebase/firestore';

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

export async function getLastMatchesForUser(userId: string, n: number = 5) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists() || !userSnap.data().matches) return [];
  const matches = userSnap.data().matches;
  return matches.slice(-n).reverse();
}

export async function getAllMatchesForUser(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists() || !userSnap.data().matches) return [];
  const matches = userSnap.data().matches;
  return [...matches].reverse();
}