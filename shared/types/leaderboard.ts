import { ImageSourcePropType } from "react-native";

export type LeaderboardEntry = {
  id: string;
  name: string;
  points: number;
  avatar: ImageSourcePropType;
};