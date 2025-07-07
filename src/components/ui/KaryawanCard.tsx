import { colors } from "@/src/lib/styles/colors";
import { KaryawanWithTotals } from "@/src/lib/types/karyawan.types";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface KaryawanCardProps {
  item: KaryawanWithTotals;
  onPress?: (item: KaryawanWithTotals) => void;
  onLongPress?: (item: KaryawanWithTotals) => void;
  children?: ReactNode;
}

const formatRupiah = (amount: number): string => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

export default function KaryawanCard({
  item,
  onPress,
  onLongPress,
  children,
}: KaryawanCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress ? () => onPress(item) : undefined}
      onLongPress={onLongPress ? () => onLongPress(item) : undefined}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{item.nama}</Text>
        <Text style={styles.ressort}>Ressort {item.ressort}</Text>
      </View>

      <View style={styles.stats}>
        <View>
          <Text style={styles.statLabel}>💰 Sisa Tunai</Text>
          <Text style={styles.sisaTunaiValue}>
            {formatRupiah(item.totalSisaTunai)}
          </Text>
        </View>
        <View>
          <Text style={styles.statLabel}> 💵 Gaji Storting</Text>
          <Text style={styles.stortingValue}>
            {formatRupiah(item.totalGajiStorting)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary,
    textAlign: "left",
  },
  ressort: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "left",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  sisaTunaiValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "left",
  },
  stortingValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    textAlign: "right",
  },
  transactionInfo: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  actions: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
});
