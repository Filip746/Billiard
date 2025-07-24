import { db } from '@/shared/services/firebase';
import { Match } from '@/shared/types/match';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where
} from 'firebase/firestore';

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
  const q1 = query(collection(db, 'matches'), where('player1Id', '==', userId));
  const q2 = query(collection(db, 'matches'), where('player2Id', '==', userId));
  const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

  let matches: any[] = [];
  snap1.forEach(doc => matches.push(doc.data()));
  snap2.forEach(doc => matches.push(doc.data()));
  matches = matches.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

  if (year || month) {
    matches = matches.filter(m => {
      const d = new Date(m.createdAt.seconds * 1000);
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
