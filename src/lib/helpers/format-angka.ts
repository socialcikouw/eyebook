/**
 * Memformat angka dengan pemisah ribuan menggunakan titik (.)
 * Contoh: 1000000 -> "1.000.000"
 */
export const formatRibuan = (angka: number | undefined | null): string => {
  // Handle nilai undefined, null, atau NaN
  if (angka == null || isNaN(angka)) {
    return "0";
  }

  // Pastikan angka adalah number yang valid
  const validAngka = Number(angka);
  if (isNaN(validAngka)) {
    return "0";
  }

  return validAngka.toLocaleString("id-ID");
};

/**
 * Memformat string input angka real-time dengan pemisah ribuan
 * Menghapus karakter non-numerik dan menambahkan pemisah titik
 * Contoh: "1000000" -> "1.000.000"
 */
export const formatInputRibuan = (input: string | undefined | null): string => {
  // Handle nilai undefined atau null
  if (input == null) {
    return "";
  }

  // Pastikan input adalah string
  const stringInput = String(input);

  // Hapus semua karakter non-numerik
  const angkaOnly = stringInput.replace(/[^0-9]/g, "");

  // Jika kosong, return string kosong
  if (angkaOnly === "") {
    return "";
  }

  // Convert ke number lalu format dengan pemisah ribuan
  const angka = parseInt(angkaOnly);

  // Validasi hasil parsing
  if (isNaN(angka)) {
    return "";
  }

  return formatRibuan(angka);
};

/**
 * Mengubah string yang sudah diformat kembali ke angka
 * Contoh: "1.000.000" -> 1000000
 */
export const parseAngkaFromFormat = (
  formatInput: string | undefined | null
): number => {
  // Handle nilai undefined atau null
  if (formatInput == null) {
    return 0;
  }

  // Pastikan input adalah string
  const stringInput = String(formatInput);

  // Hapus semua pemisah ribuan (titik)
  const angkaOnly = stringInput.replace(/\./g, "");

  // Jika kosong atau hanya berisi non-numerik, return 0
  if (angkaOnly === "" || isNaN(parseInt(angkaOnly))) {
    return 0;
  }

  const result = parseInt(angkaOnly);
  return isNaN(result) ? 0 : result;
};

/**
 * Memformat angka menjadi format Rupiah lengkap
 * Contoh: 1000000 -> "Rp 1.000.000"
 */
export const formatRupiah = (angka: number | undefined | null): string => {
  return `Rp ${formatRibuan(angka)}`;
};

/**
 * Validasi apakah input adalah angka yang valid
 */
export const isValidAngka = (input: string | undefined | null): boolean => {
  if (input == null) {
    return false;
  }

  const stringInput = String(input);
  const angkaOnly = stringInput.replace(/[^0-9]/g, "");
  return angkaOnly.length > 0 && !isNaN(parseInt(angkaOnly));
};
