
# Tokenized Asset Dashboard 
(Demo link: https://tokenized-asset-dashboard.vercel.app/)



## App Functionalities

1. A grid of tokenized assets with asset name, token id, asset type,current value and thumbnail.
2. Added Search bar to search by name and token id.
3. Filter Type and price filter
4. Added detailed screen with additional information like asset description and price trend based on 1D,1W,1M and 1Y.
5. Added polling using set interval to get refresh data every 30s (increased timer because of coingecko app limit).
5. Handled error like 429 api uses limit.
6. Added page loader
7. Responsive for mobile and desktop devices.
8. Wallet connect button to enable Metamask wallet connection.


## Getting Started

Use the following commands to run:

```bash
1. npm install or yarn install
2. npm run dev or yarn dev
3. Visit http://localhost:3000 on your local browser
```



## Tech Stack Used

- **Frontend Framework**: Next.js (for SSR/SSG benefits) a framework based on react with typescript

- **UI Library**: Tailwind CSS (for rapid styling)

- **State Management**: Zustand (lightweight state management)

- **API Integration**: CoinGecko (to simulate tokenized asset data)

- **Real-time Updates**: Polling with setInterval

- **Wallet Connection Simulation**: ethers.js for wallet connection


## Project structure


```bash
│── /components
│   ├── AssetCard.tsx
│   ├── AssetDetails.tsx
│   ├── SearchBar.tsx
│   ├── Filters.tsx
│   ├── WalletButton.tsx
│── /pages
│   ├── index.tsx (Dashboard)
│   ├── asset/[id].tsx (Asset Details)
│── /store
│   ├── useAssetsStore.ts
│── /utils
│   ├── fetchAssets.ts
│── /public
│   ├── images/
│── styles
│── README.md
│── package.json
│── tsconfig.json
│── next.config.js

```