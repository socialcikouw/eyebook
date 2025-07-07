import { colors } from "@/src/lib/styles/colors";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const sizeIcon = 26;
  const fontSize = 11;
  const fontWeight = "600";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textPrimary,
        headerStyle: {
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 80,
          paddingBottom: Platform.OS === "ios" ? 25 : 12,
          paddingTop: 8,
          paddingHorizontal: 15,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: fontSize,
          fontWeight: fontWeight,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Partners",
          headerTitle: "NaelCapital",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary,
          },
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "account-group" : "account-group-outline"}
              color={color}
              size={sizeIcon}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/(modals)/karyawan-form")}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="add-circle" size={32} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="peringkat"
        options={{
          title: "Peringkat",
          headerTitle: "Peringkat Karyawan",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary,
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "trophy" : "trophy-outline"}
              color={color}
              size={sizeIcon}
            />
          ),
        }}
      />

      {/* Tombol tengah untuk halaman Global */}
      <Tabs.Screen
        name="tambah"
        options={{
          title: "Tambah",
          headerTitle: "Tambah Transaksi",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary,
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerButtonWrapper}>
              <View
                style={[
                  styles.centerButton,
                  focused && styles.centerButtonFocused,
                ]}
              >
                <Ionicons
                  name="add-circle"
                  size={30}
                  color={focused ? "#f9f9f9" : colors.textPrimary}
                />
              </View>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarItemStyle: { height: 70 },
        }}
      />

      <Tabs.Screen
        name="ledger"
        options={{
          title: "Ledger",
          headerTitle: "Ledger",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary,
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              color={color}
              size={sizeIcon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="setelan"
        options={{
          title: "Setelan",
          headerTitle: "Setelan",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary,
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={sizeIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButtonWrapper: {
    position: "absolute",
    top: -25,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonFocused: {
    backgroundColor: colors.primary,
  },
});
