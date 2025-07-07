import { colors } from "@/src/lib/styles/colors";
import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  editable?: boolean;
  required?: boolean;
  error?: string;
  maxLength?: number;
}

export default function FormInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "words",
  editable = true,
  required = false,
  error,
  maxLength,
}: FormInputProps) {
  return (
    <View style={styles.container}>
      {/* Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>

      {/* Input Field */}
      <TextInput
        style={[
          styles.input,
          !editable && styles.inputDisabled,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        editable={editable}
        autoCorrect={false}
        selectionColor={colors.primary}
        maxLength={maxLength}
      />

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  required: {
    fontSize: 16,
    color: colors.error,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: colors.backgroundDark,
    color: colors.textPrimary,
  },
  inputDisabled: {
    backgroundColor: colors.backgroundDark,
    color: colors.textSecondary,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
