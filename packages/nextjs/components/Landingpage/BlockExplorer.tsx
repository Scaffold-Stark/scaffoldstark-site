import Image from "next/image";
import TypeAnimation from "../TypeAnimation";

export const BlockExplorer = () => {
  return (
    <section className="content grid grid-cols-1 lg:grid-cols-2 items-center lg:py-12 py-0">
      <div className="col-span-1 relative order-2 lg:order-1">
        <div className="p-1 rounded-lg shadow-2xl border-2 border-purple-500 dark:border-purple-500 mt-5 lg:mt-0">
          <Image src="/blockExplorer.png" alt="block explorer" width={800} height={525} className="rounded-lg" />
        </div>
      </div>
      {/* Added extra space between the image and the captions */}
      <div className="item-spacing-col col-span-1 order-1 lg:order-2 mt-10 lg:mt-0 lg:ml-16">
        <p className="subTitle-section">BLOCK EXPLORER</p>
        <TypeAnimation
          sequence={["Explore transactions, blocks, and contract interactions in real-time."]}
          wrapper="span"
          cursor={false}
          speed={50}
          className="title-section max-w-[480px] md:min-h-[130px] min-h-[50px]"
        />
        <p className="text-[#6B7280] lg:text-lg text-sm max-w-[530px] font-inter">
          Built-in Block Explorer lets you inspect transaction data, monitor contract events, and debug your dApp
          without leaving your development environment. Track every interaction on the Starknet blockchain with ease.
        </p>
      </div>
    </section>
  );
};
