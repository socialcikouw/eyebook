import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Tombol from "../../components/common/Tombol";
import {
  hapusSemuaDataTabel,
  hitungDataTabel,
  lihatDataTabel,
  periksaSemuaDatabase,
  resetDanBuatUlangDatabase,
} from "../../lib/database/debug";

export default function DeveloperTools() {
  const handlePeriksaDatabase = async () => {
    try {
      await periksaSemuaDatabase();
      Alert.alert(
        "Success",
        "Cek console/log untuk melihat hasil pemeriksaan database!"
      );
    } catch (error) {
      Alert.alert("Error", "Gagal memeriksa database: " + error);
    }
  };

  const handleLihatTabelKaryawan = async () => {
    try {
      await lihatDataTabel("karyawan");
      Alert.alert("Success", "Data tabel karyawan ditampilkan di console!");
    } catch (error) {
      Alert.alert("Error", "Gagal melihat tabel karyawan: " + error);
    }
  };

  const handleLihatTabelTransaksi = async () => {
    try {
      await lihatDataTabel("transaksi");
      Alert.alert("Success", "Data tabel transaksi ditampilkan di console!");
    } catch (error) {
      Alert.alert("Error", "Gagal melihat tabel transaksi: " + error);
    }
  };

  const handleHitungData = async () => {
    try {
      const totalKaryawan = await hitungDataTabel("karyawan");
      const totalTransaksi = await hitungDataTabel("transaksi");
      Alert.alert(
        "Jumlah Data",
        `Karyawan: ${totalKaryawan}\nTransaksi: ${totalTransaksi}`
      );
    } catch (error) {
      Alert.alert("Error", "Gagal menghitung data: " + error);
    }
  };

  // Handler untuk menghapus data
  const handleHapusDataKaryawan = () => {
    Alert.alert(
      "⚠️ Konfirmasi",
      "Yakin ingin menghapus SEMUA data karyawan?\n(Tabel tetap ada, hanya data yang dihapus)",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await hapusSemuaDataTabel("karyawan");
              Alert.alert("Success", "Semua data karyawan berhasil dihapus!");
            } catch (error) {
              Alert.alert("Error", "Gagal menghapus data: " + error);
            }
          },
        },
      ]
    );
  };

  const handleHapusDataTransaksi = () => {
    Alert.alert(
      "⚠️ Konfirmasi",
      "Yakin ingin menghapus SEMUA data transaksi?\n(Tabel tetap ada, hanya data yang dihapus)",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await hapusSemuaDataTabel("transaksi");
              Alert.alert("Success", "Semua data transaksi berhasil dihapus!");
            } catch (error) {
              Alert.alert("Error", "Gagal menghapus data: " + error);
            }
          },
        },
      ]
    );
  };

  const handleResetDatabase = () => {
    Alert.alert(
      "🚨 PERINGATAN!",
      "Ini akan menghapus SEMUA tabel dan data!\nDatabase akan kosong total dan perlu restart aplikasi.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Reset Total",
          style: "destructive",
          onPress: async () => {
            try {
              await resetDanBuatUlangDatabase();
              Alert.alert(
                "Success",
                "Database berhasil direset dan dibuat ulang!\nSemua data telah dihapus."
              );
            } catch (error) {
              Alert.alert("Error", "Gagal reset database: " + error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚙️ Pengaturan & Debug</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 Debug Database</Text>
        <Text style={styles.description}>
          Gunakan tombol di bawah untuk memeriksa database. Hasil akan
          ditampilkan di console/log.
        </Text>

        <Tombol
          title="🔍 Periksa Semua Database"
          onPress={handlePeriksaDatabase}
          style={styles.button}
        />

        <Tombol
          title="👥 Lihat Data Karyawan"
          onPress={handleLihatTabelKaryawan}
          style={styles.button}
        />

        <Tombol
          title="💰 Lihat Data Transaksi"
          onPress={handleLihatTabelTransaksi}
          style={styles.button}
        />

        <Tombol
          title="📊 Hitung Total Data"
          onPress={handleHitungData}
          style={styles.button}
        />
      </View>

      {/* Section Penghapusan Data */}
      <View style={[styles.section, styles.dangerSection]}>
        <Text style={styles.dangerTitle}>🗑️ Penghapusan Data</Text>
        <Text style={styles.dangerDescription}>
          ⚠️ HATI-HATI! Operasi ini akan menghapus data secara permanen.
        </Text>

        <Tombol
          title="🗑️ Hapus Data Karyawan"
          onPress={handleHapusDataKaryawan}
          variant="danger"
          style={styles.button}
        />

        <Tombol
          title="🗑️ Hapus Data Transaksi"
          onPress={handleHapusDataTransaksi}
          variant="danger"
          style={styles.button}
        />

        <View style={styles.resetContainer}>
          <Text style={styles.resetWarning}>🚨 RESET TOTAL DATABASE</Text>
          <Text style={styles.resetDescription}>
            Menghapus semua tabel dan data, lalu membuat ulang struktur database
            kosong.
          </Text>
          <Tombol
            title="🚨 RESET TOTAL DATABASE"
            onPress={handleResetDatabase}
            variant="danger"
            style={[styles.button, styles.resetButton]}
          />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>ℹ️ Cara Melihat Log:</Text>
        <Text style={styles.infoText}>• Buka Metro bundler di terminal</Text>
        <Text style={styles.infoText}>• Tekan 'j' untuk membuka debugger</Text>
        <Text style={styles.infoText}>• Buka Developer Tools browser</Text>
        <Text style={styles.infoText}>• Lihat tab Console</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
  },
  button: {
    marginBottom: 10,
  },
  info: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196f3",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1976d2",
  },
  infoText: {
    fontSize: 14,
    color: "#1976d2",
    marginBottom: 4,
  },
  dangerSection: {
    backgroundColor: "#fff3f3",
    borderLeftWidth: 4,
    borderLeftColor: "#d32f2f",
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#d32f2f",
  },
  dangerDescription: {
    fontSize: 14,
    color: "#d32f2f",
    marginBottom: 15,
    lineHeight: 20,
    fontWeight: "600",
  },
  resetContainer: {
    backgroundColor: "#ffebee",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#d32f2f",
    borderStyle: "dashed",
  },
  resetWarning: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#b71c1c",
    textAlign: "center",
  },
  resetDescription: {
    fontSize: 12,
    color: "#d32f2f",
    marginBottom: 15,
    lineHeight: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
  resetButton: {
    marginTop: 5,
  },
  demoSection: {
    backgroundColor: "#f0f8ff",
    borderLeftWidth: 4,
    borderLeftColor: "#2196f3",
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1976d2",
  },
  demoContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  demoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  demoValue: {
    fontSize: 14,
    color: "#666",
  },
});
