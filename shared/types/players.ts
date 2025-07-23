import { ImageSourcePropType } from "react-native";

export interface Player {
  id: number;
  name: string;
  color: string;
  image: ImageSourcePropType;
  avatar: ImageSourcePropType;
}