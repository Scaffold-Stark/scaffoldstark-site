import Image from "next/image";

const GradientButton = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div
      className="cursor-pointer px-6 py-4 flex items-center justify-center gap-2.5 w-[218px]"
      style={{
        borderRadius: "10px",
        border: "1px solid #9B5584",
        background: "linear-gradient(180deg, #FFB0FF 0%, #7748CD 100%)",
        boxShadow:
          "4px 0px 2.6px 0px rgba(255, 255, 255, 0.25) inset, 0px -4px 2.6px 0px rgba(0, 0, 0, 0.37) inset, 0px 3px 2.6px 0px rgba(255, 255, 255, 0.25) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <p className="text-xl">{text}</p>
      <Image src={icon} alt="icon" width={26} height={26} />
    </div>
  );
};

const ScaffoldStark = () => {
  return (
    <div>
      <div
        className="flex"
        style={{
          borderRadius: "c",
          borderRight: "2px solid #B24DFF",
          borderLeft: "1px solid #B24DFF",
          background: "linear-gradient(270deg, #9B5584 0%, #181872 108.63%)",
          boxShadow: "9px 8px 4px 0px rgba(150, 104, 149, 0.25) inset, 0px 0px 98.8px 0px rgba(184, 91, 255, 0.00)",
        }}
      >
        <Image src={"/assets/scaffold-stark.png"} alt="scaffold" width={417} height={378} className="rounded-l-3xl" />
        <div className="p-11 flex flex-col">
          <div className="flex items-center gap-5">
            <Image src={"/assets/logo.png"} alt="logo" width={44} height={44} />
            <p className="text-[25px]">Scaffold-Stark</p>
          </div>
          <div className="flex-1 item-spacing-col justify-end">
            <p className="text-xl">
              You can build and learn together with our community, joining over 500 members in creating products,
              prototypes, and tutorials to enrich the web3 ecosystem.
            </p>
            <div className="flex gap-3">
              <GradientButton icon="/assets/telegram-icon.svg" text="Join Telegram" />
              <GradientButton icon="/assets/onlydust-icon.svg" text="Join Onlydust" />
              <GradientButton icon="/assets/x-icon.svg" text="Follow Us" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WorldClass = () => {
  return (
    <section className="">
      <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mb-0.5" />
      <div className="bg-[#0F0F0F]">
        <p
          className="text-[54px] font-bold text-center"
          style={{
            background: "linear-gradient(180deg, #FFF 0%, #999 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "114%",
          }}
        >
          World-class developers use <br /> Scaffold-Stark
        </p>
        <p className="text-[#BABABA] text-xl text-center mt-5">
          You can build and learn together with our community, joining over 300 members in creating <br /> products,
          prototypes, and tutorials to enrich the web3 ecosystem.
        </p>
      </div>
      <ScaffoldStark />
      <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mt-0.5 rotate-180" />
    </section>
  );
};
