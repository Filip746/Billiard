import { db } from '@/lib/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

export async function updateAllPlayersPoints() {
  const playersSnapshot = await getDocs(collection(db, 'players'));
  const matchesSnapshot = await getDocs(collection(db, 'matches'));

  playersSnapshot.forEach(async (playerDoc) => {
    const playerId = playerDoc.id;
    const playerMatches = matchesSnapshot.docs.filter(
      matchDoc =>
        matchDoc.data().player1Id === playerId ||
        matchDoc.data().player2Id === playerId
    );

    let wins = 0;
    playerMatches.forEach(match => {
      const m = match.data();
      if (
        (m.player1Id === playerId && m.scorePlayer1 > m.scorePlayer2) ||
        (m.player2Id === playerId && m.scorePlayer2 > m.scorePlayer1)
      ) {
        wins++;
      }
    });

    const points = playerMatches.length > 0 ? wins / playerMatches.length : 0;
    await updateDoc(doc(db, 'players', playerId), { points });
  });
}
