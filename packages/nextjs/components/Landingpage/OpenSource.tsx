import Image from "next/image";

const CopyButton = () => {
  return (
    <div className="bg-white py-[11px] px-[13px] cursor-pointer copy-icon">
      <Image src={"/assets/copy-icon.svg"} alt="icon" width={15} height={15} />
    </div>
  );
};

export const OpenSource = () => {
  return (
    <div className="relative">
      <div className="bg-[#0F0F0F] relative z-50">
        <div className="max-w-[1222px] mx-auto !px-0 border-r border-l border-[#484848]">
          <div className="flex justify-between items-center border-b border-[#484848] p-6">
            <div className="flex items-center gap-5">
              <Image src={"/assets/logo.png"} alt="logo" width={44} height={44} />
              <p className="text-[25px] font-medium">Scaffold-Stark</p>
            </div>
            <div className="flex gap-2">
              <p className="header-item-btn">Learn</p>
              <p className="header-item-btn">Docs</p>
              <p className="header-item-btn">Demo</p>
              <div className="header-item-github-btn flex items-center w-fit gap-2.5">
                <p>Github</p>
                <Image src={"/assets/github-icon.svg"} alt="icon" width={24} height={24} />
              </div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-7 gap-5">
            <div className="col-span-3">
              <h1 className="font-medium text-[54px] mb-[35px]">
                <span className="font-bold text-[#B386FF]">Open-source</span> toolkit for building dApps on Starknet
              </h1>
              <p className="max-w-[508px] text-xl text-[#BABABA]">
                Built using NextJS, Starknet.js, Scarb, Starknet-React, Starknet Foundry and Typescript. Designed to
                make it easier for developers to create, deploy and interact with smart contracts.
              </p>
            </div>
            <div className="col-span-4"></div>
          </div>
          <div className="flex border-t border-b border-[#484848] w-full">
            <div className="flex items-center gap-8 border-r border-[#484848] p-5">
              <p className="text-[23px] font-medium">npx create-starknet</p>
              <CopyButton />
            </div>
            <div className="flex flex-1 items-center gap-8 p-[22px] py-5">
              <p className="text-[23px] font-medium">
                git clone https://github.com/Scaffold-Stark/scaffold-stark-2.git
              </p>
              <CopyButton />
            </div>
          </div>
          <div className="bg-[#0F0F0F] h-20"></div>
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
