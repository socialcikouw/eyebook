import { getDB } from "../database";
import { KaryawanType } from "../types/karyawan.types";

// Helper function untuk retry database operations
const retryDatabaseOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      console.warn(`Database operation attempt ${attempt} failed:`, error);

      // Jika ini bukan attempt terakhir, tunggu sebentar sebelum retry
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded");
};

export const getAllKaryawan = async (): Promise<KaryawanType[]> => {
  try {
    return await retryDatabaseOperation(async () => {
      const db = await getDB();
      if (!db) {
        throw new Error("Database connection is null");
      }
      return await db.getAllAsync("SELECT * FROM karyawan ORDER BY id DESC");
    });
  } catch (error) {
    console.error("Gagal mengambil semua karyawan:", error);
    return [];
  }
};

export const getKaryawanById = async (
  id: number
): Promise<KaryawanType | null> => {
  try {
    return await retryDatabaseOperation(async () => {
      const db = await getDB();
      if (!db) {
        throw new Error("Database connection is null");
      }
      const result = await db.getFirstAsync(
        "SELECT * FROM karyawan WHERE id = ?",
        [id]
      );
      return result as KaryawanType | null;
    });
  } catch (error) {
    console.error("Gagal mengambil karyawan:", error);
    return null;
  }
};

export const addKaryawan = async (
  karyawan: Omit<KaryawanType, "id" | "created_at" | "updated_at">
): Promise<KaryawanType> => {
  try {
    return await retryDatabaseOperation(async () => {
      const db = await getDB();
      if (!db) {
        throw new Error("Database connection is null");
      }

      const result = await db.runAsync(
        "INSERT INTO karyawan (nama, ressort, saldo_awal, target_awal) VALUES (?, ?, ?, ?)",
        [
          karyawan.nama,
          karyawan.ressort,
          karyawan.saldo_awal,
          karyawan.target_awal,
        ]
      );

      if (!result || !result.lastInsertRowId) {
        throw new Error("Failed to insert karyawan - no insertId returned");
      }

      const newKaryawan = await getKaryawanById(result.lastInsertRowId);
      if (!newKaryawan) {
        throw new Error("Gagal mengambil karyawan yang baru ditambahkan");
      }
      return newKaryawan;
    });
  } catch (error) {
    console.error("Gagal menambahkan karyawan:", error);
    throw error;
  }
};

export const updateKaryawan = async (
  karyawan: KaryawanType
): Promise<KaryawanType> => {
  try {
    return await retryDatabaseOperation(async () => {
      const db = await getDB();
      if (!db) {
        throw new Error("Database connection is null");
      }

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
    });
  } catch (error) {
    console.error("Gagal mengupdate karyawan:", error);
    throw error;
  }
};

export const deleteKaryawan = async (id: number): Promise<void> => {
  try {
    await retryDatabaseOperation(async () => {
      const db = await getDB();
      if (!db) {
        throw new Error("Database connection is null");
      }
      await db.runAsync("DELETE FROM karyawan WHERE id = ?", [id]);
    });
  } catch (error) {
    console.error("Gagal menghapus karyawan:", error);
    throw error;
  }
};
