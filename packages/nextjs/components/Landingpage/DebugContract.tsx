import Image from "next/image";
import { REDIRECT_LINK } from "~~/helper/redirect";

export const DebugContract = () => {
  return (
    <section className="content flex items-center !pt-10">
      <div className="item-spacing-col">
        <p className="subTitle-section">DEBUG CONTRACT</p>
        <p className="title-section max-w-[380px]">Your frontend auto-adapts to your smart contract as you edit it.</p>
        <p className="text-[#6B7280] text-lg max-w-[530px]">
          Debug and refine your smart contracts with a live-updating frontend. Scaffold-Stark is an ideal stack for
          progressing from rapid prototyping to production-grade dApps.
        </p>
        <div className="flex flex-col gap-2 mt-16">
          <div
            className="flex gap-2 hover-text w-fit"
            onClick={() => window.open(REDIRECT_LINK.scaffoldDemo, "_blank")}
          >
            <p className="title-section !text-lg">Checkout this sample scaffold-stark dApp</p>
            <img src="/assets/redirect-icon.svg" alt="redirect" width="15" height="15" />
          </div>

          <div className="mt-2 hover-text w-fit" onClick={() => window.open(REDIRECT_LINK.speedrun, "_blank")}>
            <p className="title-section !text-lg">Learn how to use it</p>
          </div>
        </div>
      </div>
      <div>
        <Image src="/assets/debug.png" alt="debug" width={800} height={525} />
      </div>
    </section>
  );
};
