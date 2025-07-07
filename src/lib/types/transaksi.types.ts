export interface TransaksiType {
  transaksi_id: number;
  karyawan_id: number;
  saldo_akhir: number;
  target_akhir: number;
  utang_karyawan: number;
  tekor_karyawan: number;
  wajib_karyawan: number;
  gaji_bersih_karyawan: number;
  penghasilan_resort: number;
  kasbon: number;
  storting: number;
  drop_lama: number;
  drop_baru: number;
  drop_lunas: number;
  murni: number;
  tab_keluar: number;
  transfer: number;
  servis: number;
  jumlah_drop: number;
  premi: number;
  tunai_buku: number;
  sisa_tunai: number;
  setor_bos: number;
  gaji_storting: number;
  target_sekarang: number;
  created_at: string;
  updated_at: string;
}

export interface TransaksiFormData {
  karyawan_id: number;
  saldo_akhir: number;
  target_akhir: number;
  utang_karyawan: number;
  tekor_karyawan: number;
  wajib_karyawan: number;
  gaji_bersih_karyawan: number;
  penghasilan_resort: number;
  kasbon: number;
  storting: number;
  drop_lama: number;
  drop_baru: number;
  drop_lunas: number;
  murni: number;
  tab_keluar: number;
  transfer: number;
  servis: number;
  jumlah_drop: number;
  premi: number;
  tunai_buku: number;
  sisa_tunai: number;
  setor_bos: number;
  gaji_storting: number;
  target_sekarang: number;
}

export interface TransaksiFormDisplay {
  karyawan_id: number;
  saldo_akhir_display: string;
  target_akhir_display: string;
  utang_karyawan_display: string;
  tekor_karyawan_display: string;
  wajib_karyawan_display: string;
  gaji_bersih_karyawan_display: string;
  penghasilan_resort_display: string;
  kasbon_display: string;
  storting_display: string;
  drop_lama_display: string;
  drop_baru_display: string;
  drop_lunas_display: string;
  murni_display: string;
  tab_keluar_display: string;
  transfer_display: string;
  servis_display: string;
  jumlah_drop_display: string;
  premi_display: string;
  tunai_buku_display: string;
  sisa_tunai_display: string;
  setor_bos_display: string;
  gaji_storting_display: string;
  target_sekarang_display: string;
}
