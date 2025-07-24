import { atom } from 'jotai';
import { Player } from '../types/players';

export const playersAtom = atom<Player[]>([]);
