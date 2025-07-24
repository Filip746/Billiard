import { avatars, images } from '@/const/images';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { Player } from '../types/players';

export const usePlayers = (): Player[] => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'players'), (snapshot) => {
      const playersData: Player[] = snapshot.docs.map(doc => {
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
  }, []);

  return players;
};
