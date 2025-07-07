import { colors } from "@/src/lib/styles/colors";
import { TombolProps } from "@/src/lib/types/tombol.types";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export default function Tombol({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}: TombolProps) {
  const getTombolStyle = (): StyleProp<ViewStyle> => {
    const baseStyles: StyleProp<ViewStyle>[] = [styles.tombol];

    switch (variant) {
      case "primary":
        baseStyles.push(styles.primaryTombol);
        break;
      case "secondary":
        baseStyles.push(styles.secondaryTombol);
        break;
      case "danger":
        baseStyles.push(styles.dangerTombol);
        break;
    }

    if (disabled) {
      baseStyles.push(styles.disabledTombol);
    }

    if (style) {
      baseStyles.push(style);
    }

    return baseStyles;
  };

  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseStyles: StyleProp<TextStyle>[] = [styles.tombolText];

    switch (variant) {
      case "primary":
        baseStyles.push(styles.primaryText);
        break;
      case "secondary":
        baseStyles.push(styles.secondaryText);
        break;
      case "danger":
        baseStyles.push(styles.dangerText);
        break;
    }

    if (disabled) {
      baseStyles.push(styles.disabledText);
    }

    if (textStyle) {
      baseStyles.push(textStyle);
    }

    return baseStyles;
  };

  return (
    <TouchableOpacity
      style={getTombolStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tombol: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  primaryTombol: {
    backgroundColor: "#007AFF",
  },
  secondaryTombol: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.error,
  },
  dangerTombol: {
    backgroundColor: colors.error,
  },
  disabledTombol: {
    backgroundColor: "#E5E5E7",
  },
  tombolText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "white",
  },
  secondaryText: {
    color: colors.error,
  },
  dangerText: {
    color: "white",
  },
  disabledText: {
    color: "#8E8E93",
  },
});
