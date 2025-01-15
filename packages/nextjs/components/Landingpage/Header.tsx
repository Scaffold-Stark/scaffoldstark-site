import { useEffect, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { REDIRECT_LINK } from "~~/helper/redirect";

const MENU_ITEMS = [
  { text: "Learn", link: REDIRECT_LINK.speedrun },
  { text: "Docs", link: REDIRECT_LINK.scaffoldDoc },
  { text: "Demo", link: REDIRECT_LINK.scaffoldDemo },
  { text: "Github", link: REDIRECT_LINK.scaffoldGit },
];

const HeaderPC = () => {
  return (
    <div className="relative z-20 flex justify-between items-center border-b border-[#484848] p-6">
      <div className="flex items-center gap-5 cursor-pointer" onClick={() => (window.location.href = "/")}>
        <Image src={"/assets/scaffold-pink-svg.svg"} alt="logo" width={44} height={44} />
        <p className="text-[25px] font-medium font-grotesk text-[#A38CFF]">Scaffold-Stark</p>
      </div>
      <div className="flex gap-2">
        {MENU_ITEMS.slice(0, 3).map(item => (
          <p key={item.text} className="header-item-btn font-grotesk" onClick={() => window.open(item.link, "_blank")}>
            {item.text}
          </p>
        ))}
        <div
          className="header-item-github-btn flex items-center w-fit gap-2.5"
          onClick={() => window.open(REDIRECT_LINK.scaffoldGit, "_blank")}
        >
          <p className="font-grotesk">Github</p>
          <Image src={"/assets/github-icon.svg"} alt="icon" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

const HeaderMB = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="pt-6 pb-3 px-6 flex items-center justify-between relative">
      <div>
        <Image src={"/assets/logo-text-scaffold-pink.png"} alt="logo" width={170} height={30} />
      </div>

      {!isMenuOpen && (
        <button onClick={() => setIsMenuOpen(true)} className="px-3 py-1.5 rounded-xl border border-white font-grotesk">
          Menu
        </button>
      )}

      <div
        className={`fixed left-0 top-0 bg-black w-full h-screen transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          zIndex: 9999,
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-white">Menu</p>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-[34px] h-[34px] flex items-center justify-center rounded-xl bg-white"
            >
              <XMarkIcon color="black" width={18} height={18} />
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            {MENU_ITEMS.map(item => (
              <p
                key={item.text}
                className="text-white cursor-pointer hover:text-gray-300"
                onClick={() => window.open(item.link, "_blank")}
              >
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div>
      <div className="md:block hidden">
        <HeaderPC />
      </div>
      <div className="md:hidden block">
        <HeaderMB />
      </div>
    </div>
  );
};
