import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";
import { createKaryawanTable } from "./schema-karyawan";
import { createTransaksiTable } from "./schema-transaksi";

// Variabel untuk menyimpan koneksi database agar hanya dibuat sekali (singleton)
let dbInstance: SQLiteDatabase | null = null;

// Fungsi utama untuk mendapatkan koneksi database
export const getDB = async (): Promise<SQLiteDatabase> => {
  try {
    // Cek apakah koneksi sudah pernah dibuat
    if (!dbInstance) {
      console.log("Membuka koneksi database baru...");
      // Buka database "eyebook.db" (akan dibuat jika belum ada)
      dbInstance = await openDatabaseAsync("eyebook.db");

      console.log("Menginisialisasi skema database...");
      // Buat struktur tabel
      await setupSchema(dbInstance);

      console.log("Database berhasil diinisialisasi");
    }

    // Return koneksi database yang sudah dibuat
    return dbInstance;
  } catch (error) {
    // Jika gagal, tampilkan error ke console dan lempar ulang
    console.error("Error saat menginisialisasi database:", error);
    throw error;
  }
};

// Fungsi untuk setup (membuat) schema atau tabel di database
const setupSchema = async (db: SQLiteDatabase) => {
  try {
    console.log("Setting up database schema...");

    // Aktifkan mode WAL (Write-Ahead Logging) agar lebih cepat dan aman
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    // Buat tabel karyawan
    console.log("Membuat tabel karyawan...");
    await db.execAsync(createKaryawanTable);

    // Buat tabel transaksi
    console.log("Membuat tabel transaksi...");
    await db.execAsync(createTransaksiTable);

    console.log("Schema setup completed successfully");
  } catch (error) {
    // Jika gagal saat membuat schema, tampilkan error
    console.error("Error during schema setup:", error);
    throw error;
  }
};
