import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type TombolVariant = "primary" | "secondary" | "danger";

export interface TombolProps {
  title: string;
  onPress: () => void;
  variant?: TombolVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
