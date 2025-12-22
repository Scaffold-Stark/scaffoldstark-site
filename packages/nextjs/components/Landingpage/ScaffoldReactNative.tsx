import Image from "next/image";
import TypeAnimation from "../TypeAnimation";

export const ScaffoldReactNative = () => {
  return (
    <section className="content grid grid-cols-1 lg:grid-cols-2 items-center lg:py-12 py-0 relative">
      {/* Dotted line at the top, similar to HookComponent */}
      <div
        className="h-[1px] w-full absolute left-0 top-0"
        style={{
          background: "linear-gradient(90deg, rgba(203, 124, 255, 0.2) 0%, #CB7CFF 50%, rgba(203, 124, 255, 0.2) 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 50%, black 50%)",
          WebkitMaskSize: "10px 100%",
          WebkitMaskRepeat: "repeat-x",
          maskImage: "linear-gradient(to right, transparent 50%, black 50%)",
          maskSize: "10px 100%",
          maskRepeat: "repeat-x",
          zIndex: 40,
        }}
      />
      <div className="item-spacing-col col-span-1">
        <p className="subTitle-section">MOBILE READY (EXPERIMENTAL)</p>
        <TypeAnimation
          sequence={["Build mobile dApps with the same powerful Scaffold-Stark experience."]}
          wrapper="span"
          cursor={false}
          speed={50}
          className="title-section max-w-[480px] md:min-h-[130px] min-h-[50px]"
        />
        <p className="text-[#6B7280] lg:text-lg text-sm max-w-[530px] font-inter">
          Bring your Starknet dApps to mobile with React Native. Leverage the same powerful hooks, components, and
          development workflow you love from Scaffold-Stark, now optimized for iOS and Android platforms.
        </p>
        <div className="flex flex-col lg:gap-2 gap-0 lg:mt-16 mt-0">
          <div
            className="flex gap-2 hover-text w-fit"
            onClick={() => window.open("https://github.com/Scaffold-Stark/scaffold-stark-rn", "_blank")}
          >
            <p className="title-section !text-lg font-inter !font-bold">Explore Scaffold-Stark Mobile</p>
            <Image src="/assets/redirect-icon.svg" alt="redirect" width="15" height="15" className="w-auto h-auto" />
          </div>
        </div>
      </div>
      <div className="col-span-1 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Pulsating purple glow */}
          <div
            className="absolute"
            style={{
              width: 380,
              height: 730,
              borderRadius: "40px",
              background: "radial-gradient(circle, #b386ff 30%, transparent 70%)",
              filter: "blur(32px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              pointerEvents: "none",
              animation: "glowPulse 2.5s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes glowPulse {
              0% {
                opacity: 0.70;
                filter: blur(30px);
              }
              50% {
                opacity: 1;
                filter: blur(52px);
              }
              100% {
                opacity: 0.70;
                filter: blur(30px);
              }
            }
          `}</style>
        </div>
        <Image
          src="/scaffold-stark-rn.png"
          alt="Scaffold Stark React Native"
          width={350}
          height={700}
          className="rounded-[3rem] relative z-20"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
    </section>
  );
};
