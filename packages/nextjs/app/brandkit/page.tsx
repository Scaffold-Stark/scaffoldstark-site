"use client";

import Image from "next/image";
import { BrandAssetsBanner } from "~~/components/BrandAssets/BrandAssetsBanner";
import { BrandColor } from "~~/components/BrandAssets/BrandColor";
import { NetworkLogo } from "~~/components/BrandAssets/NetworkLogo";
import { Footer } from "~~/components/Landingpage/Footer";

function Page() {
  return (
    <div className="bg-white">
      <BrandAssetsBanner />
      <NetworkLogo />
      <BrandColor />
      <div className="mt-20">
        <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mb-0.5" />
        <div className="bg-[#0F0F0F] py-5">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Page;
