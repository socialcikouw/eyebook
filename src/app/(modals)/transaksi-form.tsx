import FormInput from "@/src/components/common/FormInput";
import { LoadingState } from "@/src/components/common/LoadingState";
import Tombol from "@/src/components/common/Tombol";
import { useKaryawan } from "@/src/lib/hooks/use-karyawan";
import { useAddTransaksi } from "@/src/lib/hooks/use-transaksi";
import { useTransaksiForm } from "@/src/lib/hooks/use-transaksi-form";
import { colors } from "@/src/lib/styles/colors";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TransaksiForm() {
  // Ambil karyawan_id dari URL parameter
  const { karyawan_id } = useLocalSearchParams<{
    karyawan_id?: string;
  }>();

  const selectedKaryawanId = karyawan_id ? parseInt(karyawan_id) : undefined;

  // Hooks untuk form
  const {
    formData,
    displayData,
    isLoading,
    isFormValid,
    handleNumericInput,
    handleSubmit,
    handleCancel,
    setFormData,
    setDisplayData,
  } = useTransaksiForm();

  // Hooks untuk API operations
  const addTransaksiMutation = useAddTransaksi();

  // Hook untuk mendapatkan data karyawan (untuk menampilkan nama)
  const { data: karyawanList } = useKaryawan();

  // Effect untuk set karyawan_id dari parameter URL
  useEffect(() => {
    if (selectedKaryawanId) {
      const newFormData = { ...formData, karyawan_id: selectedKaryawanId };
      const newDisplayData = {
        ...displayData,
        karyawan_id: selectedKaryawanId,
      };
      setFormData(newFormData);
      setDisplayData(newDisplayData);
    }
  }, [selectedKaryawanId]);

  // Handle submit form - hanya untuk create transaksi baru
  const onSubmit = async () => {
    try {
      await handleSubmit(async (data) => {
        // Pastikan karyawan_id ada
        if (!data.karyawan_id) {
          throw new Error("Karyawan ID tidak ditemukan");
        }

        // Simpan transaksi baru
        await addTransaksiMutation.mutateAsync(data);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Error akan ditangani oleh mutation hook
    }
  };

  // Jika sedang loading, tampilkan loading state
  if (isLoading || addTransaksiMutation.isPending) {
    return <LoadingState message="Menyimpan data transaksi..." />;
  }

  // Cari data karyawan yang dipilih untuk ditampilkan
  const selectedKaryawan = karyawanList?.find(
    (k) => k.id === formData.karyawan_id
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Info Karyawan yang Dipilih */}
        {selectedKaryawan && (
          <View style={styles.karyawanInfo}>
            <Text style={styles.karyawanName}>{selectedKaryawan.nama}</Text>
            <Text style={styles.karyawanRessort}>
              {selectedKaryawan.ressort}
            </Text>
          </View>
        )}

        {/* Form Input Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Data Transaksi</Text>

          {/* Row 1: Kasbon & Storting */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldItem}>
              <FormInput
                label="Kasbon"
                placeholder="0"
                value={displayData.kasbon_display}
                onChangeText={(value) => handleNumericInput(value, "kasbon")}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.fieldItem}>
              <FormInput
                label="Storting"
                placeholder="0"
                value={displayData.storting_display}
                onChangeText={(value) => handleNumericInput(value, "storting")}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Row 2: Drop Baru & Drop Lama */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldItem}>
              <FormInput
                label="Drop Baru"
                placeholder="0"
                value={displayData.drop_baru_display}
                onChangeText={(value) => handleNumericInput(value, "drop_baru")}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.fieldItem}>
              <FormInput
                label="Drop Lama"
                placeholder="0"
                value={displayData.drop_lama_display}
                onChangeText={(value) => handleNumericInput(value, "drop_lama")}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Row 3: Drop Lunas & Murni */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldItem}>
              <FormInput
                label="Drop Lunas"
                placeholder="0"
                value={displayData.drop_lunas_display}
                onChangeText={(value) =>
                  handleNumericInput(value, "drop_lunas")
                }
                keyboardType="numeric"
              />
            </View>
            <View style={styles.fieldItem}>
              <FormInput
                label="Murni"
                placeholder="0"
                value={displayData.murni_display}
                onChangeText={(value) => handleNumericInput(value, "murni")}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Row 4: Tab Keluar & Transfer */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldItem}>
              <FormInput
                label="Tab Keluar"
                placeholder="0"
                value={displayData.tab_keluar_display}
                onChangeText={(value) =>
                  handleNumericInput(value, "tab_keluar")
                }
                keyboardType="numeric"
              />
            </View>
            <View style={styles.fieldItem}>
              <FormInput
                label="Transfer"
                placeholder="0"
                value={displayData.transfer_display}
                onChangeText={(value) => handleNumericInput(value, "transfer")}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Row 5: Servis (single field, centered) */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldItemSingle}>
              <FormInput
                label="Servis"
                placeholder="0"
                value={displayData.servis_display}
                onChangeText={(value) => handleNumericInput(value, "servis")}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Perhitungan Otomatis</Text>
       
          <View style={styles.fieldRow}>
            <View style={styles.fieldItem}>
              <FormInput
                label="Jumlah Drop"
                placeholder="0"
                value={displayData.jumlah_drop_display}
                onChangeText={() => {}}
                editable={false}
              />
            </View>
            <View style={styles.fieldItem}>
              <FormInput
                label="Premi (10%)"
                placeholder="0"
                value={displayData.premi_display}
                onChangeText={() => {}}
                editable={false}
              />
            </View>
          </View>

        
          <View style={styles.fieldRow}>
            <View style={styles.fieldItem}>
              <FormInput
                label="Gaji Storting (5%)"
                placeholder="0"
                value={displayData.gaji_storting_display}
                onChangeText={() => {}}
                editable={false}
              />
            </View>
            <View style={styles.fieldItem}>
              <FormInput
                label="Tunai Buku"
                placeholder="0"
                value={displayData.tunai_buku_display}
                onChangeText={() => {}}
                editable={false}
              />
            </View>
          </View>

        
          <View style={styles.fieldRow}>
            <View style={styles.fieldItem}>
              <FormInput
                label="Sisa Tunai"
                placeholder="0"
                value={displayData.sisa_tunai_display}
                onChangeText={() => {}}
                editable={false}
              />
            </View>
            <View style={styles.fieldItem}>
              <FormInput
                label="Setor Bos"
                placeholder="0"
                value={displayData.setor_bos_display}
                onChangeText={() => {}}
                editable={false}
              />
            </View>
          </View>

         
          <View style={styles.fieldRow}>
            <View style={styles.fieldItemSingle}>
              <FormInput
                label="Target Sekarang (5%)"
                placeholder="0"
                value={displayData.target_sekarang_display}
                onChangeText={() => {}}
                editable={false}
              />
            </View>
          </View>
        </View> */}

        {/* Form Validation Info */}
        {!isFormValid && selectedKaryawan && (
          <Text style={styles.validationText}>
            * Isi minimal satu field transaksi untuk menyimpan!
          </Text>
        )}

        {!selectedKaryawan && selectedKaryawanId && (
          <Text style={styles.validationText}>* Memuat data karyawan...</Text>
        )}

        {!selectedKaryawanId && (
          <Text style={styles.validationText}>
            * Karyawan tidak ditemukan! Pastikan Anda mengakses form ini dari
            daftar karyawan.
          </Text>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Tombol
            title="Simpan Transaksi"
            onPress={onSubmit}
            variant="primary"
            disabled={
              !selectedKaryawanId ||
              !isFormValid ||
              isLoading ||
              addTransaksiMutation.isPending
            }
          />

          <Tombol
            title="Batal"
            onPress={handleCancel}
            variant="secondary"
            disabled={isLoading || addTransaksiMutation.isPending}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 10,
  },

  // Karyawan Info Styles
  karyawanInfo: {
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  karyawanName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  karyawanRessort: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
  },

  formContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 16,
  },

  // New Row Layout Styles
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  },
  fieldItem: {
    flex: 1,
  },
  fieldItemSingle: {
    flex: 1,
    maxWidth: "50%",
    alignSelf: "center",
  },

  buttonContainer: {
    gap: 12,
  },
  validationText: {
    fontSize: 12,
    fontStyle: "italic",
    color: colors.error,
    marginBottom: 10,
    textAlign: "center",
  },
});
