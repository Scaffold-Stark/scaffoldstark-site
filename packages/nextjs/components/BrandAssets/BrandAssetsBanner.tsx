import Image from "next/image";
import { DecoreLayout } from "../DecoreLayout";
import { Header } from "../Landingpage/Header";
import TypeAnimation from "../TypeAnimation";

export const BrandAssetsBanner = () => {
  return (
    <div className="bg-texture relative">
      <div className="bg-[#0F0F0F] relative z-30">
        <div className="max-w-[1200px] mx-auto !px-0 xl:border-r xl:border-l border-[#484848] relative">
          <Header />
          <div className="px-6 grid grid-cols-6 py-20">
            <div className="mt-14 lg:mt-0 lg:col-span-3 col-span-6 flex flex-col lg:items-start items-center justify-center max-lg:order-last">
              <h2 className="font-medium md:text-[54px] text-3xl lg:mb-[35px] mb-3 font-inter">
                <span className="text-[#B386FF]">Brand </span>
                <TypeAnimation sequence={["Assets"]} wrapper="span" cursor={false} speed={1} />
              </h2>
              <p className="max-w-[508px] md:text-xl text-sm text-[#BABABA] lg:text-left text-center font-grotesk">
                The marketing of Scaffold-Stark in any form of digital or printed communications requires compliance
                with the following guidelines.
              </p>
              <a
                className="header-item-btn !py-3 !w-full max-w-[195px] mt-6"
                href="/assets/logo-text-scaffold.png"
                download={"/assets/logo-text-scaffold.png"}
              >
                Download Logo
              </a>
            </div>
            <div className="lg:col-span-3 col-span-6 mx-auto max-lg:order-first">
              <Image
                src={"/assets/brandassets-banner.png"}
                alt="gif"
                width={1000}
                height={10000}
                className="lg:w-auto w-[230px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Image
        src={"/assets/decore-top.png"}
        alt="decore"
        width={10000}
        height={10000}
        className="absolute -bottom-14 z-10 rotate-180"
      /> */}
      <div className="relative -top-[52px]">
        <DecoreLayout />
      </div>
    </div>
  );
};
