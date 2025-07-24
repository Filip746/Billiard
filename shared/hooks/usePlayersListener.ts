import { avatars, images } from '@/const/images';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { db } from '../services/firebase';
import { playersAtom } from '../state/playersAtom';
import { Player } from '../types/players';

export function usePlayersListener() {
  const setPlayers = useSetAtom(playersAtom);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'players'), (snapshot) => {
      const playersData = snapshot.docs.map(doc => {
        const data = doc.data() as Player;
        return {
          id: data.id,
          name: data.name,
          color: data.color,
          image: images[data.image as string || 'spain.png'],
          avatar: avatars[data.avatar as string || 'avatar.jpg'] ?? require('@/assets/images/avatar.jpg'),
        };
      });
      setPlayers(playersData);
    });
    return () => unsubscribe();
  }, [setPlayers]);
}
