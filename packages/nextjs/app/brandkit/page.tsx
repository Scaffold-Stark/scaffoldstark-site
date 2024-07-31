import Image from "next/image";
import { Manrope, Space_Grotesk } from "@next/font/google";
import { Inter } from "@next/font/google";
import { DM_Sans } from "@next/font/google";

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const InterFont = Inter({
  subsets: ["latin"],
});

const DmSans = DM_Sans({
  subsets: ["latin"],
});

const ManropeFont = Manrope({
  subsets: ["latin"],
});

function Page() {
  return (
    <div>
      <div
        className="flex flex-col justify-center items-center py-8 gap-4 md:gap-4 h-[630px]"
        style={{
          backgroundImage: `url(/background.svg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex relative w-14 h-14 p-3 rounded-full">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/icon.svg" />
          </div>
          <p className="text-3xl m-0 font-medium mt-1 text-[#290C4F]">Scaffold-Stark</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-8 mb-14 px-4 text-black">
          <h1 className={`text-center text-3xl lg:text-3xl max-w-md lg:max-w-2xl px-3 m-0 ${SpaceGrotesk.className}`}>
            Media Toolkit{" "}
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center my-12">
        <span className="px-24 text-[24px] text-gradient-2 font-bold py-5 font-arial">Logo</span>
        <div className="flex gap-11 justify-center">
          <div className="border border-[#7646C8] w-5/12">
            <div className=" flex flex-col justify-center items-center py-10">
              <Image src="icon.svg" alt="logo" width={80} height={80} />
            </div>
            <div className="border border-t-[#7646C8] flex justify-center items-center py-6">
              <a href="/icon.svg" download="icon.svg" className={`text-gradient text-xl ${SpaceGrotesk.className}`}>
                Download
              </a>
            </div>
          </div>
          <div className="border border-[#7646C8] w-5/12">
            <div className="flex gap-4 justify-center items-center py-10">
              <Image src="icon.svg" alt="logo" width={80} height={80} />
              <span className="text-3xl font-medium">Scaffold-Stark</span>
            </div>
            <div className="border border-t-[#7646C8] flex justify-center items-center py-6">
              <a href="/icon.svg" download="icon.svg" className={`text-gradient text-xl ${SpaceGrotesk.className}`}>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center my-12 px-24">
        <span className="mt-4 text-[24px] text-gradient-2 font-bold font-arial">Typography</span>
        <div className="w-full mt-6">
          <div className="flex justify-between border-b border-b-[#E2E8F0] py-6">
            <div className={`flex flex-col ${DmSans.className}`}>
              <span className="text-xs">DM Sans By Colophon Foundry</span>
              <span className="text-2xl">DM Sans</span>
            </div>
            <div className="flex justify-center">
              <a
                className={`border border-[#9B5584] py-3 px-9 rounded-[14px] ${SpaceGrotesk.className}`}
                href="https://fonts.google.com/specimen/DM+Sans?query=dm+sans"
                target="_blank"
              >
                Download
              </a>
            </div>
          </div>
          <div className="flex justify-between border-b border-b-[#E2E8F0] py-6">
            <div className={`flex flex-col ${InterFont.className}`}>
              <span className="text-xs">Inter By Rasmus Andersson</span>
              <span className="text-2xl">Inter</span>
            </div>
            <div className="flex justify-center">
              <a
                className={`border border-[#9B5584] py-3 px-9 rounded-[14px] ${SpaceGrotesk.className}`}
                href="https://fonts.google.com/specimen/Inter?query=dm+sans"
                target="_blank"
              >
                Download
              </a>
            </div>
          </div>
          <div className="flex justify-between border-b border-b-[#E2E8F0] py-6">
            <div className={`flex flex-col ${ManropeFont.className}`}>
              <span className="text-xs">Manrope By Mikhail Sharanda</span>
              <span className="text-2xl">Manrope</span>
            </div>
            <div className="flex justify-center">
              <a
                className={`border border-[#9B5584] py-3 px-9 rounded-[14px] ${SpaceGrotesk.className}`}
                href="https://fonts.google.com/specimen/Manrope?query=dm+sans"
                target="_blank"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-12 mb-20 px-24">
        <span className="my-4 text-[24px] text-gradient-2 font-bold font-arial">Colors</span>
        <div>
          <span>Light Theme</span>
          <div className="w-full flex my-5">
            <div className="w-1/6 card-1 h-[130px]"></div>
            <div className="w-1/6 card-2 h-[130px]"></div>
            <div className="w-1/6 card-3 h-[130px]"></div>
            <div className="w-1/6 bg-[#00A3FF] h-[130px]"></div>
            <div className="w-1/6 bg-[#8B45FD] h-[130px]"></div>
            <div className="w-1/6 bg-[#7800FF] h-[130px]"></div>
          </div>
        </div>
        <div className="mt-6">
          <span className="">Dark Theme</span>
          <div className="w-full flex my-5">
            <div className="w-1/6 card-2 h-[130px]"></div>
            <div className="w-1/6 card-3 h-[130px]"></div>
            <div className="w-1/6 card-4 h-[130px]"></div>
            <div className="w-1/6 bg-[#0FF] h-[130px]"></div>
            <div className="w-1/6 bg-[#5368B4] h-[130px]"></div>
            <div className="w-1/6 bg-[#141A30] h-[130px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
