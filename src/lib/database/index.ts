import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";
import { createKaryawanTable } from "./schema-karyawan";
import { createTransaksiTable } from "./schema-transaksi";

// Variabel untuk menyimpan koneksi database agar hanya dibuat sekali (singleton)
let dbInstance: SQLiteDatabase | null = null;
let isInitializing = false;

// Fungsi utama untuk mendapatkan koneksi database
export const getDB = async (): Promise<SQLiteDatabase> => {
  try {
    // Cek apakah koneksi sudah pernah dibuat
    if (dbInstance) {
      return dbInstance;
    }

    // Cegah multiple initialization simultan
    if (isInitializing) {
      // Tunggu sampai inisialisasi selesai
      while (isInitializing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (dbInstance) {
        return dbInstance;
      }
    }

    isInitializing = true;

    console.log("Membuka koneksi database baru...");
    // Buka database "eyebook.db" (akan dibuat jika belum ada)
    dbInstance = await openDatabaseAsync("eyebook.db");

    // Validasi koneksi database
    if (!dbInstance) {
      throw new Error("Failed to open database connection");
    }

    console.log("Menginisialisasi skema database...");
    // Buat struktur tabel
    await setupSchema(dbInstance);

    console.log("Database berhasil diinisialisasi");
    isInitializing = false;

    // Return koneksi database yang sudah dibuat
    return dbInstance;
  } catch (error) {
    isInitializing = false;
    dbInstance = null; // Reset instance jika gagal

    // Jika gagal, tampilkan error ke console dan lempar ulang
    console.error("Error saat menginisialisasi database:", error);
    throw new Error(`Database initialization failed: ${error}`);
  }
};

// Fungsi untuk setup (membuat) schema atau tabel di database
const setupSchema = async (db: SQLiteDatabase) => {
  try {
    console.log("Setting up database schema...");

    // Validasi database connection
    if (!db) {
      throw new Error("Database connection is null");
    }

    // Aktifkan mode WAL (Write-Ahead Logging) agar lebih cepat dan aman
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    // Test koneksi dengan query sederhana
    await db.getFirstAsync("SELECT 1 as test");

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
    throw new Error(`Schema setup failed: ${error}`);
  }
};

// Fungsi untuk reset database connection (untuk debugging)
export const resetDatabaseConnection = () => {
  console.log("Resetting database connection...");
  dbInstance = null;
  isInitializing = false;
};
