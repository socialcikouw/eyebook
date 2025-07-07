import { TransaksiType } from "@/src/lib/types/transaksi.types";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TransaksiCardProps {
  item: TransaksiType;
  onPress?: (item: TransaksiType) => void;
  onLongPress?: (item: TransaksiType) => void;
  children?: ReactNode;
}

const formatRupiah = (amount: number): string => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

const formatTanggal = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function TransaksiCard({
  item,
  onPress,
  onLongPress,
  children,
}: TransaksiCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress ? () => onPress(item) : undefined}
      onLongPress={onLongPress ? () => onLongPress(item) : undefined}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.transactionId}>Transaksi #{item.transaksi_id}</Text>
        <Text style={styles.date}>📅 {formatTanggal(item.created_at)}</Text>
      </View>

      {/* Data Input Transaksi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Data Input</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Kasbon</Text>
            <Text style={styles.statValue}>{formatRupiah(item.kasbon)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Storting</Text>
            <Text style={styles.statValue}>{formatRupiah(item.storting)}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Drop Baru</Text>
            <Text style={styles.statValue}>{formatRupiah(item.drop_baru)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Drop Lama</Text>
            <Text style={styles.statValue}>{formatRupiah(item.drop_lama)}</Text>
          </View>
        </View>
      </View>

      {/* Hasil Perhitungan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Hasil Perhitungan</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Sisa Tunai</Text>
            <Text style={[styles.statValue, styles.positiveValue]}>
              {formatRupiah(item.sisa_tunai)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Gaji Storting</Text>
            <Text style={[styles.statValue, styles.positiveValue]}>
              {formatRupiah(item.gaji_storting)}
            </Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Setor Bos</Text>
            <Text style={styles.statValue}>{formatRupiah(item.setor_bos)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Tunai Buku</Text>
            <Text style={styles.statValue}>
              {formatRupiah(item.tunai_buku)}
            </Text>
          </View>
        </View>
      </View>

      {/* Custom children untuk aksi tambahan */}
      {children && <View style={styles.actions}>{children}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  transactionId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  statValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    fontFamily: "monospace",
  },
  positiveValue: {
    color: "#007AFF",
  },
  actions: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
});
