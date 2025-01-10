"use client";

import { BrandAssetsBanner } from "~~/components/BrandAssets/BrandAssetsBanner";
import { BrandColor } from "~~/components/BrandAssets/BrandColor";
import { NetworkLogo } from "~~/components/BrandAssets/NetworkLogo";
import { ScaffoldFont } from "~~/components/BrandAssets/ScaffoldFont";
import { DecoreLayout } from "~~/components/DecoreLayout";
import { Footer } from "~~/components/Landingpage/Footer";

function Page() {
  return (
    <div className="bg-white flex flex-col md:gap-28 gap-12">
      <BrandAssetsBanner />
      <NetworkLogo />
      <ScaffoldFont />
      <BrandColor />
      <div className="mt-28">
        {/* <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mb-0.5" /> */}
        <div className="relative rotate-180">
          <DecoreLayout />
        </div>
        <div className="bg-[#0F0F0F] py-5 relative z-50 md:block hidden">
          <Footer />
        </div>
        <div className="bg-[#0F0F0F] pt-10 absolute w-full -bottom-[10px] z-50 md:hidden block">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Page;
