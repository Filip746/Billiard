import { db } from '@/lib/firebase';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';

export async function fetchMatchesPage(pageSize = 10, lastDoc = null, all = false) {
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
      orderBy('createdAt', 'desc'),
    );
  }
  const snapshot = await getDocs(q);
  return {
    matches: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
    hasMore: snapshot.docs.length === pageSize,
  };
}
