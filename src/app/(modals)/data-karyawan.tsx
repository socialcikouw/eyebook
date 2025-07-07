import DataList from "@/src/components/common/DataList";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { useKaryawan } from "@/src/lib/hooks/use-karyawan";
import { KaryawanType } from "@/src/lib/types/karyawan.types";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function DataKaryawan() {
  const { data: dataList, isLoading, error, refetch } = useKaryawan();

  // Loading state
  if (isLoading) {
    return <LoadingState message="Memuat data karyawan..." />;
  }

  // Error state
  if (error) {
    return (
      <EmptyState
        icon="⚠️"
        title="Gagal Memuat Data"
        subtitle="Terjadi kesalahan saat memuat data karyawan. Silakan coba lagi."
        actionText="Coba Lagi"
        onActionPress={() => refetch()}
      />
    );
  }

  // Empty state - no employees yet
  if (!dataList || dataList.length === 0) {
    return (
      <EmptyState
        icon="👥"
        title="Belum Ada Karyawan"
        subtitle="Mulai dengan menambahkan karyawan pertama Anda. Tekan tombol + di pojok kanan atas."
        actionText="Tambah Karyawan"
        onActionPress={() => router.push("/(modals)/karyawan-form")}
      />
    );
  }

  // Handler untuk aksi pada karyawan
  const handleKaryawanPress = (karyawan: KaryawanType) => {
    router.push(`/(modals)/detail-karyawan?id=${karyawan.id}`);
    console.log("Karyawan dipilih:", karyawan.nama);
  };

  const handleEditKaryawan = (karyawan: KaryawanType) => {
    try {
      // Validasi karyawan object
      if (!karyawan || !karyawan.id) {
        console.error("Data karyawan tidak valid untuk edit");
        return;
      }

      console.log("Edit karyawan:", karyawan.nama);

      // Navigate ke form dengan parameter ID dan mode edit
      router.push(`/(modals)/karyawan-form?id=${karyawan.id}&mode=edit`);
    } catch (error) {
      console.error("Error saat membuka form edit karyawan:", error);
      // Fallback: coba navigation tanpa mode parameter
      try {
        router.push(`/(modals)/karyawan-form?id=${karyawan.id}`);
      } catch (fallbackError) {
        console.error("Error fallback navigation:", fallbackError);
      }
    }
  };

  // Data view - tampilkan daftar karyawan
  return (
    <View style={styles.container}>
      <DataList
        data={dataList}
        isLoading={isLoading}
        onRefresh={refetch}
        onKaryawanPress={handleKaryawanPress}
        onEditKaryawan={handleEditKaryawan}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
