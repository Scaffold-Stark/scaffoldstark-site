import { useEffect, useState } from "react";
import Image from "next/image";
import { DecoreLayout } from "../DecoreLayout";
import TypeAnimation from "../TypeAnimation";
import { Header } from "./Header";
import { copyToClipBoard } from "~~/utils";

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  return (
    <div
      className="bg-white md:py-[11px] py-2 md:px-[13px] px-2 cursor-pointer copy-icon"
      onClick={() => copyToClipBoard(textToCopy)}
    >
      <Image src={"/assets/copy-icon.svg"} alt="icon" width={15} height={15} className="w-auto h-auto" />
    </div>
  );
};
export const OpenSource = () => {
  const [showSecondText, setShowSecondText] = useState(false);

  useEffect(() => {
    const firstAnimationTime = "Open-source".length * 50 + 1000;

    const timer = setTimeout(() => {
      setShowSecondText(true);
    }, firstAnimationTime);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative bg-texture">
      <div className="bg-[#0D0D0D] relative z-50">
        <Image
          src={"/assets/bg-texture.png"}
          alt="img"
          height={100}
          width={1000}
          className="absolute max-h-[110%] h-[110%] w-full"
        />
        <div className="max-w-[1200px] mx-auto !px-0 xl:border-r xl:border-l border-[#484848] relative overflow-hidden">
          <div className="w-full">
            <Image
              src={"/assets/opensource-mb.gif"}
              alt="gif"
              width={10000}
              height={10000}
              className="lg:hidden block absolute -left-[75vw] -z-10 max-w-[250vw]"
            />
          </div>
          <Header />
          <div className="relative mt-[70vw] sm:mt-[80vw] md:mt-[90vw] lg:mt-0 flex lg:h-auto">
            <div className="relative order-2 md:order-1 flex flex-col justify-end h-full py-10 md:py-32 lg:border-r mt-28 md:mt-0 border-[#484848]">
              <h1 className="lg:max-w-[550px] max-w-[36rem] md:min-w-[36rem] md:min-h-[177px] min-h-[104px] font-medium md:text-[54px] text-[32px] text-center lg:text-left md:mb-[35px] mx-auto mb-6 px-5 font-grotesk">
                <TypeAnimation
                  sequence={["Open-source"]}
                  wrapper="span"
                  cursor={false}
                  speed={60}
                  className="font-bold text-[#B386FF]"
                />
                {showSecondText && (
                  <TypeAnimation
                    sequence={[" toolkit for building dApps on Starknet"]}
                    wrapper="span"
                    cursor={false}
                    speed={60}
                  />
                )}
              </h1>
              <p className="lg:max-w-[508px] max-w-full md:text-xl text-sm text-center lg:text-left text-[#BABABA] px-5 font-inter">
                Built using NextJS, Starknet.js, Scarb, Starknet-React, Starknet Foundry and Typescript. Designed to
                make it easier for developers to create, deploy and interact with smart contracts.
              </p>
              <div className="flex items-center justify-between md:gap-8 gap-3 border-y border-[#484848] p-5 mt-20 w-full">
                <p className="md:text-[22px] text-sm font-medium font-grotesk text-ellipsis">npx create-stark@latest</p>
                <CopyButton textToCopy="npx create-stark@latest" />
              </div>
            </div>
            <div className="lg:col-span-4 lg:block hidden relative md:order-1 order-2"></div>
            <Image
              src={"/assets/opensource-pc.gif"}
              alt="gif"
              width={1000}
              height={10000}
              className="absolute top-0 left-[22vw] xl:left-72 -z-10 h-full lg:block hidden"
            />
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
