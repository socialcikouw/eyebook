import { useKaryawanById } from "@/src/lib/hooks/use-karyawan";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function KaryawanTransaksi() {
  const { id } = useLocalSearchParams();
  const { data: karyawan } = useKaryawanById(Number(id));
  console.log(karyawan);
  return (
    <View>
      <Text>{karyawan?.nama}</Text>
    </View>
  );
}
