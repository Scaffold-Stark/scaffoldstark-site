import Image from "next/image";

const CustomHook = () => {
  return (
    <div className="grid grid-cols-6 gap-10 items-center content">
      <div className="col-span-3">
        <Image src={"/assets/component.png"} width={450} height={450} alt="component" className="mx-auto" />
      </div>
      <div className="max-w-[632px] col-span-3 item-spacing-col">
        <p className="subTitle-section">COMPONENTS</p>
        <p
          className="text-4xl font-medium"
          style={{
            background: "linear-gradient(270deg, #9B5584 0%, #ADADFF 108.63%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Collection of common web3 components to quickly build your frontend.
        </p>
        <p className="text-white text-xl">
          Accelerate your dapp development using our pre-built components for common web3 use cases.
        </p>
      </div>
    </div>
  );
};

const Component = () => {
  return (
    <div className="flex items-center gap-5 content">
      <div className="item-spacing-col max-w-[486px]">
        <p className="subTitle-section">CUSTOM HOOKS</p>
        <p
          className="text-4xl font-medium"
          style={{
            background: "linear-gradient(270deg, #9B5584 0%, #ADADFF 108.63%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Collection of React hooks wrapper around starknet-react
        </p>
        <p className="text-white text-xl">Simplify interactions with smart contracts with typescript autocompletion</p>
      </div>
      <div>
        <Image src={"/assets/custom-hook.png"} width={767} height={330} alt="hooks" className="mx-auto" />
      </div>
    </div>
  );
};

export const HookComponent = () => {
  return (
    <section className="">
      <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mb-0.5" />
      <div className="bg-[#0F0F0F] py-20">
        <div className="px-4">
          <CustomHook />
          <div
            className="h-[1px] w-full my-[100px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(203, 124, 255, 0.2) 0%, #CB7CFF 50%, rgba(203, 124, 255, 0.2) 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 50%, black 50%)",
              WebkitMaskSize: "10px 100%",
              WebkitMaskRepeat: "repeat-x",
              maskImage: "linear-gradient(to right, transparent 50%, black 50%)",
              maskSize: "10px 100%",
              maskRepeat: "repeat-x",
            }}
          />
          <Component />
        </div>
      </div>
      <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mt-0.5 rotate-180" />
    </section>
  );
};
