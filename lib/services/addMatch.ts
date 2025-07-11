import { db } from '@/lib/firebase';
import { Match } from '@/types/match';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export async function addMatch(match: Omit<Match, 'createdAt'>) {
  return await addDoc(collection(db, 'matches'), {
    ...match,
    createdAt: Timestamp.now(),
  });
}

