import { useState } from "react";
import { ethers } from "ethers";

const WalletButton: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]); // Store the first account
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask or another Web3 wallet is required.");
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
      {walletAddress
        ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
};

export default WalletButton;
