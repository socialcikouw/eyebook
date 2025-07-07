import { router } from "expo-router";
import { useState } from "react";
import {
  formatInputRibuan,
  parseAngkaFromFormat,
} from "../helpers/format-angka";
import {
  KaryawanFormData,
  KaryawanFormDisplay,
  UseKaryawanFormReturn,
} from "../types/form.types";

const initialFormData: KaryawanFormData = {
  nama: "",
  ressort: "",
  saldo_awal: 0,
  target_awal: 0,
};

const initialDisplayData: KaryawanFormDisplay = {
  nama: "",
  ressort: "",
  saldo_awal_display: "",
  target_awal_display: "",
};

export const useKaryawanForm = (): UseKaryawanFormReturn => {
  const [formData, setFormData] = useState<KaryawanFormData>(initialFormData);
  const [displayData, setDisplayData] =
    useState<KaryawanFormDisplay>(initialDisplayData);
  const [isLoading, setIsLoading] = useState(false);

  // Validasi form - semua field harus diisi
  const isFormValid =
    formData.nama.trim() !== "" &&
    formData.ressort.trim() !== "" &&
    formData.saldo_awal > 0 &&
    formData.target_awal > 0;

  // Handle input text (nama, ressort)
  const handleTextInput = (
    value: string | undefined | null,
    field: "nama" | "ressort"
  ) => {
    try {
      const safeValue = value ?? "";
      setFormData((prev) => ({ ...prev, [field]: safeValue }));
      setDisplayData((prev) => ({ ...prev, [field]: safeValue }));
    } catch (error) {
      console.error(`Error handling text input for ${field}:`, error);
    }
  };

  // Handle input numerik dengan formatting (saldo_awal, target_awal)
  const handleNumericInput = (
    value: string | undefined | null,
    field: "saldo_awal" | "target_awal"
  ) => {
    try {
      const safeValue = value ?? "";

      // Format untuk display dengan pemisah ribuan
      const formattedValue = formatInputRibuan(safeValue);

      // Parse kembali ke number untuk data
      const numericValue = parseAngkaFromFormat(formattedValue);

      setDisplayData((prev) => ({
        ...prev,
        [`${field}_display`]: formattedValue,
      }));

      setFormData((prev) => ({
        ...prev,
        [field]: numericValue,
      }));
    } catch (error) {
      console.error(`Error handling numeric input for ${field}:`, error);
      // Set nilai default jika error
      setDisplayData((prev) => ({
        ...prev,
        [`${field}_display`]: "",
      }));
      setFormData((prev) => ({
        ...prev,
        [field]: 0,
      }));
    }
  };

  // Handle submit form
  const handleSubmit = async (
    onSubmit: (data: KaryawanFormData) => Promise<void>
  ) => {
    if (!isFormValid) {
      console.warn("Form validation failed, cannot submit");
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit(formData);
      // Reset form setelah sukses akan ditangani oleh mutation hook
      // yang akan melakukan navigasi setelah alert dikonfirmasi
    } catch (error) {
      console.error("Error submitting form:", error);
      // Jangan navigate jika ada error
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form ke kondisi awal
  const handleReset = () => {
    try {
      setFormData(initialFormData);
      setDisplayData(initialDisplayData);
    } catch (error) {
      console.error("Error resetting form:", error);
    }
  };

  // Handle cancel - kembali tanpa menyimpan
  const handleCancel = () => {
    handleReset();
    router.back();
  };

  // Setter untuk loading state
  const setLoading = (loading: boolean) => {
    try {
      setIsLoading(loading);
    } catch (error) {
      console.error("Error setting loading state:", error);
    }
  };

  return {
    formData,
    displayData,
    isLoading,
    isFormValid,
    handleTextInput,
    handleNumericInput,
    handleSubmit,
    handleReset,
    handleCancel,
    setLoading,
    setFormData,
    setDisplayData,
  };
};
