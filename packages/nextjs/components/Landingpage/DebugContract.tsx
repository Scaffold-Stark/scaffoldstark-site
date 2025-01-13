import Image from "next/image";
import { REDIRECT_LINK } from "~~/helper/redirect";

export const DebugContract = () => {
  return (
    <section className="content grid grid-cols-1 lg:grid-cols-2 items-center !lg:py-10 py-0">
      <div className="item-spacing-col col-span-1">
        <p className="subTitle-section">DEBUG CONTRACT</p>
        <p className="title-section max-w-[380px]">Your frontend auto-adapts to your smart contract as you edit it.</p>
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
            <Image src="/assets/redirect-icon.svg" alt="redirect" width="15" height="15" />
          </div>

          <div className="mt-2 hover-text w-fit" onClick={() => window.open(REDIRECT_LINK.speedrun, "_blank")}>
            <p className="title-section !text-lg font-inter !font-bold">Learn how to use it</p>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <Image src="/assets/debug.png" alt="debug" width={800} height={525} className="mt-5 lg:mt-0" />
      </div>
    </section>
  );
};
