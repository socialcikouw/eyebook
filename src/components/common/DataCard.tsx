import { formatRupiah } from "@/src/lib/helpers/format-angka";
import { formatTanggalDenganHari } from "@/src/lib/helpers/format-tanggal";
import { colors } from "@/src/lib/styles/colors";
import { KaryawanType } from "@/src/lib/types/karyawan.types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DataCardProps {
  karyawan: KaryawanType;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function DataCard({
  karyawan,
  onPress,
  onEdit,
  onDelete,
}: DataCardProps) {
  // Format tanggal created_at karyawan
  const sekarang = new Date();
  const displayDate = formatTanggalDenganHari(sekarang);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Header dengan nama dan aksi */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons
              name="account-circle"
              size={40}
              color={colors.primary}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nama}>{karyawan.nama}</Text>
            <View style={styles.ressortContainer}>
              <Text style={styles.ressort}>{karyawan.ressort}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onEdit}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="pencil" size={20} color={colors.primary} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onDelete}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash" size={20} color={colors.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Info finansial */}
      <View style={styles.financialInfo}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Saldo Awal</Text>
            <Text style={styles.infoValue}>
              {formatRupiah(karyawan.saldo_awal)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Target Awal</Text>
            <Text style={styles.infoValue}>
              {formatRupiah(karyawan.target_awal)}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer dengan timestamp */}
      <View style={styles.footer}>
        <View style={styles.timestampContainer}>
          <Ionicons name="time-outline" size={12} color={colors.textLight} />
          <Text style={styles.timestamp}>{displayDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: 24,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  nameContainer: {
    marginLeft: 12,
    flex: 1,
  },
  nama: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ressortContainer: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  ressort: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    padding: 8,
    backgroundColor: colors.backgroundDark,
    borderRadius: 8,
  },
  financialInfo: {
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItem: {
    flex: 1,
    paddingHorizontal: 8,
  },
  divider: {
    width: 1,
    height: "80%",
    backgroundColor: colors.borderLight,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  timestampContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textLight,
  },
});
