import { db } from '@/shared/services/firebase';
import { Match } from '@/shared/types/match';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  or,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where
} from 'firebase/firestore';
import { toDate } from '../utils/toDateStr';

export async function addMatch(match: Omit<Match, 'createdAt'>) {
  return await addDoc(collection(db, 'matches'), {
    ...match,
    createdAt: Timestamp.now(),
  });
}

export async function fetchMatchesPage(pageSize = 10, lastDoc: QueryDocumentSnapshot<DocumentData> | null = null, all = false) {
  let q = query(
    collection(db, 'matches'),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );

  if (lastDoc) {
    q = query(
      collection(db, 'matches'),
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(pageSize)
    );
  }

  if (all) {
    q = query(
      collection(db, 'matches'),
      orderBy('createdAt', 'desc')
    );
  }

  const snapshot = await getDocs(q);
  return {
    matches: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
    hasMore: snapshot.docs.length === pageSize,
  };
}

export async function getMatchesForUser(
  userId: string, 
  n?: number,
  year?: string,
  month?: string
) {
  const q = query(
    collection(db, 'matches'),
    or(
      where('player1Id', '==', userId),
      where('player2Id', '==', userId),
    )
  );
  const snapshot = await getDocs(q);
  let matches = snapshot.docs.map(doc => doc.data() as Match);
  matches = matches.sort(
    (a, b) => toDate(b.createdAt).getTime() - toDate(a.createdAt).getTime()
  );
  if (year || month) {
    matches = matches.filter(m => {
      const d = toDate(m.createdAt);
      const mYear = d.getFullYear().toString();
      const mMonth = (d.getMonth() + 1).toString().padStart(2, "0");
      const byYear = year ? mYear === year : true;
      const byMonth = month ? mMonth === month : true;
      return byYear && byMonth;
    });
  }

  if (typeof n === 'number') {
    return matches.slice(0, n);
  }
  return matches;
}
