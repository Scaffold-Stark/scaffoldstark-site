import Image from "next/image";
import { TextureBackground } from "../TextureBackground";

export const ScaffoldFont = () => {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #1B001F 0%, #100012 100%)",
      }}
    >
      <div className="content grid md:grid-cols-9 grid-cols-1 min-h-[555px] items-center justify-center md:py-0 py-10">
        <div className="h-full md:col-span-4 col-span-1 mx-auto md:order-1 order-2 w-full">
          <div className="relative h-full flex items-center border-r border-l border-[#484848] ">
            <TextureBackground />
            <div className="font-grotesk">
              <div className="px-9 py-14 border-b border-t border-[#484848]">
                <div>
                  <h2
                    className="md:text-[40px] text-[22px] font-bold"
                    style={{
                      background: "linear-gradient(270deg, #9B5584 0%, #ADADFF 108.63%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Scaffold-Stark font
                  </h2>
                  <p className="font-medium md:text-lg text-sm mt-2.5 max-w-[477px] md:mb-0 mb-5">
                    <span className="font-semibold">Space Grotesk</span> is a variable font family carefully crafted &
                    designed for computer screens.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[#484848] py-4 pl-9 pr-5 relative z-30">
                <p className="text-lg font-medium">Space Grotesk Download</p>
                <a
                  className="bg-white p-2.5 rounded-lg cursor-pointer flex items-center justify-center"
                  download={"/fonts/Space_Grotesk.zip"}
                  href="/fonts/Space_Grotesk.zip"
                >
                  <Image src="/assets/clould-dowload.svg" alt="cloud" width={20} height={20} />
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-[#484848] py-4 pl-9 pr-5 relative z-30">
                <p className="text-lg font-medium">Inter Download</p>
                <a
                  className="bg-white p-2.5 rounded-lg cursor-pointer flex items-center justify-center"
                  download={"/fonts/Inter.zip"}
                  href="/fonts/Inter.zip"
                >
                  <Image src="/assets/clould-dowload.svg" alt="cloud" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative md:col-span-5 col-span-1 h-full flex items-center justify-start md:order-2 order-1">
          <div>
            <Image src="/assets/scaffold-font.svg" alt="icon blur" width={772} height={332} />
          </div>
        </div>
      </div>
    </section>
  );
};
