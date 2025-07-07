/**
 * Utilitas untuk format tanggal dan waktu dalam zona Indonesia (GMT+7)
 */

// Zona waktu Indonesia
const ZONA_INDONESIA = "Asia/Jakarta";

/**
 * Format tanggal dalam format Indonesia (DD/MM/YYYY)
 */
export const formatTanggal = (tanggal: Date | string): string => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA_INDONESIA,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

/**
 * Format waktu dalam format Indonesia (HH:MM)
 */
export const formatWaktu = (tanggal: Date | string): string => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA_INDONESIA,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

/**
 * Format tanggal dan waktu lengkap (DD/MM/YYYY HH:MM)
 */
export const formatTanggalWaktu = (tanggal: Date | string): string => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA_INDONESIA,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

/**
 * Format tanggal dengan nama bulan (DD Bulan YYYY)
 */
export const formatTanggalLengkap = (tanggal: Date | string): string => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA_INDONESIA,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

/**
 * Format tanggal dengan hari (Senin, DD Bulan YYYY)
 */
export const formatTanggalDenganHari = (tanggal: Date | string): string => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA_INDONESIA,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

/**
 * Format relatif waktu (misal: "2 jam yang lalu", "kemarin", "minggu lalu", dll)
 */
export const formatWaktuRelatif = (tanggal: Date | string): string => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;
  const sekarang = new Date();

  // Konversi ke zona Indonesia
  const dateIndonesia = new Date(
    date.toLocaleString("en-US", { timeZone: ZONA_INDONESIA })
  );
  const sekarangIndonesia = new Date(
    sekarang.toLocaleString("en-US", { timeZone: ZONA_INDONESIA })
  );

  const selisihMs = sekarangIndonesia.getTime() - dateIndonesia.getTime();
  const selisihDetik = Math.floor(selisihMs / 1000);
  const selisihMenit = Math.floor(selisihDetik / 60);
  const selisihJam = Math.floor(selisihMenit / 60);
  const selisihHari = Math.floor(selisihJam / 24);
  const selisihMinggu = Math.floor(selisihHari / 7);
  const selisihBulan = Math.floor(selisihHari / 30);
  const selisihTahun = Math.floor(selisihHari / 365);

  // Cek apakah tanggal adalah hari ini
  if (isHariIni(dateIndonesia)) {
    if (selisihDetik < 60) {
      return "Baru saja";
    } else if (selisihMenit < 60) {
      return `${selisihMenit} menit yang lalu`;
    } else {
      return `${selisihJam} jam yang lalu`;
    }
  }

  // Untuk tanggal yang berbeda
  if (selisihHari === 1) {
    return "Kemarin";
  } else if (selisihHari < 7) {
    return `${selisihHari} hari yang lalu`;
  } else if (selisihMinggu === 1) {
    return "Minggu lalu";
  } else if (selisihMinggu < 4) {
    return `${selisihMinggu} minggu yang lalu`;
  } else if (selisihBulan === 1) {
    return "Bulan lalu";
  } else if (selisihBulan < 12) {
    return `${selisihBulan} bulan yang lalu`;
  } else if (selisihTahun === 1) {
    return "Tahun lalu";
  } else if (selisihTahun > 1) {
    return `${selisihTahun} tahun yang lalu`;
  } else {
    return formatTanggal(date);
  }
};

/**
 * Mendapatkan waktu saat ini dalam zona Indonesia
 */
export const sekarangIndonesia = (): Date => {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: ZONA_INDONESIA })
  );
};

/**
 * Format untuk input datetime-local HTML
 */
export const formatUntukInput = (tanggal: Date | string): string => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;

  // Konversi ke zona Indonesia
  const dateIndonesia = new Date(
    date.toLocaleString("en-US", { timeZone: ZONA_INDONESIA })
  );

  const tahun = dateIndonesia.getFullYear();
  const bulan = String(dateIndonesia.getMonth() + 1).padStart(2, "0");
  const hari = String(dateIndonesia.getDate()).padStart(2, "0");
  const jam = String(dateIndonesia.getHours()).padStart(2, "0");
  const menit = String(dateIndonesia.getMinutes()).padStart(2, "0");

  return `${tahun}-${bulan}-${hari}T${jam}:${menit}`;
};

/**
 * Cek apakah tanggal adalah hari ini
 */
export const isHariIni = (tanggal: Date | string): boolean => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;
  const sekarang = sekarangIndonesia();

  const dateIndonesia = new Date(
    date.toLocaleString("en-US", { timeZone: ZONA_INDONESIA })
  );

  return (
    dateIndonesia.getDate() === sekarang.getDate() &&
    dateIndonesia.getMonth() === sekarang.getMonth() &&
    dateIndonesia.getFullYear() === sekarang.getFullYear()
  );
};
