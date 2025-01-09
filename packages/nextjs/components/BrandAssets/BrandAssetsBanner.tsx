import Image from "next/image";
import { Header } from "../Landingpage/Header";

export const BrandAssetsBanner = () => {
  return (
    <div className="bg-texture relative">
      <div className="bg-[#0F0F0F] relative z-50">
        <div className="max-w-[1222px] mx-auto !px-0 border-r border-l border-[#484848] relative">
          <Header />
          <div className="px-6 grid grid-cols-6 py-20">
            <div className="col-span-3 flex flex-col justify-center">
              <h2 className="font-medium text-[54px] mb-[35px]">
                <span className="font-bold text-[#B386FF]">Brand</span> Assets
              </h2>
              <p className="max-w-[508px] text-xl text-[#BABABA]">
                The marketing of Scaffold-Stark in any form of digital or printed communications requires compliance
                with the following guidelines.
              </p>
              <div className="mt-6">
                <button className="header-item-btn !py-3 !w-full max-w-[195px]">Download Logo</button>
              </div>
            </div>
            <div className="col-span-3">
              <Image src={"/assets/brandassets-banner.png"} alt="gif" width={1000} height={10000} />
            </div>
          </div>
        </div>
      </div>
      <Image
        src={"/assets/decore-top.png"}
        alt="decore"
        width={10000}
        height={10000}
        className="absolute -bottom-14 z-10 rotate-180"
      />
    </div>
  );
};
