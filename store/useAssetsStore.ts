import { create } from 'zustand';
import { Asset } from '@/types';
import fetchAssets from '@/utils/fetchAssets';

interface AssetsStore {
  assets: Asset[];
  fetchAssets: () => Promise<void>;
}

const useAssetsStore = create<AssetsStore>((set) => ({
  assets: [],
  
  fetchAssets: async () => {
    try {
      const data = await fetchAssets(); // Fetch assets from API or mock JSON
      set({ assets: data });
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    }
  }
}));

// // Polling every 10 seconds
// setInterval(() => {
//     useAssetsStore.getState().fetchAssets();
//   }, 10000);

export default useAssetsStore;
