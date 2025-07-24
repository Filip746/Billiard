import { ImageSourcePropType } from "react-native";

export interface Player {
  id: string;
  name: string;
  color: string;
  image: ImageSourcePropType;
  avatar: ImageSourcePropType;
}