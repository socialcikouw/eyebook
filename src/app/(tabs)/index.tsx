import { useKaryawan } from "@/src/lib/hooks/use-karyawan";
import { colors } from "@/src/lib/styles/colors";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function index() {
  const { data: karyawan = [], isLoading } = useKaryawan();
  const handlePush = (id: number) => {
    router.push(`/(modals)/detail-transaksi?id=${id}`);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Memuat data karyawan...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>
        {karyawan.map((item) => (
          <TouchableOpacity
            key={`karyawan-${item.id}`}
            style={styles.itemContainer}
            onPress={() => handlePush(item.id)}
          >
            <Text style={styles.itemName}>{item.nama}</Text>
            <Text style={styles.itemRessort}>{item.ressort}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  list: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  itemRessort: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 50,
  },
});
