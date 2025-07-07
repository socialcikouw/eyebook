import { KeyboardTypeOptions } from "react-native";
import { TransaksiFormData, TransaksiFormDisplay } from "./transaksi.types";

export interface FormFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  editable?: boolean;
}

export interface KaryawanFormData {
  nama: string;
  ressort: string;
  saldo_awal: number;
  target_awal: number;
}

export interface KaryawanFormDisplay {
  nama: string;
  ressort: string;
  saldo_awal_display: string;
  target_awal_display: string;
}

export interface UseKaryawanFormReturn {
  formData: KaryawanFormData;
  displayData: KaryawanFormDisplay;
  isLoading: boolean;
  isFormValid: boolean;
  handleTextInput: (value: string, field: "nama" | "ressort") => void;
  handleNumericInput: (
    value: string,
    field: "saldo_awal" | "target_awal"
  ) => void;
  handleSubmit: (
    onSubmit: (data: KaryawanFormData) => Promise<void>
  ) => Promise<void>;
  handleReset: () => void;
  handleCancel: () => void;
  setLoading: (loading: boolean) => void;
  setFormData: (data: KaryawanFormData) => void;
  setDisplayData: (data: KaryawanFormDisplay) => void;
}

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
