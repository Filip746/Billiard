import { db } from '@/lib/firebase';
import { collection, doc, DocumentData, getDocs, updateDoc } from 'firebase/firestore';

export async function addMatchForUser(playerId: number) {
  const matchesSnap = await getDocs(collection(db, 'matches'));
  const playerMatches: DocumentData[] = [];
  matchesSnap.forEach(doc => {
    const m = doc.data();
    if (m.player1Id == playerId.toString() || m.player2Id == playerId.toString())
      playerMatches.push(m);
  });

  const wins = playerMatches.reduce((acc, match) => {
    let result = 0;
    if (match.player1Id == playerId.toString() && match.scorePlayer1 > match.scorePlayer2) result = 1;
    if (match.player2Id == playerId.toString() && match.scorePlayer2 > match.scorePlayer1) result = 1;
    return acc + result;
  }, 0);

  const total = playerMatches.length;
  const points = total > 0 ? wins / total : 0;

  await updateDoc(doc(db, 'players', playerId.toString()), { points });
}
