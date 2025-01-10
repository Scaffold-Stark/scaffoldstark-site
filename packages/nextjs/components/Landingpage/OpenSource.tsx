import Image from "next/image";
import { DecoreLayout } from "../DecoreLayout";
import { Header } from "./Header";
import { copyToClipBoard } from "~~/utils";

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  return (
    <div
      className="bg-white md:py-[11px] py-2 md:px-[13px] px-2 cursor-pointer copy-icon"
      onClick={() => copyToClipBoard(textToCopy)}
    >
      <Image src={"/assets/copy-icon.svg"} alt="icon" width={15} height={15} />
    </div>
  );
};
export const OpenSource = () => {
  return (
    <div className="relative bg-texture">
      <div className="bg-[#0F0F0F] relative z-50">
        <div className="max-w-[1200px] mx-auto !px-0 xl:border-r xl:border-l border-[#484848] relative">
          <Header />
          <div className="relative z-20 px-6 grid lg:grid-cols-7 grid-cols-1 md:gap-5 gap-0 lg:py-20 py-0 h-[500px] lg:h-auto">
            <div className="col-span-3 relative z-20 order-2 md:order-1 flex flex-col justify-end h-full py-9">
              <h1 className="font-medium md:text-[54px] text-[32px] text-center lg:text-left md:mb-[35px] mb-6 font-grotesk">
                <span className="font-bold text-[#B386FF]">Open-source</span> toolkit for building dApps on Starknet
              </h1>
              <p className="lg:max-w-[508px] max-w-max md:text-xl text-sm text-center lg:text-left text-[#BABABA] font-inter">
                Built using NextJS, Starknet.js, Scarb, Starknet-React, Starknet Foundry and Typescript. Designed to
                make it easier for developers to create, deploy and interact with smart contracts.
              </p>
            </div>
            <Image
              src={"/assets/opensource-mb.gif"}
              alt="gif"
              width={1000}
              height={10000}
              className="h-3/4 lg:hidden block absolute top-0 right-0 z-10"
            />
            <div className="lg:col-span-4 lg:block hidden relative md:order-1 order-2"></div>
            <Image
              src={"/assets/opensource-pc.gif"}
              alt="gif"
              width={1000}
              height={10000}
              className="absolute top-0 right-0 z-10 h-full lg:block hidden"
            />
          </div>
          <div className="flex flex-col md:flex-row md:border-t md:border-b border-[#484848] w-full relative z-20">
            <div className="flex items-center justify-between md:gap-8 gap-3 md:border-r border-y md:border-y-0 border-[#484848] p-5">
              <p className="md:text-[23px] text-sm font-medium font-grotesk text-ellipsis">npx create-starknet</p>
              <CopyButton textToCopy="npx create-starknet" />
            </div>
            <div className="flex flex-1 items-center justify-between md:gap-8 gap-3 p-5 border-y md:border-y-0 border-[#484848]">
              <p className="md:text-[23px] text-sm font-medium font-grotesk text-ellipsis md:tracking-widest md:leading-8">
                git clone https://github.com/Scaffold-Stark/scaffold-stark-2.git
              </p>
              <CopyButton textToCopy="git clone https://github.com/Scaffold-Stark/scaffold-stark-2.git" />
            </div>
          </div>
          <div className="bg-[#0F0F0F] md:h-20 h-10"></div>
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
