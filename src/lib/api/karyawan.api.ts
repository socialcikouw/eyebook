import { getDB } from "../database";
import { KaryawanType } from "../types/karyawan.types";

export const getAllKaryawan = async (): Promise<KaryawanType[]> => {
  try {
    const db = await getDB();
    return await db.getAllAsync("SELECT * FROM karyawan ORDER BY id DESC");
  } catch (error) {
    console.error("Gagal mengambil semua karyawan:", error);
    return [];
  }
};

export const getKaryawanById = async (
  id: number
): Promise<KaryawanType | null> => {
  try {
    const db = await getDB();
    const result = await db.getFirstAsync(
      "SELECT * FROM karyawan WHERE id = ?",
      [id]
    );
    return result as KaryawanType | null;
  } catch (error) {
    console.error("Gagal mengambil karyawan:", error);
    return null;
  }
};

export const addKaryawan = async (
  karyawan: Omit<KaryawanType, "id" | "created_at" | "updated_at">
): Promise<KaryawanType> => {
  try {
    const db = await getDB();
    const result = await db.runAsync(
      "INSERT INTO karyawan (nama, ressort, saldo_awal, target_awal) VALUES (?, ?, ?, ?)",
      [
        karyawan.nama,
        karyawan.ressort,
        karyawan.saldo_awal,
        karyawan.target_awal,
      ]
    );

    const newKaryawan = await getKaryawanById(result.lastInsertRowId);
    if (!newKaryawan) {
      throw new Error("Gagal mengambil karyawan yang baru ditambahkan");
    }
    return newKaryawan;
  } catch (error) {
    console.error("Gagal menambahkan karyawan:", error);
    throw error;
  }
};

export const updateKaryawan = async (
  karyawan: KaryawanType
): Promise<KaryawanType> => {
  try {
    const db = await getDB();
    await db.runAsync(
      "UPDATE karyawan SET nama = ?, ressort = ?, saldo_awal = ?, target_awal = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [
        karyawan.nama,
        karyawan.ressort,
        karyawan.saldo_awal,
        karyawan.target_awal,
        karyawan.id,
      ]
    );

    const updatedKaryawan = await getKaryawanById(karyawan.id);
    if (!updatedKaryawan) {
      throw new Error("Gagal mengambil karyawan yang telah diupdate");
    }
    return updatedKaryawan;
  } catch (error) {
    console.error("Gagal mengupdate karyawan:", error);
    throw error;
  }
};

export const deleteKaryawan = async (id: number): Promise<void> => {
  try {
    const db = await getDB();
    await db.runAsync("DELETE FROM karyawan WHERE id = ?", [id]);
  } catch (error) {
    console.error("Gagal menghapus karyawan:", error);
    throw error;
  }
};
