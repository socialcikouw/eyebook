import { EmptyState } from "@/src/components/common/EmptyState";
import TransaksiList from "@/src/components/common/TransaksiList";
import { useKaryawan } from "@/src/lib/hooks/use-karyawan";
import { useTransaksi } from "@/src/lib/hooks/use-transaksi";
import { KaryawanType } from "@/src/lib/types/karyawan.types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function DetailTransaksi() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: dataKaryawan, isLoading: loadingKaryawan } = useKaryawan();
  const { data: dataTransaksi, isLoading: loadingTransaksi } = useTransaksi();

  // Cari karyawan berdasarkan ID
  const karyawan = useMemo(() => {
    if (!id || !dataKaryawan) return null;
    return dataKaryawan.find((k: KaryawanType) => k.id === parseInt(id));
  }, [id, dataKaryawan]);

  // Update header title berdasarkan nama karyawan
  useLayoutEffect(() => {
    if (karyawan) {
      navigation.setOptions({
        headerTitle: `${karyawan.nama}`,
      });
    } else if (!loadingKaryawan) {
      navigation.setOptions({
        headerTitle: "Detail Transaksi",
      });
    }
  }, [navigation, karyawan, loadingKaryawan]);

  // Filter transaksi untuk karyawan ini dan bulan ini
  const transaksiKaryawan = useMemo(() => {
    if (!id || !dataTransaksi) return [];

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return dataTransaksi.filter((transaksi) => {
      // Filter berdasarkan karyawan_id
      if (transaksi.karyawan_id !== parseInt(id)) return false;

      // Filter berdasarkan bulan ini
      const transaksiDate = new Date(transaksi.created_at);
      return (
        transaksiDate.getMonth() === currentMonth &&
        transaksiDate.getFullYear() === currentYear
      );
    });
  }, [id, dataTransaksi]);

  // Loading state
  const isLoading = loadingKaryawan || loadingTransaksi;

  // Jika karyawan tidak ditemukan
  if (!isLoading && !karyawan) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Karyawan tidak ditemukan"
          subtitle="Silakan pilih karyawan lain"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* List transaksi */}
      <TransaksiList
        transaksi={transaksiKaryawan}
        loading={isLoading}
        showSummary={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
