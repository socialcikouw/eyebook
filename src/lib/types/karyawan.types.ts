export interface KaryawanType {
  id: number;
  nama: string;
  ressort: string;
  saldo_awal: number;
  target_awal: number;
  created_at: string;
  updated_at: string;
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

// Interface untuk karyawan dengan total transaksi
export interface KaryawanWithTotals extends KaryawanType {
  totalSisaTunai: number;
  totalGajiStorting: number;
  jumlahTransaksi: number;
}
