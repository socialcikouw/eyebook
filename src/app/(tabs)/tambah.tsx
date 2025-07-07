import { useKaryawan } from "@/src/lib/hooks/use-karyawan";
import { colors } from "@/src/lib/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function tambah() {
  const { data: karyawan = [], isLoading } = useKaryawan();

  const handleAddTransaksi = (karyawanId: number, nama: string) => {
    router.push(
      `/(modals)/transaksi-form?id=${karyawanId}&nama=${encodeURIComponent(
        nama
      )}`
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Memuat data karyawan...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            Pilih karyawan untuk menambahkan transaksi baru
          </Text>
        </View>

        <View style={styles.cardContainer}>
          {karyawan.map((item) => (
            <TouchableOpacity
              key={`karyawan-tambah-${item.id}`}
              style={styles.card}
              onPress={() => handleAddTransaksi(item.id, item.nama)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.nama}</Text>

                  <Ionicons
                    name="chevron-forward-outline"
                    size={25}
                    color={colors.textPrimary}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {karyawan.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>👥</Text>
            </View>
            <Text style={styles.emptyText}>Belum ada karyawan</Text>
            <Text style={styles.emptySubtext}>
              Tambahkan karyawan terlebih dahulu di menu Setelan
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  header: {
    marginBottom: 10,
    alignItems: "center",
  },

  subtitle: {
    fontSize: 12,
    color: colors.primaryDark,
    textAlign: "center",
  },
  cardContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: colors.borderLight,
    borderRadius: 12,
    // shadowColor: colors.textPrimary,
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.12,
    // shadowRadius: 8,
    // elevation: 3,
    // borderWidth: 1,
    // borderColor: colors.border,
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    flex: 1,
  },
  cardBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cardBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryDark,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 12,
  },
  cardAction: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
    textAlign: "center",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
    marginTop: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyIconText: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
