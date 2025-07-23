import { atom } from 'jotai';

export const matchesAtom = atom<any[]>([]);
export const fetchingMoreAtom = atom(false);
export const lastDocAtom = atom<any>(null);
export const hasMoreAtom = atom(true);
