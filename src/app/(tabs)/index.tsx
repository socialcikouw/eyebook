import KaryawanList from "@/src/components/common/KaryawanList";
import { useKaryawan } from "@/src/lib/hooks/use-karyawan";
import { useTransaksi } from "@/src/lib/hooks/use-transaksi";
import { KaryawanWithTotals } from "@/src/lib/types/karyawan.types";
import { router } from "expo-router";
import React, { useMemo } from "react";

export default function index() {
  const { data: karyawan = [], isLoading: isLoadingKaryawan } = useKaryawan();
  const { data: transaksi = [], isLoading: isLoadingTransaksi } =
    useTransaksi();

  // Hitung total per karyawan untuk semua transaksi
  const karyawanWithTotals = useMemo(() => {
    console.log("=== DEBUG TRANSAKSI ===");
    console.log("Total transaksi:", transaksi.length);
    console.log("Total karyawan:", karyawan.length);

    return karyawan.map((karyawanItem) => {
      // Filter transaksi untuk karyawan ini (sementara semua transaksi untuk debug)
      const transaksiKaryawan = transaksi.filter((item) => {
        const isKaryawanMatch = item.karyawan_id === karyawanItem.id;

        if (isKaryawanMatch) {
          console.log(
            `✅ Transaksi ID ${item.transaksi_id} untuk karyawan ${karyawanItem.nama}:`
          );
          console.log("- Sisa tunai:", item.sisa_tunai);
          console.log("- Gaji storting:", item.gaji_storting);
          console.log("- Created at:", item.created_at);
        }

        return isKaryawanMatch;
      });

      console.log(
        `Karyawan ${karyawanItem.nama}: ${transaksiKaryawan.length} transaksi total`
      );

      // Hitung total sisa tunai dan gaji storting
      const totalSisaTunai = transaksiKaryawan.reduce(
        (total, item) => total + item.sisa_tunai,
        0
      );

      const totalGajiStorting = transaksiKaryawan.reduce(
        (total, item) => total + item.gaji_storting,
        0
      );

      return {
        ...karyawanItem,
        totalSisaTunai,
        totalGajiStorting,
        jumlahTransaksi: transaksiKaryawan.length,
      };
    });
  }, [karyawan, transaksi]);

  const handleKaryawanPress = (item: KaryawanWithTotals) => {
    router.push(`/(modals)/detail-transaksi?id=${item.id}`);
  };

  const handleAddKaryawan = () => {
    router.push("/(modals)/karyawan-form");
  };

  const isLoading = isLoadingKaryawan || isLoadingTransaksi;

  return (
    <KaryawanList
      karyawan={karyawanWithTotals}
      isLoading={isLoading}
      onKaryawanPress={handleKaryawanPress}
      onAddKaryawan={handleAddKaryawan}
    />
  );
}
