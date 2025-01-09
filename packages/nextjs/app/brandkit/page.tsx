"use client";

import { BrandAssetsBanner } from "~~/components/BrandAssets/BrandAssetsBanner";
import { BrandColor } from "~~/components/BrandAssets/BrandColor";
import { NetworkLogo } from "~~/components/BrandAssets/NetworkLogo";

function Page() {
  return (
    <div className="bg-white">
      <BrandAssetsBanner />
      <NetworkLogo />
      <BrandColor />
    </div>
  );
}

export default Page;
