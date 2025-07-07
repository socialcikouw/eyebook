import { useDeleteKaryawan } from "@/src/lib/hooks/use-karyawan";
import { colors } from "@/src/lib/styles/colors";
import { KaryawanType } from "@/src/lib/types/karyawan.types";
import React from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DataCard from "./DataCard";

interface DataListProps {
  data: KaryawanType[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onKaryawanPress?: (karyawan: KaryawanType) => void;
  onEditKaryawan?: (karyawan: KaryawanType) => void;
}

export default function DataList({
  data,
  isLoading = false,
  onRefresh,
  onKaryawanPress,
  onEditKaryawan,
}: DataListProps) {
  const deleteKaryawanMutation = useDeleteKaryawan();

  // Handler untuk konfirmasi delete karyawan
  const handleDeleteKaryawan = (karyawan: KaryawanType) => {
    Alert.alert(
      "Hapus Karyawan",
      `Apakah Anda yakin ingin menghapus karyawan "${karyawan.nama}"?\n\nData ini akan dihapus permanen dan tidak dapat dikembalikan.`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            deleteKaryawanMutation.mutate(karyawan.id);
          },
        },
      ]
    );
  };

  // Render item untuk FlatList
  const renderKaryawanItem = ({ item }: { item: KaryawanType }) => (
    <DataCard
      karyawan={item}
      onPress={() => onKaryawanPress?.(item)}
      onEdit={() => onEditKaryawan?.(item)}
      onDelete={() => handleDeleteKaryawan(item)}
    />
  );

  // Header komponen dengan jumlah karyawan
  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {data.length === 0
          ? "Tambahkan Karyawan"
          : `Total ${data.length} Karyawan`}
      </Text>
    </View>
  );

  // Key extractor untuk FlatList
  const keyExtractor = (item: KaryawanType, index: number) => {
    // Gunakan fallback index jika id tidak tersedia
    return item?.id ? item.id.toString() : `fallback-${index}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderKaryawanItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          ) : undefined
        }
        // Optimisasi performa
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        // Separators jika diperlukan
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
  },
  separator: {
    height: 4,
  },
});
