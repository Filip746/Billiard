import { db } from '@/lib/firebase';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';

export async function saveMatchForUser(
  userId: string,
  userName: string,
  opponentId: string,
  result: string,
  dateString: string
) {
  const userRef = doc(db, 'users', userId);

  await setDoc(userRef, { name: userName }, { merge: true });

  await updateDoc(userRef, {
    matches: arrayUnion({
      opponentId,
      result,
      date: dateString,
    }),
  });
}
