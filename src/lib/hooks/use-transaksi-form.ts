import { router } from "expo-router";
import { useState } from "react";
import {
  formatInputRibuan,
  parseAngkaFromFormat,
} from "../helpers/format-angka";
import {
  TransaksiFormData,
  TransaksiFormDisplay,
} from "../types/transaksi.types";

export interface UseTransaksiFormReturn {
  formData: TransaksiFormData;
  displayData: TransaksiFormDisplay;
  isLoading: boolean;
  isFormValid: boolean;
  handleKaryawanSelect: (karyawan_id: number) => void;
  handleNumericInput: (
    value: string,
    field: keyof Omit<TransaksiFormData, "karyawan_id">
  ) => void;
  handleSubmit: (
    onSubmit: (data: TransaksiFormData) => Promise<void>
  ) => Promise<void>;
  handleReset: () => void;
  handleCancel: () => void;
  setLoading: (loading: boolean) => void;
  setFormData: (data: TransaksiFormData) => void;
  setDisplayData: (data: TransaksiFormDisplay) => void;
}

const initialFormData: TransaksiFormData = {
  karyawan_id: 0,
  saldo_akhir: 0,
  target_akhir: 0,
  utang_karyawan: 0,
  tekor_karyawan: 0,
  wajib_karyawan: 0,
  gaji_bersih_karyawan: 0,
  penghasilan_resort: 0,
  kasbon: 0,
  storting: 0,
  drop_lama: 0,
  drop_baru: 0,
  drop_lunas: 0,
  murni: 0,
  tab_keluar: 0,
  transfer: 0,
  servis: 0,
  jumlah_drop: 0,
  premi: 0,
  tunai_buku: 0,
  sisa_tunai: 0,
  setor_bos: 0,
  gaji_storting: 0,
  target_sekarang: 0,
};

const initialDisplayData: TransaksiFormDisplay = {
  karyawan_id: 0,
  saldo_akhir_display: "",
  target_akhir_display: "",
  utang_karyawan_display: "",
  tekor_karyawan_display: "",
  wajib_karyawan_display: "",
  gaji_bersih_karyawan_display: "",
  penghasilan_resort_display: "",
  kasbon_display: "",
  storting_display: "",
  drop_lama_display: "",
  drop_baru_display: "",
  drop_lunas_display: "",
  murni_display: "",
  tab_keluar_display: "",
  transfer_display: "",
  servis_display: "",
  jumlah_drop_display: "",
  premi_display: "",
  tunai_buku_display: "",
  sisa_tunai_display: "",
  setor_bos_display: "",
  gaji_storting_display: "",
  target_sekarang_display: "",
};

export const useTransaksiForm = (): UseTransaksiFormReturn => {
  const [formData, setFormData] = useState<TransaksiFormData>(initialFormData);
  const [displayData, setDisplayData] =
    useState<TransaksiFormDisplay>(initialDisplayData);
  const [isLoading, setIsLoading] = useState(false);

  // Validasi form - minimal karyawan_id, saldo_akhir, dan target_akhir harus diisi
  const isFormValid =
    formData.karyawan_id > 0 &&
    formData.saldo_akhir > 0 &&
    formData.target_akhir > 0;

  // Handle pemilihan karyawan
  const handleKaryawanSelect = (karyawan_id: number) => {
    try {
      setFormData((prev) => ({ ...prev, karyawan_id }));
      setDisplayData((prev) => ({ ...prev, karyawan_id }));
    } catch (error) {
      console.error("Error handling karyawan selection:", error);
    }
  };

  // Handle input numerik dengan formatting
  const handleNumericInput = (
    value: string | undefined | null,
    field: keyof Omit<TransaksiFormData, "karyawan_id">
  ) => {
    try {
      const safeValue = value ?? "";

      // Format untuk display dengan pemisah ribuan
      const formattedValue = formatInputRibuan(safeValue);

      // Parse kembali ke number untuk data
      const numericValue = parseAngkaFromFormat(formattedValue);

      // Update display data
      setDisplayData((prev) => ({
        ...prev,
        [`${field}_display`]: formattedValue,
      }));

      // Update form data
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
    onSubmit: (data: TransaksiFormData) => Promise<void>
  ) => {
    if (!isFormValid) {
      console.warn("Form validation failed, cannot submit");
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
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
    handleKaryawanSelect,
    handleNumericInput,
    handleSubmit,
    handleReset,
    handleCancel,
    setLoading,
    setFormData,
    setDisplayData,
  };
};
