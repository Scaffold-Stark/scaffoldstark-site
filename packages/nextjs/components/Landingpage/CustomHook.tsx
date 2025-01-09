import Image from "next/image";

const Infor = () => {
  return (
    <div className="flex gap-1">
      <div
        className="px-2.5 self-stretch h-[450px] w-fit relative"
        style={{
          borderRadius: "21px",
          position: "relative",
        }}
      >
        <div
          style={{
            content: "''",
            position: "absolute",
            inset: 0,
            borderRadius: "21px",
            padding: "2px",
            background:
              "linear-gradient(to bottom, rgba(248, 248, 248, 0.37) 0%, rgba(248, 248, 248, 0.37) 50%, transparent 80%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
        <div className="flex flex-col items-center gap-1 justify-center h-full">
          <div className="w-full animate-float">
            <div
              className="flex items-center gap-2.5 p-1"
              style={{
                borderRadius: "29px",
                border: "2px solid var(--Starknet-Gradient-3, #7475FA)",
                background: "linear-gradient(270deg, rgba(155, 85, 132, 0.30) 0%, rgba(24, 24, 114, 0.30) 108.63%)",
                backdropFilter: "blur(21.3px)",
              }}
            >
              <Image src="/assets/sample-avt.svg" width={33} height={33} alt="icon" />
              <p
                style={{
                  background: "linear-gradient(270deg, #9B5584 0%, #7F7FFF 108.63%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                nadai.stark
              </p>
              <Image src="/assets/arrow-down.svg" alt="icon" width={20} height={20} className="ml-2" />
              <Image src="/assets/mouse.svg" alt="icon" width={24} height={24} className="absolute right-4 top-8" />
            </div>
          </div>
          <div
            className="p-6 flex flex-col gap-2 animate-float"
            style={{
              borderRadius: "16px",
              border: "1px solid var(--Starknet-Gradient-3, #7475FA)",
              background: "linear-gradient(270deg, rgba(155, 85, 132, 0.30) 0%, rgba(24, 24, 114, 0.30) 108.63%)",
            }}
          >
            <div
              className="h-[5px] w-[50px]"
              style={{
                borderRadius: "1px",
                opacity: "0.1",
                background: "var(--Object, #F8F8F8)",
              }}
            />
            <div
              className="h-[5px] w-[80px]"
              style={{
                borderRadius: "1px",
                opacity: "0.1",
                background: "var(--Object, #F8F8F8)",
              }}
            />
            <div
              className="h-[5px] w-[130px]"
              style={{
                borderRadius: "1px",
                opacity: "0.1",
                background: "var(--Object, #F8F8F8)",
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="p-2.5 relative"
        style={{
          borderRadius: "21px",
        }}
      >
        <div
          style={{
            content: "''",
            position: "absolute",
            inset: 0,
            borderRadius: "21px",
            padding: "2px",
            background:
              "linear-gradient(to bottom, rgba(248, 248, 248, 0.10) 0%, rgba(248, 248, 248, 0.10) 50%, transparent 80%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
        <div
          className="flex items-center gap-2.5 p-1"
          style={{
            borderRadius: "29px",
            border: "2px solid var(--Starknet-Gradient-3, #7475FA)",
            background: "linear-gradient(270deg, rgba(155, 85, 132, 0.30) 0%, rgba(24, 24, 114, 0.30) 108.63%)",
            backdropFilter: "blur(21.3px)",
          }}
        >
          <Image src={"/assets/sample-avt.svg"} width={33} height={33} alt="icon" />
          <p
            style={{
              background: "linear-gradient(270deg, #9B5584 0%, #7F7FFF 108.63%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            nadai.stark
          </p>
          <Image src={"/assets/arrow-down.svg"} alt="icon" width={20} height={20} className="ml-2" />
        </div>
        <div
          className="flex flex-col gap-2.5 p-4 mt-1"
          style={{
            borderRadius: "10px",
            border: "1.5px solid #272727",
            background: "var(--neutral-neutral-15, rgba(255, 255, 255, 0.05))",
            boxShadow: "0px 0px 10.749px 0px rgba(248, 248, 248, 0.25) inset",
          }}
        >
          <div className="flex items-center gap-2.5">
            <Image src={"/assets/copy-address.svg"} alt="icon" width={16} height={16} />
            <p className="text-sm text-[#D9D9D9]">Copy Address</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src={"/assets/qrcode.svg"} alt="icon" width={16} height={16} />
            <p className="text-sm text-[#D9D9D9]">View QR Code</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src={"/assets/switch-icon.svg"} alt="icon" width={16} height={16} />
            <p className="text-sm text-[#D9D9D9]">Switch Account</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src={"/assets/disconnect.svg"} alt="icon" width={16} height={16} />
            <p className="text-sm text-[#D9D9D9]">Disconnect</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-[#CECECE] text-[15px] ">STRK/USDC Amount</p>
          <div
            className="flex items-end gap-2 px-3 py-1.5 mt-1 relative"
            style={{
              borderRadius: "29px",
              border: "2.015px solid var(--Stroke-Subtle, rgba(248, 248, 248, 0.10))",
              background: "var(--neutral-neutral-15, rgba(255, 255, 255, 0.05))",
            }}
          >
            <p
              style={{
                background: "linear-gradient(270deg, #9B5584 0%, #7F7FFF 108.63%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              $
            </p>
            <p
              style={{
                background: "linear-gradient(270deg, #9B5584 0%, #7F7FFF 108.63%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              100
            </p>
            <div className="absolute top-0 right-0 bg-[#F8F8F81A] px-4 py-2.5 rounded-[20px]">
              <Image src={"/assets/amount-icon.svg"} alt="icon" width={16} height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomHook = () => {
  return (
    <div className="grid grid-cols-7 gap-16 items-center content">
      <div className="col-span-3">
        {/* <Image src={"/assets/component.png"} width={450} height={450} alt="component" /> */}
        <Infor />
      </div>
      <div className="max-w-[632px] col-span-4 item-spacing-col">
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
        <p className="text-white text-xl max-w-[560px]">
          Accelerate your dapp development using our pre-built components for common web3 use cases.
        </p>
      </div>
    </div>
  );
};

const Component = () => {
  return (
    <div className="flex items-center gap-8 content">
      <div className="item-spacing-col max-w-[480px]">
        <p className="subTitle-section">CUSTOM HOOKS</p>
        <p
          className="text-4xl font-medium max-w-[400px]"
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
