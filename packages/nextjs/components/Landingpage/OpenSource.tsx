import Image from "next/image";
import { Header } from "./Header";
import toast from "react-hot-toast";

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied successfull!");
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="bg-white py-[11px] px-[13px] cursor-pointer copy-icon" onClick={handleCopy}>
      <Image src={"/assets/copy-icon.svg"} alt="icon" width={15} height={15} />
    </div>
  );
};
export const OpenSource = () => {
  return (
    <div className="relative bg-texture">
      <div className="bg-[#0F0F0F] relative z-50">
        <div className="max-w-[1222px] mx-auto !px-0 border-r border-l border-[#484848] relative">
          <Header />
          <div className="relative z-20 px-6 grid grid-cols-7 gap-5 py-20">
            <div className="col-span-3 relative z-20">
              <h1 className="font-medium text-[54px] mb-[35px]">
                <span className="font-bold text-[#B386FF]">Open-source</span> toolkit for building dApps on Starknet
              </h1>
              <p className="max-w-[508px] text-xl text-[#BABABA]">
                Built using NextJS, Starknet.js, Scarb, Starknet-React, Starknet Foundry and Typescript. Designed to
                make it easier for developers to create, deploy and interact with smart contracts.
              </p>
            </div>
            <div className="col-span-4 relative"></div>
            <Image
              src={"/assets/opensource-pc.gif"}
              alt="gif"
              width={1000}
              height={10000}
              className="absolute top-0 right-0 z-10 h-full"
            />
          </div>
          <div className="flex border-t border-b border-[#484848] w-full relative z-20">
            <div className="flex items-center gap-8 border-r border-[#484848] p-5">
              <p className="text-[23px] font-medium">npx create-starknet</p>
              <CopyButton textToCopy="npx create-starknet" />
            </div>
            <div className="flex flex-1 items-center gap-8 p-[22px] py-5">
              <p className="text-[23px] font-medium">
                git clone https://github.com/Scaffold-Stark/scaffold-stark-2.git
              </p>
              <CopyButton textToCopy="git clone https://github.com/Scaffold-Stark/scaffold-stark-2.git" />
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
