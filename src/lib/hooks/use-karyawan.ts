import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native"; // Ganti react-toastify kalau di web
import {
  addKaryawan,
  deleteKaryawan,
  getAllKaryawan,
  getKaryawanById,
  updateKaryawan,
} from "../api/karyawan.api";
import { KaryawanType } from "../types/karyawan.types";

export const KARYAWAN_KEY = ["karyawan"];

export const useKaryawan = () => {
  return useQuery({
    queryKey: KARYAWAN_KEY,
    queryFn: getAllKaryawan,
    staleTime: 1000 * 60 * 5,
    placeholderData: [] as KaryawanType[],
    select: (data) => data.sort((a, b) => b.saldo_awal - a.saldo_awal),
  });
};

export const useKaryawanById = (id: number) => {
  return useQuery({
    queryKey: [...KARYAWAN_KEY, id],
    queryFn: () => getKaryawanById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddKaryawan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addKaryawan,
    onMutate: async (newKaryawan) => {
      await queryClient.cancelQueries({ queryKey: KARYAWAN_KEY });
      const previousData = queryClient.getQueryData(KARYAWAN_KEY);
      queryClient.setQueryData(KARYAWAN_KEY, (old: any) => [
        ...(old || []),
        newKaryawan,
      ]);
      return { previousData };
    },
    onError: (error, _newKaryawan, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(KARYAWAN_KEY, context.previousData);
      }
      console.error("Gagal menambahkan karyawan:", error);
      Alert.alert("Error", "Gagal menambahkan karyawan.");
    },
    onSuccess: () => {
      router.back();
      Alert.alert("Sukses", "Karyawan berhasil ditambahkan.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: KARYAWAN_KEY });
    },
  });
};

export const useUpdateKaryawan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateKaryawan,
    onMutate: async (updatedKaryawan) => {
      await queryClient.cancelQueries({ queryKey: KARYAWAN_KEY });
      const previousData = queryClient.getQueryData(KARYAWAN_KEY);
      queryClient.setQueryData(KARYAWAN_KEY, (old: any) =>
        old?.map((item: any) =>
          item.id === updatedKaryawan.id ? updatedKaryawan : item
        )
      );
      return { previousData };
    },
    onError: (error, _updatedKaryawan, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(KARYAWAN_KEY, context.previousData);
      }
      console.error("Gagal mengupdate karyawan:", error);
      Alert.alert("Error", "Gagal mengupdate karyawan.");
    },
    onSuccess: () => {
      router.back();
      Alert.alert("Sukses", "Karyawan berhasil diupdate.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: KARYAWAN_KEY });
    },
  });
};

export const useDeleteKaryawan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteKaryawan,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: KARYAWAN_KEY });
      const previousData = queryClient.getQueryData(KARYAWAN_KEY);
      queryClient.setQueryData(KARYAWAN_KEY, (old: any) =>
        old?.filter((item: any) => item.id !== id)
      );
      return { previousData };
    },
    onError: (error, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(KARYAWAN_KEY, context.previousData);
      }
      console.error("Gagal menghapus karyawan:", error);
      Alert.alert("Error", "Gagal menghapus karyawan.");
    },
    onSuccess: () => {
      Alert.alert("Sukses", "Karyawan berhasil dihapus.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: KARYAWAN_KEY });
    },
  });
};
