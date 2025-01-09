import { useState } from "react";
import Image from "next/image";

export const DebugContract = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className="content flex items-center !pt-10">
      <div className="item-spacing-col">
        <p className="subTitle-section">DEBUG CONTRACT</p>
        <p className="title-section max-w-[380px]">Your frontend auto-adapts to your smart contract as you edit it.</p>
        <p className="text-[#6B7280] text-lg max-w-[530px]">
          Debug and refine your smart contracts with a live-updating frontend. Scaffold-Stark is an ideal stack for
          progressing from rapid prototyping to production-grade dApps.
        </p>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer relative h-8"
        >
          <div
            className={`absolute top-0 left-0 flex gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="title-section !text-lg">Checkout this sample scaffold-stark dApp</p>
            <Image src="/assets/redirect-icon.svg" alt="redirect" width={15} height={15} />
          </div>

          <div
            className={`absolute top-0 left-0 transition-all duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
          >
            <p className="title-section !text-lg">Learn how to use it</p>
          </div>

          <div
            className="h-0.5 w-12 absolute bottom-0 left-0"
            style={{
              background: "var(--Starknet-Gradient, linear-gradient(270deg, #9B5584 0%, #181872 108.63%))",
            }}
          />
        </div>
      </div>
      <div>
        <Image src="/assets/debug.png" alt="debug" width={800} height={525} />
      </div>
    </section>
  );
};
