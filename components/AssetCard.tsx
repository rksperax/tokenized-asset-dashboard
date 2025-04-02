import Image from "next/image";
import { useRouter } from "next/router";
import { Asset } from "@/types";

interface AssetCardProps {
  asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/asset/${asset.tokenId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      role="button"
      aria-label={`View details for ${asset.name}`}>
      <Image
        src={asset.image || "/images/placeholder.png"} // Fallback image
        alt={asset.name}
        width={200}
        height={200}
        className="rounded-md"
        priority // Improves performance for above-the-fold images
      />
      <h2 className="text-lg font-bold mt-2">{asset.name}</h2>
      <p>Token ID: {asset.tokenId}</p>
      <p>Type: {asset.type}</p>
      <p className="font-semibold text-green-600">${asset.value}</p>
    </div>
  );
};

export default AssetCard;
