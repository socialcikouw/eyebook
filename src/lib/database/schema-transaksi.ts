export const createTransaksiTable = `
  CREATE TABLE IF NOT EXISTS transaksi (
    transaksi_id INTEGER PRIMARY KEY AUTOINCREMENT,
    karyawan_id INTEGER NOT NULL,
    saldo_akhir INTEGER NOT NULL,
    target_akhir INTEGER NOT NULL,
    utang_karyawan INTEGER DEFAULT 0,
    tekor_karyawan INTEGER DEFAULT 0,
    wajib_karyawan INTEGER DEFAULT 0,
    gaji_bersih_karyawan INTEGER DEFAULT 0,

    penghasilan_resort INTEGER DEFAULT 0,


    kasbon INTEGER DEFAULT 0,
    storting INTEGER DEFAULT 0,
    drop_lama INTEGER DEFAULT 0,
    drop_baru INTEGER DEFAULT 0,
    drop_lunas INTEGER DEFAULT 0,
    murni INTEGER DEFAULT 0,
    tab_keluar INTEGER DEFAULT 0,
    transfer INTEGER DEFAULT 0,
    servis INTEGER DEFAULT 0,

    jumlah_drop INTEGER DEFAULT 0,
    premi INTEGER DEFAULT 0,
    tunai_buku INTEGER DEFAULT 0,
    sisa_tunai INTEGER DEFAULT 0,
    setor_bos INTEGER DEFAULT 0,
    gaji_storting INTEGER DEFAULT 0,
    target_sekarang INTEGER DEFAULT 0,

   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(karyawan_id) REFERENCES karyawan(id)
  );
`;
