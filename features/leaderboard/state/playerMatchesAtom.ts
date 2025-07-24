import { getMatchesForUser } from '@/shared/services/matchService';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const playerMatchesFamily = atomFamily((playerId: string) =>
  atom(async () => {
    if (!playerId) return [];
    return await getMatchesForUser(playerId);
  })
);

export const playerRecentMatchesFamily = atomFamily((playerId: string) =>
  atom(async () => {
    if (!playerId) return [];
    return await getMatchesForUser(playerId, 5);
  })
);