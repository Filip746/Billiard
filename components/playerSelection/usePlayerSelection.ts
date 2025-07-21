import {
  elapsedTimeAtom,
  scorePlayer1Atom,
  scorePlayer2Atom,
} from '@/features/game/state/gameAtoms';
import {
  endTimeAtom,
  scoreLimitAtom,
  selectedMinutesAtom,
  selectedPlayer1Atom,
  selectedPlayer2Atom,
} from '@/state/playerSelectionAtoms';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

export function usePlayerSelection() {
  
  const [selectedPlayer1, setSelectedPlayer1] = useAtom(selectedPlayer1Atom);
  const [selectedPlayer2, setSelectedPlayer2] = useAtom(selectedPlayer2Atom);
  const [selectedMinutes, setSelectedMinutes] = useAtom(selectedMinutesAtom);
  const [scoreLimit, setScoreLimit] = useAtom(scoreLimitAtom);
  const [_, setEndTime] = useAtom(endTimeAtom);

  
  const resetSelectedPlayer1 = useResetAtom(selectedPlayer1Atom);
  const resetSelectedPlayer2 = useResetAtom(selectedPlayer2Atom);
  const resetSelectedMinutes = useResetAtom(selectedMinutesAtom);
  const resetScoreLimit = useResetAtom(scoreLimitAtom);
  const resetEndTime = useResetAtom(endTimeAtom);
  const resetScorePlayer1 = useResetAtom(scorePlayer1Atom);
  const resetScorePlayer2 = useResetAtom(scorePlayer2Atom);
  const resetElapsedTime = useResetAtom(elapsedTimeAtom);

  const router = useRouter();

  function handleTimeChange(value: number | null) {
    setSelectedMinutes(value);
    if (value) {
      const newEndTime = Date.now() + value * 60 * 1000;
      setEndTime(newEndTime);
    }
  }

  function startMatch() {
    
    resetSelectedPlayer1();
    resetSelectedPlayer2();
    resetSelectedMinutes();
    resetScoreLimit();
    resetEndTime();
    resetScorePlayer1();
    resetScorePlayer2();
    resetElapsedTime();

    
    setSelectedPlayer1(selectedPlayer1);
    setSelectedPlayer2(selectedPlayer2);
    setSelectedMinutes(selectedMinutes);
    setScoreLimit(scoreLimit);

    if (selectedMinutes) {
      const newEndTime = Date.now() + selectedMinutes * 60 * 1000;
      setEndTime(newEndTime);
    }

    router.push('/game');
  }

  return {
    selectedPlayer1,
    setSelectedPlayer1,
    selectedPlayer2,
    setSelectedPlayer2,
    selectedMinutes,
    setSelectedMinutes,
    scoreLimit,
    setScoreLimit,
    handleTimeChange,
    startMatch,
  };
}
