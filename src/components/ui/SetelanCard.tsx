import {
  SetelanMenu,
  SetelanMenuItemProps,
} from "@/src/components/common/SetelanMenu";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";

// Pastikan path sesuai

export default function SetelanCard() {
  // Section 1: Data & Master
  const dataMenu: SetelanMenuItemProps[] = [
    {
      title: "Data Karyawan",
      lefticon: "people-outline",
      righticon: "chevron-forward-outline",
      onPress: () => router.push("/(modals)/data-karyawan"),
    },
    {
      title: "Data Transaksi",
      lefticon: "cash-outline",
      righticon: "chevron-forward-outline",
      onPress: () => Alert.alert("Fitur belum tersedia"),
    },
  ];

  // Section 2: Pengaturan
  const settingsMenu: SetelanMenuItemProps[] = [
    {
      title: "Riwayat Aktivitas",
      lefticon: "time-outline",
      righticon: "chevron-forward-outline",
      onPress: () => Alert.alert("Fitur belum tersedia"),
    },
    {
      title: "Pengaturan Aplikasi",
      lefticon: "settings-outline",
      righticon: "chevron-forward-outline",
      onPress: () => Alert.alert("Fitur belum tersedia"),
    },
    {
      title: "Backup & Restore",
      lefticon: "cloud-upload-outline",
      righticon: "chevron-forward-outline",
      onPress: () => Alert.alert("Fitur belum tersedia"),
    },
  ];

  // Section 3: Tools & Bantuan
  const toolsMenu: SetelanMenuItemProps[] = [
    {
      title: "Tentang Aplikasi",
      lefticon: "information-circle-outline",
      righticon: "chevron-forward-outline",
      onPress: () => Alert.alert("Fitur belum tersedia"),
    },
    {
      title: "Bantuan & Panduan",
      lefticon: "help-circle-outline",
      righticon: "chevron-forward-outline",
      onPress: () => Alert.alert("Fitur belum tersedia"),
    },
    {
      title: "Developer Tools",
      lefticon: "bug-outline",
      righticon: "chevron-forward-outline",
      onPress: () => router.push("/(modals)/developer-tools"),
    },
  ];

  // Section 4: Akun
  const accountMenu: SetelanMenuItemProps[] = [
    {
      title: "Logout",
      lefticon: "log-out-outline",
      righticon: "chevron-forward-outline",
      onPress: () => {
        Alert.alert("Logout", "Yakin ingin keluar?", [
          { text: "Batal", style: "cancel" },
          { text: "Ya", onPress: () => console.log("User logged out") },
        ]);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <SetelanMenu sectionTitle="Data & Master" items={dataMenu} />
      <SetelanMenu sectionTitle="Pengaturan" items={settingsMenu} />
      <SetelanMenu sectionTitle="Tools & Bantuan" items={toolsMenu} />
      <SetelanMenu sectionTitle="Akun" items={accountMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 32,
  },
});
