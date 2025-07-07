import { getDB } from "./index";

// Fungsi untuk melihat semua tabel dalam database
export const lihatSemuaTabel = async () => {
  try {
    const db = await getDB();
    const result = await db.getAllAsync(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `);

    console.log("=== DAFTAR TABEL ===");
    result.forEach((table: any) => {
      console.log(`📋 Tabel: ${table.name}`);
    });

    return result;
  } catch (error) {
    console.error("Error saat melihat tabel:", error);
  }
};

// Fungsi untuk melihat struktur/kolom dari tabel tertentu
export const lihatStrukturTabel = async (namaTabel: string) => {
  try {
    const db = await getDB();
    const result = await db.getAllAsync(`PRAGMA table_info(${namaTabel})`);

    console.log(`=== STRUKTUR TABEL: ${namaTabel.toUpperCase()} ===`);
    result.forEach((column: any) => {
      console.log(
        `📊 ${column.name} | ${column.type} | ${
          column.notnull ? "NOT NULL" : "NULL"
        } | ${column.pk ? "PRIMARY KEY" : ""}`
      );
    });

    return result;
  } catch (error) {
    console.error(`Error saat melihat struktur tabel ${namaTabel}:`, error);
  }
};

// Fungsi untuk melihat semua data dari tabel
export const lihatDataTabel = async (namaTabel: string, limit: number = 50) => {
  try {
    const db = await getDB();
    const result = await db.getAllAsync(
      `SELECT * FROM ${namaTabel} LIMIT ${limit}`
    );

    console.log(
      `=== DATA TABEL: ${namaTabel.toUpperCase()} (${result.length} baris) ===`
    );
    result.forEach((row: any, index: number) => {
      console.log(`📝 Baris ${index + 1}:`, row);
    });

    return result;
  } catch (error) {
    console.error(`Error saat melihat data tabel ${namaTabel}:`, error);
  }
};

// Fungsi untuk menghitung jumlah data dalam tabel
export const hitungDataTabel = async (namaTabel: string) => {
  try {
    const db = await getDB();
    const result = await db.getFirstAsync(
      `SELECT COUNT(*) as total FROM ${namaTabel}`
    );

    console.log(
      `📊 Total data di tabel ${namaTabel}: ${(result as any)?.total || 0}`
    );
    return (result as any)?.total || 0;
  } catch (error) {
    console.error(`Error saat menghitung data tabel ${namaTabel}:`, error);
  }
};

// Fungsi untuk menjalankan query custom
export const jalankanQuery = async (query: string) => {
  try {
    const db = await getDB();
    const result = await db.getAllAsync(query);

    console.log("=== HASIL QUERY ===");
    console.log(`Query: ${query}`);
    console.log("Hasil:", result);

    return result;
  } catch (error) {
    console.error("Error saat menjalankan query:", error);
  }
};

// Fungsi untuk memeriksa semua info database
export const periksaSemuaDatabase = async () => {
  console.log("🔍 =================================");
  console.log("🔍 PEMERIKSAAN DATABASE LENGKAP");
  console.log("🔍 =================================");

  // Lihat semua tabel
  await lihatSemuaTabel();

  // Lihat struktur dan data tabel karyawan
  console.log("\n");
  await lihatStrukturTabel("karyawan");
  await hitungDataTabel("karyawan");
  await lihatDataTabel("karyawan", 10);

  // Lihat struktur dan data tabel transaksi
  console.log("\n");
  await lihatStrukturTabel("transaksi");
  await hitungDataTabel("transaksi");
  await lihatDataTabel("transaksi", 10);

  console.log("\n🔍 Selesai memeriksa database");
};

// ========================================
// FUNGSI PENGHAPUSAN TABEL DAN DATA
// ========================================

// Fungsi untuk menghapus semua data dari tabel (tapi tabel tetap ada)
export const hapusSemuaDataTabel = async (namaTabel: string) => {
  try {
    const db = await getDB();

    // Konfirmasi dulu jumlah data yang akan dihapus
    const count = await db.getFirstAsync(
      `SELECT COUNT(*) as total FROM ${namaTabel}`
    );
    const total = (count as any)?.total || 0;

    console.log(`⚠️ AKAN MENGHAPUS ${total} data dari tabel ${namaTabel}`);

    // Hapus semua data
    await db.runAsync(`DELETE FROM ${namaTabel}`);

    // Reset auto increment counter
    await db.runAsync(`DELETE FROM sqlite_sequence WHERE name='${namaTabel}'`);

    console.log(`✅ Berhasil menghapus semua data dari tabel ${namaTabel}`);
    console.log(
      `📊 Tabel ${namaTabel} sekarang kosong, tapi struktur tetap ada`
    );

    return true;
  } catch (error) {
    console.error(`❌ Error saat menghapus data tabel ${namaTabel}:`, error);
    throw error;
  }
};

// Fungsi untuk menghapus tabel sepenuhnya (struktur + data)
export const hapusTabelSepenuhnya = async (namaTabel: string) => {
  try {
    const db = await getDB();

    // Konfirmasi tabel ada
    const tableExists = await db.getFirstAsync(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${namaTabel}'`
    );

    if (!tableExists) {
      console.log(`⚠️ Tabel ${namaTabel} tidak ditemukan`);
      return false;
    }

    console.log(
      `⚠️ AKAN MENGHAPUS TABEL ${namaTabel} SEPENUHNYA (struktur + data)`
    );

    // Hapus tabel
    await db.runAsync(`DROP TABLE IF EXISTS ${namaTabel}`);

    console.log(`✅ Berhasil menghapus tabel ${namaTabel} sepenuhnya`);

    return true;
  } catch (error) {
    console.error(`❌ Error saat menghapus tabel ${namaTabel}:`, error);
    throw error;
  }
};

// Fungsi untuk menghapus semua tabel (reset database)
export const resetSemuaDatabase = async () => {
  try {
    const db = await getDB();

    console.log("⚠️ MEMULAI RESET SEMUA DATABASE...");

    // Dapatkan semua nama tabel
    const tables = await db.getAllAsync(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `);

    console.log(`📋 Ditemukan ${tables.length} tabel yang akan dihapus`);

    // Hapus semua tabel satu per satu
    for (const table of tables) {
      const tableName = (table as any).name;
      console.log(`🗑️ Menghapus tabel: ${tableName}`);
      await db.runAsync(`DROP TABLE IF EXISTS ${tableName}`);
    }

    // Hapus sequence counter
    await db.runAsync(`DELETE FROM sqlite_sequence`);

    console.log("✅ Berhasil mereset semua database");
    console.log("⚠️ SEMUA TABEL DAN DATA TELAH DIHAPUS!");
    console.log("💡 Restart aplikasi untuk membuat ulang tabel");

    return true;
  } catch (error) {
    console.error("❌ Error saat mereset database:", error);
    throw error;
  }
};

// Fungsi untuk membuat ulang tabel setelah dihapus
export const buatUlangTabel = async (namaTabel: string) => {
  try {
    const db = await getDB();

    console.log(`🔨 Membuat ulang tabel ${namaTabel}...`);

    if (namaTabel === "karyawan") {
      // Import schema karyawan
      const { createKaryawanTable } = await import("./schema-karyawan");
      await db.execAsync(createKaryawanTable);
      console.log("✅ Tabel karyawan berhasil dibuat ulang");
    } else if (namaTabel === "transaksi") {
      // Import schema transaksi
      const { createTransaksiTable } = await import("./schema-transaksi");
      await db.execAsync(createTransaksiTable);
      console.log("✅ Tabel transaksi berhasil dibuat ulang");
    } else {
      console.log(`⚠️ Schema untuk tabel ${namaTabel} tidak dikenali`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`❌ Error saat membuat ulang tabel ${namaTabel}:`, error);
    throw error;
  }
};

// Fungsi untuk reset dan buat ulang semua tabel
export const resetDanBuatUlangDatabase = async () => {
  try {
    console.log("🔄 MEMULAI RESET DAN BUAT ULANG DATABASE...");

    // Reset semua
    await resetSemuaDatabase();

    // Tunggu sebentar
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Buat ulang tabel
    console.log("🔨 Membuat ulang semua tabel...");
    await buatUlangTabel("karyawan");
    await buatUlangTabel("transaksi");

    console.log("✅ Database berhasil direset dan dibuat ulang");
    console.log("🎉 Database siap digunakan kembali");

    return true;
  } catch (error) {
    console.error("❌ Error saat reset dan buat ulang database:", error);
    throw error;
  }
};
