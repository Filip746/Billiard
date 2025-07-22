import { ImageSourcePropType } from "react-native";

export const images: Record<string, ImageSourcePropType> = {
  croatia: require("../assets/images/croatia.png"),
  germany: require("../assets/images/germany.png"),
  spain: require("../assets/images/spain.png"),
};

export const avatars: Record<string, ImageSourcePropType> = {
  avatar: require("../assets/images/avatar.jpg"),
  girl: require("../assets/images/girl.jpg"),
  boy: require("../assets/images/boy.png"),
};

export const billiard: ImageSourcePropType = require("../assets/images/billiard.jpg");