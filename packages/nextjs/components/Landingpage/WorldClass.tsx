/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { DecoreLayout } from "../DecoreLayout";
import { Footer } from "./Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { REDIRECT_LINK } from "~~/helper/redirect";

const GradientButton = ({ icon, text, onClick }: { icon: string; text: string; onClick: () => void }) => {
  return (
    <div
      className="cursor-pointer px-6  lg:py-4 py-3 flex items-center justify-center gap-2.5 lg:w-[218px] w-fit"
      style={{
        borderRadius: "10px",
        border: "1px solid #9B5584",
        background: "linear-gradient(180deg, #FFB0FF 0%, #7748CD 100%)",
        boxShadow:
          "4px 0px 2.6px 0px rgba(255, 255, 255, 0.25) inset, 0px -4px 2.6px 0px rgba(0, 0, 0, 0.37) inset, 0px 3px 2.6px 0px rgba(255, 255, 255, 0.25) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
      }}
      onClick={onClick}
    >
      <p className="lg:text-xl text-sm font-grotesk">{text}</p>
      <Image src={icon} alt="icon" width={26} height={26} />
    </div>
  );
};

const ItemSlide = ({
  desc,
  avatar,
  name,
  position,
}: {
  desc: string;
  avatar: string;
  name: string;
  position: string;
}) => {
  return (
    <div className="flex flex-col h-full lg:gap-20 gap-3">
      <p className="text-[#BABABA] lg:text-xl text-xs flex-1 font-inter">{desc}</p>
      <div className="flex items-center gap-3">
        <div>
          {!avatar ? (
            <div className="w-12 h-12 rounded-full bg-white"></div>
          ) : (
            <Image src={avatar} alt="avatar" width={48} height={48} className="rounded-full" />
          )}
        </div>
        <div>
          <p className="lg:text-xl text-xs font-medium bg-gradient-to-br from-rose-200 via-purple-300 to-purple-400 inline-block text-transparent bg-clip-text font-inter">
            {name}
          </p>
          <p className="text-[#BABABA] lg:text-sm text-xs font-inter">{position}</p>
        </div>
      </div>
    </div>
  );
};

const FounderSlider = () => {
  const data = [
    {
      desc: "“Scaffold Stark is the best way for developers to launch apps on Starknet, it is fast and optimized for almost all use cases, the team is constantly pushing towards having more production friendly framework.”",
      avatar: "/assets/mehdi.png",
      name: "Mehdi",
      position: "Founder at Stormbit Finance",
    },
    {
      desc: "“'ve found Scaffold-Stark's debugging process exceptional. The framework streamlines complex data type handling, significantly reducing development overhead. Its built-in error handling and debugging tools have cut our development time in half while maintaining code quality.”",
      avatar: "/assets/gian.png",
      name: "Gian",
      position: "Founder at The Marquis",
    },
    {
      desc: "“Tools like @ScaffoldStark will greatly help new developers to create projects on @Starknet, for example at hackathons I'm excited to see what new ideas will be developed with this toolkit.”",
      avatar: "/assets/omar.png",
      name: "Omar",
      position: "Developer Relations at Starknet Foundation",
    },
    {
      desc: "“Coming from an Ethereum / EVM background, it would have so time consuming to get started on building apps on Starknet with Scaffold-Stark, specially during a hackathon, also the framework is structured on a similar way to Scaffold-Eth, so its very easy to understand how it works.”",
      avatar: "/assets/shiv.png",
      name: "Shiv",
      position: "Contributor at Scaffold-Eth",
    },
    {
      desc: "“Scaffold-Stark simplified the onboarding process for developers looking to build on Starknet. Its developer friendly structure makes transitioning from Ethereum seamless, while offering power tools to experiment and scale Starknet projects easier.”",
      avatar: "/assets/andee.png",
      name: "Andee",
      position: "Founder at RYG.Labs",
    },
    {
      desc: "“Scaffold Stark is a game-changer for building on Starknet. It drastically reduces the time needed to set up the development environment, and debugging smart contracts becomes a straightforward task thanks to the intuitive interface they’ve added. Highly recommended for any developer diving into Starknet!”",
      avatar: "/assets/oxvato.png",
      name: "0xVato",
      position: "Founder",
    },
  ];
  const breakpoints = {
    1280: {
      slidesPerView: 3.5,
    },
  };
  return (
    <div className="mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        centeredSlides={true}
        loop={true}
        spaceBetween={20}
        slidesPerView={1.5}
        breakpoints={breakpoints}
        className="w-full cursor-grab flex items-stretch"
        speed={500}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        updateOnWindowResize={true}
        grabCursor={true}
        pagination={true}
        touchRatio={1.5}
        preventClicks={true}
        preventClicksPropagation={true}
        // preloadImages={false}
        // lazy={true}
        watchOverflow={true}
      >
        {data.map((item, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <div className="h-full">
              <ItemSlide {...item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const ScaffoldStark = () => {
  return (
    <div>
      <div
        className="flex md:flex-row flex-col-reverse rounded-l-3xl rounded-r-3xl"
        style={{
          borderRadius: "c",
          borderRight: "2px solid #B24DFF",
          borderLeft: "1px solid #B24DFF",
          background: "linear-gradient(270deg, #9B5584 0%, #181872 108.63%)",
          boxShadow: "9px 8px 4px 0px rgba(150, 104, 149, 0.25) inset, 0px 0px 98.8px 0px rgba(184, 91, 255, 0.00)",
        }}
      >
        <Image
          src={"/assets/scaffold-stark.png"}
          alt="scaffold"
          width={417}
          height={378}
          className="lg:rounded-l-3xl rounded-l-0 rounded-b-3xl md:rounded-b-0 md:rounded-r-none w-full"
        />
        <div className="lg:p-11 p-8 flex flex-col">
          <div className="flex items-center gap-5">
            <Image src={"/assets/logo.png"} alt="logo" width={44} height={44} />
            <p className="text-[25px]">Scaffold-Stark</p>
          </div>
          <div className="flex-1 item-spacing-col justify-end">
            <p className="lg:text-xl text-sm lg:max-w-[700px] max-w-max lg:mb-0 lg:mt-0 mt-10 mb-3 font-inter">
              You can build and learn together with our community, joining over 500 members in creating products,
              prototypes, and tutorials to enrich the web3 ecosystem.
            </p>
            <div className="flex lg:flex-row flex-col gap-3">
              <GradientButton
                icon="/assets/telegram-icon.svg"
                text="Join Telegram"
                onClick={() => window.open(REDIRECT_LINK.telegram, "_blank")}
              />
              <GradientButton
                icon="/assets/onlydust-icon.svg"
                text="Join Onlydust"
                onClick={() => window.open(REDIRECT_LINK.onlydust, "_blank")}
              />
              <GradientButton
                icon="/assets/x-icon.svg"
                text="Follow Us"
                onClick={() => window.open(REDIRECT_LINK.twitter, "_blank")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WorldClass = () => {
  return (
    <section>
      {/* <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mb-0.5" /> */}
      <div className="relative rotate-180 z-10 lg:top-0 top-[52px]">
        <DecoreLayout />
      </div>
      <div className="bg-[#0F0F0F] lg:pt-20 pt-14 pb-14  overflow-x-hidden relative z-30">
        <div>
          <p
            className="lg:text-[54px] text-[22px] font-bold text-center font-grotesk"
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
          <p className="text-[#BABABA] lg:text-xl text-sm text-center lg:mt-5 mt-3 font-inter">
            You can build and learn together with our community, joining over 300 members in creating <br /> products,
            prototypes, and tutorials to enrich the web3 ecosystem.
          </p>
        </div>
        <div className="lg:mt-14 mt-8">
          <FounderSlider />
        </div>
        <div className="!mt-[180px] content">
          <ScaffoldStark />
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </section>
  );
};
