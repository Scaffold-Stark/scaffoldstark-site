import Image from "next/image";
import { TextureBackground } from "../TextureBackground";

export const ScaffoldFont = () => {
  return (
    <section className="bg-[#0F0F0F] grid grid-cols-2 min-h-[555px] items-center justify-center">
      <div className="border-r border-l border-[#484848] h-full max-w-[548px] mx-auto">
        <div className="bg-gradient-to-b from-[#9b55840a] to-[#2b0f2a93] relative h-full flex items-center">
          <TextureBackground />
          <div>
            <div className="px-9 py-14 border-b border-t border-[#484848]">
              <h2
                className="text-[40px] font-bold"
                style={{
                  background: "linear-gradient(270deg, #9B5584 0%, #ADADFF 108.63%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Scaffold-Stark font
              </h2>
              <p className="font-medium text-lg mt-2.5 max-w-[477px]">
                <span className="font-semibold">Space Grotesk</span> is a variable font family carefully crafted &
                designed for computer screens.
              </p>
            </div>

            <div className="flex items-center justify-between border-b border-[#484848] py-4 pl-9 pr-5 relative z-30">
              <p className="text-lg font-medium">Space Grotesk Download</p>
              <div className="bg-white p-2.5 rounded-lg cursor-pointer flex items-center justify-center">
                <Image src="/assets/clould-dowload.svg" alt="cloud" width={20} height={20} />
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-[#484848] py-4 pl-9 pr-5 relative z-30">
              <p className="text-lg font-medium">Inter Download</p>
              <div className="bg-white p-2.5 rounded-lg cursor-pointer flex items-center justify-center">
                <Image src="/assets/clould-dowload.svg" alt="cloud" width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full flex items-center justify-start ">
        <div>
          <Image src="/assets/scaffold-font.png" alt="icon blur" width={772} height={332} />
        </div>
      </div>
    </section>
  );
};
