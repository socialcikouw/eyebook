import SetelanCard from "@/src/components/ui/SetelanCard";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function setelan() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SetelanCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
