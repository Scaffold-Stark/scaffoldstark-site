import Image from "next/image";
import TypeAnimation from "../TypeAnimation";
import { REDIRECT_LINK } from "~~/helper/redirect";

export const DebugContract = () => {
  return (
    <section className="content grid grid-cols-1 lg:grid-cols-2 items-center lg:py-12 py-0">
      <div className="item-spacing-col col-span-1">
        <p className="subTitle-section">DEBUG CONTRACT</p>
        <TypeAnimation
          sequence={["Your frontend auto-adapts to your smart contract as you edit it."]}
          wrapper="span"
          cursor={false}
          speed={50}
          className="title-section max-w-[380px] md:min-h-[130px] min-h-[50px]"
        />
        <p className="text-[#6B7280] lg:text-lg text-sm max-w-[530px] font-inter">
          Debug and refine your smart contracts with a live-updating frontend. Scaffold-Stark is an ideal stack for
          progressing from rapid prototyping to production-grade dApps.
        </p>
        <div className="flex flex-col lg:gap-2 gap-0 lg:mt-16 mt-0">
          <div
            className="flex gap-2 hover-text w-fit"
            onClick={() => window.open(REDIRECT_LINK.scaffoldDemo, "_blank")}
          >
            <p className="title-section !text-lg font-inter !font-bold">Checkout this sample scaffold-stark dApp</p>
            <Image src="/assets/redirect-icon.svg" alt="redirect" width="15" height="15" className="w-auto h-auto" />
          </div>

          <div
            className="flex gap-2  mt-2 hover-text w-fit"
            onClick={() => window.open(REDIRECT_LINK.speedrun, "_blank")}
          >
            <p className="title-section !text-lg font-inter !font-bold">Learn how to use it</p>
            <Image src="/assets/redirect-icon.svg" alt="redirect" width="15" height="15" className="w-auto h-auto" />
          </div>
        </div>
      </div>
      <div className="col-span-1 relative">
        <Image src="/assets/debug.svg" alt="debug" width={800} height={525} className="mt-5 lg:mt-0" />
        <div className="absolute transform left-1/2 top-3/4 w-[170px] h-[222px] animate-custom-bounce">
          <Image
            src="/assets/connect-wallet.svg"
            alt="wallet"
            width={170}
            height={222}
            className="transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </section>
  );
};
