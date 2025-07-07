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
 * Mendapatkan waktu saat ini
 */
export const sekarangIndonesia = (): Date => {
  return new Date();
};

/**
 * Cek apakah tanggal adalah hari ini
 */
export const isHariIni = (tanggal: Date | string): boolean => {
  const date = typeof tanggal === "string" ? new Date(tanggal) : tanggal;
  const sekarang = new Date();

  return (
    date.getDate() === sekarang.getDate() &&
    date.getMonth() === sekarang.getMonth() &&
    date.getFullYear() === sekarang.getFullYear()
  );
};
