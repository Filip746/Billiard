import { Player } from '../types/players';

export function getPlayerById(players: Player[], id: string | null): Player | undefined {
  if (typeof id !== 'string') return undefined;
  return players.find(p => p.id === id);
}