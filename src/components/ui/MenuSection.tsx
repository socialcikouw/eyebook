import { colors } from "@/src/lib/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Type menu item
export interface MenuItemProps {
  title: string;
  lefticon: keyof typeof Ionicons.glyphMap;
  righticon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface MenuSectionProps {
  sectionTitle: string;
  items: MenuItemProps[];
}

// Menu item reusable
const MenuItem = ({ title, lefticon, righticon, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={lefticon} size={24} color={colors.textPrimary} />
      <Text style={styles.menuText}>{title}</Text>
    </View>
    <Ionicons name={righticon} size={20} color={colors.textSecondary} />
  </TouchableOpacity>
);

export const MenuSection = ({ sectionTitle, items }: MenuSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {items.map((item, index) => (
        <MenuItem
          key={`${item.title}-${index}`}
          title={item.title}
          lefticon={item.lefticon}
          righticon={item.righticon}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: "600",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
});
