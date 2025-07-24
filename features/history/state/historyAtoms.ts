import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { atom } from 'jotai';
import { FirestoreMatch } from '../hooks/useHistoryScreen';

export const matchesAtom = atom<FirestoreMatch[]>([]);
export const fetchingMoreAtom = atom(false);
export const lastDocAtom = atom<QueryDocumentSnapshot<DocumentData> | null>(null);
export const hasMoreAtom = atom(true);
