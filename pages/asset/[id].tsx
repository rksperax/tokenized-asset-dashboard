import { useRouter } from "next/router";
import { useEffect } from "react";
import AssetDetails from "@/components/AssetDetails";
import useAssetDetailStore from "@/store/useAssetDetailStore";

const AssetPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get asset ID from URL
  const { asset, fetchAssetDetail } = useAssetDetailStore();

  console.log({ asset });

  useEffect(() => {
    if (id) {
      fetchAssetDetail(id as string);
    }
  }, [fetchAssetDetail, id]);

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p>Loading asset details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AssetDetails asset={asset} />
    </div>
  );
};

export default AssetPage;
