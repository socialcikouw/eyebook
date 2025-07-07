import { colors } from "@/src/lib/styles/colors";
import { Stack } from "expo-router";
import React from "react";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="karyawan-form"
        options={({
          route,
        }: {
          route: { params?: { id?: string; mode?: string } };
        }) => {
          // Ambil parameter dari route
          const params = route.params as { id?: string; mode?: string };
          const isEditMode = params?.mode === "edit" || !!params?.id;

          return {
            headerShown: true,
            title: isEditMode ? "Edit Karyawan" : "Tambah Karyawan",
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
              color: colors.textPrimary,
            },
            headerTintColor: colors.primary,
          };
        }}
      />
      <Stack.Screen
        name="karyawan-transaksi"
        options={{
          headerShown: true,
          headerTitle: "Transaksi Karyawan",
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textPrimary,
          },
          headerTintColor: colors.primary,
        }}
      />
      <Stack.Screen
        name="developer-tools"
        options={{
          headerShown: true,
          headerTitle: "Developer Tools",
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textPrimary,
          },
          headerTintColor: colors.primary,
        }}
      />
      <Stack.Screen
        name="data-karyawan"
        options={{
          headerShown: true,
          headerTitle: "Data Karyawan",
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textPrimary,
          },
          headerTintColor: colors.primary,
        }}
      />
      <Stack.Screen
        name="detail-karyawan"
        options={{
          headerShown: true,
          headerTitle: "Detail Karyawan",
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textPrimary,
          },
          headerTintColor: colors.primary,
        }}
      />

      <Stack.Screen
        name="transaksi-form"
        options={({
          route,
        }: {
          route: {
            params?: {
              id?: string;
              mode?: string;
              karyawanId?: string;
              nama?: string;
            };
          };
        }) => {
          // Ambil parameter dari route
          const params = route.params as {
            id?: string;
            mode?: string;
            karyawanId?: string;
            nama?: string;
          };
          const namaKaryawan = params?.nama || "Karyawan";

          return {
            headerShown: true,
            title: ` ${namaKaryawan}`,
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
              color: colors.primary,
            },
            headerTintColor: colors.primary,
          };
        }}
      />

      <Stack.Screen
        name="detail-transaksi"
        options={{
          headerShown: true,
          headerTitle: "Detail Transaksi",
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.primary,
          },
          headerTintColor: colors.primary,
        }}
      />
    </Stack>
  );
}
