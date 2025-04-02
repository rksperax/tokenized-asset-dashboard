import { create } from "zustand";
import { Asset } from "@/types";
import fetchAssets from "@/utils/fetchAssets";

interface AssetsStore {
  assets: Asset[];
  fetchAssets: () => Promise<void>;
  error: string | null;
}

const useAssetsStore = create<AssetsStore>((set) => ({
  assets: [],
  error: null,
  fetchAssets: async () => {
    try {
      const data = await fetchAssets(); // Fetch assets from API or mock JSON
      set({ assets: data, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));

// Polling every 10 seconds
setInterval(() => {
  useAssetsStore.getState().fetchAssets();
}, 10000);

export default useAssetsStore;
