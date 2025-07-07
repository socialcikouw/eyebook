import { getDB } from "../database";
import { TransaksiFormData, TransaksiType } from "../types/transaksi.types";

export const getAllTransaksi = async (): Promise<TransaksiType[]> => {
  try {
    const db = await getDB();
    return await db.getAllAsync(
      "SELECT * FROM transaksi ORDER BY transaksi_id DESC"
    );
  } catch (error) {
    console.error("Gagal mengambil semua transaksi:", error);
    return [];
  }
};

export const getTransaksiById = async (
  transaksi_id: number
): Promise<TransaksiType | null> => {
  try {
    const db = await getDB();
    const result = await db.getFirstAsync(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [transaksi_id]
    );
    return result as TransaksiType | null;
  } catch (error) {
    console.error("Gagal mengambil transaksi:", error);
    return null;
  }
};

export const getTransaksiByKaryawanId = async (
  karyawan_id: number
): Promise<TransaksiType[]> => {
  try {
    const db = await getDB();
    return await db.getAllAsync(
      "SELECT * FROM transaksi WHERE karyawan_id = ? ORDER BY transaksi_id DESC",
      [karyawan_id]
    );
  } catch (error) {
    console.error("Gagal mengambil transaksi berdasarkan karyawan:", error);
    return [];
  }
};

export const addTransaksi = async (
  transaksi: TransaksiFormData
): Promise<TransaksiType> => {
  try {
    const db = await getDB();
    const result = await db.runAsync(
      `INSERT INTO transaksi (
        karyawan_id, saldo_akhir, target_akhir, utang_karyawan, tekor_karyawan, 
        wajib_karyawan, gaji_bersih_karyawan, penghasilan_resort, kasbon, storting, 
        drop_lama, drop_baru, drop_lunas, murni, tab_keluar, transfer, servis, 
        jumlah_drop, premi, tunai_buku, sisa_tunai, setor_bos, gaji_storting, target_sekarang
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        transaksi.karyawan_id,
        transaksi.saldo_akhir,
        transaksi.target_akhir,
        transaksi.utang_karyawan,
        transaksi.tekor_karyawan,
        transaksi.wajib_karyawan,
        transaksi.gaji_bersih_karyawan,
        transaksi.penghasilan_resort,
        transaksi.kasbon,
        transaksi.storting,
        transaksi.drop_lama,
        transaksi.drop_baru,
        transaksi.drop_lunas,
        transaksi.murni,
        transaksi.tab_keluar,
        transaksi.transfer,
        transaksi.servis,
        transaksi.jumlah_drop,
        transaksi.premi,
        transaksi.tunai_buku,
        transaksi.sisa_tunai,
        transaksi.setor_bos,
        transaksi.gaji_storting,
        transaksi.target_sekarang,
      ]
    );

    const newTransaksi = await getTransaksiById(result.lastInsertRowId);
    if (!newTransaksi) {
      throw new Error("Gagal mengambil transaksi yang baru ditambahkan");
    }
    return newTransaksi;
  } catch (error) {
    console.error("Gagal menambahkan transaksi:", error);
    throw error;
  }
};

export const updateTransaksi = async (
  transaksi: TransaksiType
): Promise<TransaksiType> => {
  try {
    const db = await getDB();
    await db.runAsync(
      `UPDATE transaksi SET 
        karyawan_id = ?, saldo_akhir = ?, target_akhir = ?, utang_karyawan = ?, 
        tekor_karyawan = ?, wajib_karyawan = ?, gaji_bersih_karyawan = ?, 
        penghasilan_resort = ?, kasbon = ?, storting = ?, drop_lama = ?, 
        drop_baru = ?, drop_lunas = ?, murni = ?, tab_keluar = ?, transfer = ?, 
        servis = ?, jumlah_drop = ?, premi = ?, tunai_buku = ?, sisa_tunai = ?, 
        setor_bos = ?, gaji_storting = ?, target_sekarang = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE transaksi_id = ?`,
      [
        transaksi.karyawan_id,
        transaksi.saldo_akhir,
        transaksi.target_akhir,
        transaksi.utang_karyawan,
        transaksi.tekor_karyawan,
        transaksi.wajib_karyawan,
        transaksi.gaji_bersih_karyawan,
        transaksi.penghasilan_resort,
        transaksi.kasbon,
        transaksi.storting,
        transaksi.drop_lama,
        transaksi.drop_baru,
        transaksi.drop_lunas,
        transaksi.murni,
        transaksi.tab_keluar,
        transaksi.transfer,
        transaksi.servis,
        transaksi.jumlah_drop,
        transaksi.premi,
        transaksi.tunai_buku,
        transaksi.sisa_tunai,
        transaksi.setor_bos,
        transaksi.gaji_storting,
        transaksi.target_sekarang,
        transaksi.transaksi_id,
      ]
    );

    const updatedTransaksi = await getTransaksiById(transaksi.transaksi_id);
    if (!updatedTransaksi) {
      throw new Error("Gagal mengambil transaksi yang telah diupdate");
    }
    return updatedTransaksi;
  } catch (error) {
    console.error("Gagal mengupdate transaksi:", error);
    throw error;
  }
};

export const deleteTransaksi = async (transaksi_id: number): Promise<void> => {
  try {
    const db = await getDB();
    await db.runAsync("DELETE FROM transaksi WHERE transaksi_id = ?", [
      transaksi_id,
    ]);
  } catch (error) {
    console.error("Gagal menghapus transaksi:", error);
    throw error;
  }
};
