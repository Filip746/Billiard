import { atom } from 'jotai';

export const leaderboardAtom = atom<LeaderboardEntry[]>([]);
export const leaderboardLoadingAtom = atom(true);
