import { atomWithReset } from 'jotai/utils';

export const scorePlayer1Atom = atomWithReset(0);
export const scorePlayer2Atom = atomWithReset(0);
export const elapsedTimeAtom = atomWithReset<number | null>(null);