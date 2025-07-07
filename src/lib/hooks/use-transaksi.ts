import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";
import {
  addTransaksi,
  deleteTransaksi,
  getAllTransaksi,
  getTransaksiById,
  getTransaksiByKaryawanId,
  updateTransaksi,
} from "../api/transaksi.api";
import { TransaksiType } from "../types/transaksi.types";

export const TRANSAKSI_KEY = ["transaksi"];

export const useTransaksi = () => {
  return useQuery({
    queryKey: TRANSAKSI_KEY,
    queryFn: getAllTransaksi,
    staleTime: 1000 * 60 * 5,
    placeholderData: [] as TransaksiType[],
    select: (data) => data.sort((a, b) => b.transaksi_id - a.transaksi_id),
  });
};

export const useTransaksiById = (transaksi_id: number) => {
  return useQuery({
    queryKey: [...TRANSAKSI_KEY, transaksi_id],
    queryFn: () => getTransaksiById(transaksi_id),
    enabled: !!transaksi_id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTransaksiByKaryawanId = (karyawan_id: number) => {
  return useQuery({
    queryKey: [...TRANSAKSI_KEY, "karyawan", karyawan_id],
    queryFn: () => getTransaksiByKaryawanId(karyawan_id),
    enabled: !!karyawan_id,
    staleTime: 1000 * 60 * 5,
    placeholderData: [] as TransaksiType[],
  });
};

export const useAddTransaksi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaksi,
    onMutate: async (newTransaksi) => {
      await queryClient.cancelQueries({ queryKey: TRANSAKSI_KEY });
      const previousData = queryClient.getQueryData(TRANSAKSI_KEY);
      queryClient.setQueryData(TRANSAKSI_KEY, (old: any) => [
        ...(old || []),
        newTransaksi,
      ]);
      return { previousData };
    },
    onError: (error, _newTransaksi, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(TRANSAKSI_KEY, context.previousData);
      }
      console.error("Gagal menambahkan transaksi:", error);
      Alert.alert("Error", "Gagal menambahkan transaksi.");
    },
    onSuccess: () => {
      Alert.alert("Sukses", "Transaksi berhasil ditambahkan.", [
        {
          text: "OK",
          onPress: () => {
            setTimeout(() => {
              try {
                router.back();
              } catch (error) {
                console.error("Error navigating:", error);
                router.back();
              }
            }, 500);
          },
        },
      ]);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TRANSAKSI_KEY });
    },
  });
};

export const useUpdateTransaksi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaksi,
    onMutate: async (updatedTransaksi) => {
      await queryClient.cancelQueries({ queryKey: TRANSAKSI_KEY });
      const previousData = queryClient.getQueryData(TRANSAKSI_KEY);
      queryClient.setQueryData(TRANSAKSI_KEY, (old: any) =>
        old?.map((item: any) =>
          item.transaksi_id === updatedTransaksi.transaksi_id
            ? updatedTransaksi
            : item
        )
      );
      return { previousData };
    },
    onError: (error, _updatedTransaksi, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(TRANSAKSI_KEY, context.previousData);
      }
      console.error("Gagal mengupdate transaksi:", error);
      Alert.alert("Error", "Gagal mengupdate transaksi.");
    },
    onSuccess: () => {
      router.back();
      Alert.alert("Sukses", "Transaksi berhasil diupdate.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TRANSAKSI_KEY });
    },
  });
};

export const useDeleteTransaksi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaksi,
    onMutate: async (transaksi_id) => {
      await queryClient.cancelQueries({ queryKey: TRANSAKSI_KEY });
      const previousData = queryClient.getQueryData(TRANSAKSI_KEY);
      queryClient.setQueryData(TRANSAKSI_KEY, (old: any) =>
        old?.filter((item: any) => item.transaksi_id !== transaksi_id)
      );
      return { previousData };
    },
    onError: (error, _transaksi_id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(TRANSAKSI_KEY, context.previousData);
      }
      console.error("Gagal menghapus transaksi:", error);
      Alert.alert("Error", "Gagal menghapus transaksi.");
    },
    onSuccess: () => {
      Alert.alert("Sukses", "Transaksi berhasil dihapus.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TRANSAKSI_KEY });
    },
  });
};
