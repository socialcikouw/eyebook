import { KaryawanWithTotals } from "@/src/lib/types/karyawan.types";
import React, { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import KaryawanCard from "../ui/KaryawanCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";

interface KaryawanListProps {
  karyawan: KaryawanWithTotals[];
  isLoading: boolean;
  onKaryawanPress?: (item: KaryawanWithTotals) => void;
  onKaryawanLongPress?: (item: KaryawanWithTotals) => void;
  children?: (item: KaryawanWithTotals) => ReactNode;
  onAddKaryawan?: () => void;
}

export default function KaryawanList({
  karyawan,
  isLoading,
  onKaryawanPress,
  onKaryawanLongPress,
  children,
  onAddKaryawan,
}: KaryawanListProps) {
  if (isLoading) {
    return <LoadingState message="Memuat data karyawan..." />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* List Karyawan */}
      <View style={styles.list}>
        {karyawan.length > 0 ? (
          karyawan.map((item) => (
            <KaryawanCard
              key={`karyawan-${item.id}`}
              item={item}
              onPress={onKaryawanPress}
              onLongPress={onKaryawanLongPress}
            >
              {children && children(item)}
            </KaryawanCard>
          ))
        ) : (
          <EmptyState
            icon="👥"
            title="Belum ada karyawan"
            subtitle="Tambahkan karyawan terlebih dahulu untuk memulai mencatat transaksi"
            actionText={onAddKaryawan ? "Tambah Karyawan" : undefined}
            onActionPress={onAddKaryawan}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 16,
  },
});
