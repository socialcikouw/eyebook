import { formatRupiah } from "@/src/lib/helpers/format-angka";
import { formatTanggalLengkap } from "@/src/lib/helpers/format-tanggal";
import { useKaryawanById } from "@/src/lib/hooks/use-karyawan";
import { colors } from "@/src/lib/styles/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailKaryawan() {
  const { id } = useLocalSearchParams();
  const { data: karyawan } = useKaryawanById(Number(id));

  if (!karyawan) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Memuat data karyawan...</Text>
      </View>
    );
  }

  // Format tanggal bergabung
  const displayBergabung = karyawan.created_at
    ? formatTanggalLengkap(karyawan.created_at)
    : "-";

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <MaterialCommunityIcons
            name="account-circle"
            size={80}
            color={colors.primary}
          />
        </View>
        <Text style={styles.nama}>{karyawan.nama}</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{karyawan.ressort}</Text>
        </View>
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="wallet-outline" size={20} color={colors.primary} />
          <Text style={styles.cardTitle}>Informasi Keuangan</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Saldo Awal</Text>
            <Text style={styles.infoValue}>
              {formatRupiah(karyawan.saldo_awal)}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Target Awal</Text>
            <Text style={styles.infoValue}>
              {formatRupiah(karyawan.target_awal)}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Aktif</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ID Karyawan</Text>
            <Text style={styles.infoValue}>#{karyawan.id}</Text>
          </View>
        </View>
      </View>

      {/* Additional Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.cardTitle}>Informasi Tambahan</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tanggal Bergabung</Text>
            <Text style={styles.infoValue}>{displayBergabung}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  header: {
    backgroundColor: colors.white,
    paddingVertical: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  avatarContainer: {
    backgroundColor: colors.primaryLight,
    padding: 8,
    borderRadius: 50,
    marginBottom: 16,
  },
  nama: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  badgeContainer: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 16,
  },
  statusBadge: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "500",
  },
});
