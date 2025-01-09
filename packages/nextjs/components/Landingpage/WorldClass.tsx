/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { REDIRECT_LINK } from "~~/helper/redirect";

const GradientButton = ({ icon, text, onClick }: { icon: string; text: string; onClick: () => void }) => {
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
      onClick={onClick}
    >
      <p className="text-xl">{text}</p>
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
    <div>
      <p className="text-[#BABABA] text-xl mb-[60px]">{desc}</p>
      <div className="flex items-center gap-3">
        <div>
          {!avatar ? (
            <div className="w-12 h-12 rounded-full bg-white"></div>
          ) : (
            <Image src={avatar} alt="avatar" width={48} height={48} />
          )}
        </div>
        <div>
          <p className="text-xl font-medium bg-gradient-to-br from-rose-200 via-purple-300 to-purple-400 inline-block text-transparent bg-clip-text">
            {name}
          </p>
          <p className="text-[#BABABA] text-sm">{position}</p>
        </div>
      </div>
    </div>
  );
};

const FounderSlider = () => {
  const data = [
    {
      desc: "“ You can build and learn together with our community, joining over 300 members in creating products, prototypes, and tutorials to enrich the web3 ecosystem ”",
      avatar: "",
      name: "Nadai",
      position: "Founder at Scaffold-Stark",
    },
    {
      desc: "“ You can build and learn together with our community, joining over 300 members in creating products, prototypes, and tutorials to enrich the web3 ecosystem ”",
      avatar: "",
      name: "Carlos Ramos",
      position: "Founder at Quantum3 Labs",
    },
    {
      desc: "“ You can build and learn together with our community, joining over 300 members in creating products, prototypes, and tutorials to enrich the web3 ecosystem ”",
      avatar: "",
      name: "Carlos Ramos",
      position: "Founder at Quantum3 Labs",
    },
    {
      desc: "“ You can build and learn together with our community, joining over 300 members in creating products, prototypes, and tutorials to enrich the web3 ecosystem ”",
      avatar: "",
      name: "Nadai",
      position: "Founder at Scaffold-Stark",
    },
    {
      desc: "“ You can build and learn together with our community, joining over 300 members in creating products, prototypes, and tutorials to enrich the web3 ecosystem ”",
      avatar: "",
      name: "Carlos Ramos",
      position: "Founder at Quantum3 Labs",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="mx-auto">
      <Swiper
        modules={[Navigation]}
        centeredSlides={true}
        loop={true}
        spaceBetween={20}
        slidesPerView={2.5}
        className="w-full cursor-grab"
        onSlideChange={(swiper: any) => setActiveIndex(swiper.realIndex)}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            className={`transition-transform duration-300 ${
              index === activeIndex ? "-translate-y-5" : "translate-y-0"
            }`}
          >
            <ItemSlide {...item} />
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
        className="flex rounded-l-3xl rounded-r-3xl"
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
            <p className="text-xl max-w-[700px]">
              You can build and learn together with our community, joining over 500 members in creating products,
              prototypes, and tutorials to enrich the web3 ecosystem.
            </p>
            <div className="flex gap-3">
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
      <Image src={"/assets/decore-top.png"} alt="decore" width={10000} height={10000} className="-mb-0.5" />
      <div className="bg-[#0F0F0F] pt-20 pb-14">
        <div>
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
        <div className="mt-14">
          <FounderSlider />
        </div>
        <div className="!mt-[180px] content">
          <ScaffoldStark />
        </div>
        <div className="flex items-center gap-4 justify-center mt-20">
          <a
            className="font-medium cursor-pointer underline"
            onClick={() => window.open(REDIRECT_LINK.editme, "_blank")}
          >
            Edit me
          </a>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <a className="font-medium cursor-pointer underline">Brand Assets</a>
        </div>
      </div>
    </section>
  );
};
