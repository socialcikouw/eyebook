import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

export function LoadingState({
  message = "Memuat...",
  size = "large",
  color = "#007AFF",
}: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
});
