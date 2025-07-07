import FormInput from "@/src/components/common/FormInput";
import { LoadingState } from "@/src/components/common/LoadingState";
import Tombol from "@/src/components/common/Tombol";
import {
  useAddKaryawan,
  useKaryawanById,
  useUpdateKaryawan,
} from "@/src/lib/hooks/use-karyawan";
import { useKaryawanForm } from "@/src/lib/hooks/use-karyawan-form";
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

export default function KaryawanForm() {
  // Ambil parameters dari URL
  const { id, mode } = useLocalSearchParams<{ id?: string; mode?: string }>();

  // Tentukan apakah form dalam mode edit
  const isEditMode = mode === "edit" || !!id;
  const karyawanId = id ? parseInt(id) : undefined;

  // Hooks untuk form
  const {
    displayData,
    isLoading,
    isFormValid,
    handleTextInput,
    handleNumericInput,
    handleSubmit,
    handleCancel,
    setFormData,
    setDisplayData,
  } = useKaryawanForm();

  // Hooks untuk API operations
  const addKaryawanMutation = useAddKaryawan();
  const updateKaryawanMutation = useUpdateKaryawan();

  // Query untuk mendapatkan data karyawan yang akan diedit
  const { data: karyawanData, isLoading: isLoadingKaryawan } = useKaryawanById(
    karyawanId || 0
  );

  // Effect untuk load data karyawan ke form ketika dalam mode edit
  useEffect(() => {
    if (isEditMode && karyawanData && !isLoadingKaryawan) {
      // Set form data dengan data karyawan yang akan diedit
      setFormData({
        nama: karyawanData.nama,
        ressort: karyawanData.ressort,
        saldo_awal: karyawanData.saldo_awal,
        target_awal: karyawanData.target_awal,
      });

      // Set display data untuk formatting
      setDisplayData({
        nama: karyawanData.nama,
        ressort: karyawanData.ressort,
        saldo_awal_display: karyawanData.saldo_awal.toLocaleString("id-ID"),
        target_awal_display: karyawanData.target_awal.toLocaleString("id-ID"),
      });
    }
  }, [
    karyawanData,
    isEditMode,
    isLoadingKaryawan,
    setFormData,
    setDisplayData,
  ]);

  // Handle submit form
  const onSubmit = async () => {
    try {
      await handleSubmit(async (data) => {
        if (isEditMode && karyawanId && karyawanData) {
          // Update karyawan - gabungkan data yang ada dengan data form baru
          await updateKaryawanMutation.mutateAsync({
            ...karyawanData, // Gunakan data yang ada (termasuk created_at, updated_at)
            nama: data.nama.trim(),
            ressort: data.ressort.trim(),
            saldo_awal: data.saldo_awal,
            target_awal: data.target_awal,
          });
        } else {
          // Add karyawan baru
          await addKaryawanMutation.mutateAsync({
            nama: data.nama.trim(),
            ressort: data.ressort.trim(),
            saldo_awal: data.saldo_awal,
            target_awal: data.target_awal,
          });
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Error akan ditangani oleh mutation hook
    }
  };

  // Jika sedang loading, tampilkan loading state
  if (
    isLoading ||
    addKaryawanMutation.isPending ||
    updateKaryawanMutation.isPending ||
    (isEditMode && isLoadingKaryawan)
  ) {
    const loadingMessage = isEditMode
      ? isLoadingKaryawan
        ? "Memuat data karyawan..."
        : "Mengupdate data karyawan..."
      : "Menyimpan data karyawan...";

    return <LoadingState message={loadingMessage} />;
  }

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
        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Nama Karyawan */}
          <FormInput
            label="Nama Karyawan"
            placeholder="Cikouw Pasaribu"
            value={displayData.nama}
            onChangeText={(value) => handleTextInput(value, "nama")}
            autoCapitalize="characters"
            required
            maxLength={21}
          />

          {/* Ressort */}
          <FormInput
            label="Ressort"
            placeholder="Cibitung"
            value={displayData.ressort}
            onChangeText={(value) => handleTextInput(value, "ressort")}
            autoCapitalize="words"
            required
            maxLength={21}
          />

          {/* Saldo Awal */}
          <FormInput
            label="Saldo Awal"
            placeholder="120.000.000"
            value={displayData.saldo_awal_display}
            onChangeText={(value) => handleNumericInput(value, "saldo_awal")}
            keyboardType="numeric"
            required
          />

          {/* Target Awal */}
          <FormInput
            label="Target Awal"
            placeholder="24.000.000"
            value={displayData.target_awal_display}
            onChangeText={(value) => handleNumericInput(value, "target_awal")}
            keyboardType="numeric"
            required
          />
        </View>

        {/* Form Validation Info */}
        {!isFormValid && (
          <Text style={styles.validationText}>* Semua field wajib di-isi!</Text>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Tombol
            title={isEditMode ? "Update Karyawan" : "Simpan Karyawan"}
            onPress={onSubmit}
            variant="primary"
            disabled={
              !isFormValid ||
              isLoading ||
              addKaryawanMutation.isPending ||
              updateKaryawanMutation.isPending ||
              (isEditMode && isLoadingKaryawan)
            }
          />

          <Tombol
            title="Batal"
            onPress={handleCancel}
            variant="secondary"
            disabled={
              isLoading ||
              addKaryawanMutation.isPending ||
              updateKaryawanMutation.isPending ||
              (isEditMode && isLoadingKaryawan)
            }
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

  formContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    gap: 12,
  },

  validationText: {
    fontSize: 12,
    fontStyle: "italic",
    color: colors.error,
    marginBottom: 10,
  },
});
