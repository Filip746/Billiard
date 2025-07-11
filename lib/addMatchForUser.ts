import { players } from '@/const/players';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function addMatchForUser(
  userId: string,
  userName: string,
  opponentId: string,
  result: string,
  dateString: string
) {
  const userRef = doc(db, 'users', userId);

  const player = players.find(p => p.id === Number(userId));
  const playerId = player?.id || null;

  await setDoc(userRef, { name: userName, playerId }, { merge: true });

  const userSnap = await getDoc(userRef);
  let matches = userSnap.exists() && userSnap.data().matches ? userSnap.data().matches : [];

  const newMatch = {
    opponentId,
    result,
    date: dateString,
  };

  matches = [...matches, newMatch];

  const wins = matches.reduce((acc: number, match: any) => {
    if (!match.result) return acc;
    const [score1, score2] = match.result.split(' : ').map(Number);
    return score1 > score2 ? acc + 1 : acc;
  }, 0);

  const totalMatches = matches.length;

  const points = totalMatches > 0 ? wins / totalMatches : 0;

  await updateDoc(userRef, {
    matches,
    points,
  });
}
