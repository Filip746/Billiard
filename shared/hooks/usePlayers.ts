import { useAtomValue } from "jotai";
import { playersAtom } from "../state/playersAtom";

export function usePlayers() {
  return useAtomValue(playersAtom);
}
