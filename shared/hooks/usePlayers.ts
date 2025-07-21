import { avatars, images } from '@/const/images';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { db } from '../services/firebase';

export interface Player {
  id: number;
  name: string;
  color: string;
  image: ImageSourcePropType;
  avatar: ImageSourcePropType;
}

export const usePlayers = (): Player[] => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'players'), (snapshot) => {
      const playersData: Player[] = snapshot.docs.map(doc => {
        const data = doc.data() as {
          id: number;
          name: string;
          color: string;
          image?: string;
          avatar?: string;
        };
        return {
          id: data.id,
          name: data.name,
          color: data.color,
          image: images[(data.image) || 'spain.png'],
          avatar: avatars[(data.avatar) || 'avatar.jpg'] || require('@/assets/images/avatar.jpg') ,
        };
      });
      setPlayers(playersData);
    });

    return () => unsubscribe();
  }, []);

  return players;
};
