import { colors } from "@/src/lib/styles/colors";
import { TransaksiType } from "@/src/lib/types/transaksi.types";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TransaksiCard from "../ui/TransaksiCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";

interface TransaksiListProps {
  transaksi: TransaksiType[];
  loading?: boolean;
  onTransaksiPress?: (transaksi: TransaksiType) => void;
  onTransaksiLongPress?: (transaksi: TransaksiType) => void;
  title?: string;
  showSummary?: boolean;
}

const formatRupiah = (amount: number): string => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

const getTotalsByType = (transaksi: TransaksiType[]) => {
  return transaksi.reduce(
    (acc, item) => ({
      totalSisaTunai: acc.totalSisaTunai + item.sisa_tunai,
      totalGajiStorting: acc.totalGajiStorting + item.gaji_storting,
      totalKasbon: acc.totalKasbon + item.kasbon,
      totalStorting: acc.totalStorting + item.storting,
      totalDropBaru: acc.totalDropBaru + item.drop_baru,
      totalDropLama: acc.totalDropLama + item.drop_lama,
      totalSetorBos: acc.totalSetorBos + item.setor_bos,
      totalTunaiBuku: acc.totalTunaiBuku + item.tunai_buku,
    }),
    {
      totalSisaTunai: 0,
      totalGajiStorting: 0,
      totalKasbon: 0,
      totalStorting: 0,
      totalDropBaru: 0,
      totalDropLama: 0,
      totalSetorBos: 0,
      totalTunaiBuku: 0,
    }
  );
};

export default function TransaksiList({
  transaksi,
  loading = false,
  onTransaksiPress,
  onTransaksiLongPress,

  showSummary = true,
}: TransaksiListProps) {
  if (loading) {
    return <LoadingState message="Memuat transaksi..." />;
  }

  const totals = getTotalsByType(transaksi);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Storting Bulan Ini</Text>
        <Text style={styles.title}>{formatRupiah(totals.totalStorting)}</Text>
        <Text style={styles.length}>{transaksi.length} Hari Kerja </Text>
      </View>

      {showSummary && transaksi.length > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>📊 Ringkasan Total</Text>

          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Sisa Tunai</Text>
                <Text style={[styles.summaryValue, styles.positiveValue]}>
                  {formatRupiah(totals.totalSisaTunai)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Gaji Storting</Text>
                <Text style={[styles.summaryValue, styles.positiveValue]}>
                  {formatRupiah(totals.totalGajiStorting)}
                </Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Kasbon</Text>
                <Text style={styles.summaryValue}>
                  {formatRupiah(totals.totalKasbon)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Storting</Text>
                <Text style={styles.summaryValue}>
                  {formatRupiah(totals.totalStorting)}
                </Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Drop Baru</Text>
                <Text style={styles.summaryValue}>
                  {formatRupiah(totals.totalDropBaru)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Drop Lama</Text>
                <Text style={styles.summaryValue}>
                  {formatRupiah(totals.totalDropLama)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderTransaksi = ({ item }: { item: TransaksiType }) => (
    <TransaksiCard
      item={item}
      onPress={onTransaksiPress}
      onLongPress={onTransaksiLongPress}
    />
  );

  if (transaksi.length === 0) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <EmptyState
          icon="📋"
          title="Belum Ada Transaksi"
          subtitle="Belum ada transaksi di bulan ini"
        />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={transaksi}
      renderItem={renderTransaksi}
      ListHeaderComponent={renderHeader}
      keyExtractor={(item) => item.transaksi_id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 8,
    paddingVertical: 4,

    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  length: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  summaryContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 16,
  },
  summarySection: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
    fontFamily: "monospace",
  },
  positiveValue: {
    color: "#059669",
  },
});
