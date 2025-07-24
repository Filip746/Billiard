import { atomWithReset } from 'jotai/utils';

export const selectedPlayer1Atom = atomWithReset<string | null>(null);
export const selectedPlayer2Atom = atomWithReset<string | null>(null);
export const selectedMinutesAtom = atomWithReset<number | null>(null);
export const scoreLimitAtom = atomWithReset<number | null>(null);
export const endTimeAtom = atomWithReset<number | null>(null);
