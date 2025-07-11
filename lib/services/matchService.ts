import { db } from '@/lib/firebase';
import { Match } from '@/types/match';
import { addDoc, collection, getDocs, limit, orderBy, query, startAfter, Timestamp } from 'firebase/firestore';

export async function addMatch(match: Omit<Match, 'createdAt'>) {
  return await addDoc(collection(db, 'matches'), {
    ...match,
    createdAt: Timestamp.now(),
  });
}

export async function fetchMatchesPage(pageSize = 10, lastDoc = null) {
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
  const snapshot = await getDocs(q);
  return {
    matches: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
    hasMore: snapshot.docs.length === pageSize,
  };
}
