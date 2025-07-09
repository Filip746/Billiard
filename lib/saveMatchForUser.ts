import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function saveMatchForUser(
  userId: string,
  userName: string,
  opponentId: string,
  result: string,
  dateString: string
) {
  const userRef = doc(db, 'users', userId);

  
  await setDoc(userRef, { name: userName }, { merge: true });

  
  const userSnap = await getDoc(userRef);
  let matches = userSnap.exists() && userSnap.data().matches ? userSnap.data().matches : [];

  
  const newMatch = {
    opponentId,
    result,
    date: dateString,
  };
  matches = [...matches, newMatch];

  
  const points = matches.reduce((acc: number, match: any) => {
    if (!match.result) return acc;
    const [score1, score2] = match.result.split(' : ').map(Number);
    return score1 > score2 ? acc + 1 : acc;
  }, 0);

  
  await updateDoc(userRef, {
    matches,
    points,
  });
}
