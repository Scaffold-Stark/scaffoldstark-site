"use client";

import { BrandAssetsBanner } from "~~/components/BrandAssets/BrandAssetsBanner";
import { BrandColor } from "~~/components/BrandAssets/BrandColor";
import { NetworkLogo } from "~~/components/BrandAssets/NetworkLogo";
import { ScaffoldFont } from "~~/components/BrandAssets/ScaffoldFont";
import { DecoreLayout } from "~~/components/DecoreLayout";
import { Footer } from "~~/components/Landingpage/Footer";

function Page() {
  return (
    <div className="bg-white flex flex-col gap-28">
      <BrandAssetsBanner />
      <NetworkLogo />
      <ScaffoldFont />
      <BrandColor />
      <div className="mt-28">
        {/* <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mb-0.5" /> */}
        <div className="relative rotate-180">
          <DecoreLayout />
        </div>
        <div className="bg-[#0F0F0F] py-5">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Page;
