import { create } from "zustand";
import fetchAssetDetail from "@/utils/fetchAssetDetail";
import { AssetDetailProps } from "@/types/assetDetail";

interface AssetsStore {
  asset: AssetDetailProps | null;
  fetchAssetDetail: (id: string) => Promise<void>;
  error: string | null;
}

const useAssetDetailStore = create<AssetsStore>((set) => ({
  asset: null,
  error: null,
  fetchAssetDetail: async (id) => {
    try {
      const data = await fetchAssetDetail(id); // Fetch assets from API
      set({ asset: data, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));

// Polling every 30 seconds
setInterval(() => {
  const id = window.location.pathname.split("/")[2];
  useAssetDetailStore.getState().fetchAssetDetail(id);
}, 30000);

export default useAssetDetailStore;
