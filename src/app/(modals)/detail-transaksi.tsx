import { formatRupiah } from "@/src/lib/helpers/format-angka";
import { formatTanggalWaktu } from "@/src/lib/helpers/format-tanggal";
import { useKaryawanById } from "@/src/lib/hooks/use-karyawan";
import { useTransaksiByKaryawanId } from "@/src/lib/hooks/use-transaksi";
import { colors } from "@/src/lib/styles/colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DetailTransaksi() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  // Convert id to number
  const karyawanId = id ? parseInt(id as string) : 0;

  const { data: karyawan, isLoading: isLoadingKaryawan } =
    useKaryawanById(karyawanId);
  const { data: transaksi = [], isLoading: isLoadingTransaksi } =
    useTransaksiByKaryawanId(karyawanId);

  // Update header title dengan nama karyawan
  React.useLayoutEffect(() => {
    if (karyawan) {
      navigation.setOptions({
        headerTitle: `${karyawan.nama} `,
      });
    }
  }, [navigation, karyawan]);

  if (isLoadingKaryawan || isLoadingTransaksi) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  if (!karyawan) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Karyawan tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Info Karyawan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Info Karyawan</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nama:</Text>
            <Text style={styles.infoValue}>{karyawan.nama}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ressort:</Text>
            <Text style={styles.infoValue}>{karyawan.ressort}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Saldo Awal:</Text>
            <Text style={styles.infoValue}>
              {formatRupiah(karyawan.saldo_awal)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Target Awal:</Text>
            <Text style={styles.infoValue}>
              {formatRupiah(karyawan.target_awal)}
            </Text>
          </View>
        </View>

        {/* Riwayat Transaksi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Riwayat Transaksi ({transaksi.length})
          </Text>

          {transaksi.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Belum ada transaksi</Text>
            </View>
          ) : (
            transaksi.map((item) => (
              <View
                key={`transaksi-${item.transaksi_id}`}
                style={styles.transaksiCard}
              >
                <View style={styles.transaksiHeader}>
                  <Text style={styles.transaksiId}>#{item.transaksi_id}</Text>
                  <Text style={styles.transaksiDate}>
                    {formatTanggalWaktu(item.created_at)}
                  </Text>
                </View>

                <View style={styles.transaksiDetails}>
                  <View style={styles.transaksiRow}>
                    <Text style={styles.transaksiLabel}>Saldo Akhir:</Text>
                    <Text style={styles.transaksiValue}>
                      {formatRupiah(item.saldo_akhir)}
                    </Text>
                  </View>
                  <View style={styles.transaksiRow}>
                    <Text style={styles.transaksiLabel}>Target Akhir:</Text>
                    <Text style={styles.transaksiValue}>
                      {formatRupiah(item.target_akhir)}
                    </Text>
                  </View>
                  <View style={styles.transaksiRow}>
                    <Text style={styles.transaksiLabel}>Gaji Bersih:</Text>
                    <Text style={styles.transaksiValue}>
                      {formatRupiah(item.gaji_bersih_karyawan)}
                    </Text>
                  </View>
                  <View style={styles.transaksiRow}>
                    <Text style={styles.transaksiLabel}>Storting:</Text>
                    <Text style={styles.transaksiValue}>
                      {formatRupiah(item.storting)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  emptyState: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  transaksiCard: {
    backgroundColor: colors.backgroundDark,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  transaksiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transaksiId: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  transaksiDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  transaksiDetails: {
    gap: 4,
  },
  transaksiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transaksiLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  transaksiValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "500",
  },
});
