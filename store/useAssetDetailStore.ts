import { create } from "zustand";
import fetchAssetDetail from "@/utils/fetchAssetDetail";
import { AssetDetailProps } from "@/types/assetDetail";

interface AssetsStore {
  asset: AssetDetailProps | null;
  fetchAssetDetail: (id: string) => Promise<void>;
}

const useAssetDetailStore = create<AssetsStore>((set) => ({
  asset: null,

  fetchAssetDetail: async (id) => {
    try {
      const data = await fetchAssetDetail(id); // Fetch assets from API or mock JSON
      set({ asset: data });
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    }
  },
}));

// // Polling every 10 seconds

export default useAssetDetailStore;
