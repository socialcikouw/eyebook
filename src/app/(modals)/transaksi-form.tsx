import FormTransaksi from "@/src/components/common/FormTransaksi";
import { colors } from "@/src/lib/styles/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TransaksiForm() {
  return (
    <View style={styles.container}>
      <FormTransaksi />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
