import { Timestamp } from 'firebase/firestore';

export type Match = {
  player1Id: string;
  player2Id: string;
  player1Name: string;
  player2Name: string;
  scorePlayer1: number;
  scorePlayer2: number;
  timeUsedMs: number;
  createdAt: Timestamp;
};