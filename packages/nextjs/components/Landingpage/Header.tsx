import Image from "next/image";
import { REDIRECT_LINK } from "~~/helper/redirect";

export const Header = () => {
  return (
    <div className="relative z-20 flex justify-between items-center border-b border-[#484848] p-6">
      <div className="flex items-center gap-5">
        <Image src={"/assets/logo.png"} alt="logo" width={44} height={44} />
        <p className="text-[25px] font-medium">Scaffold-Stark</p>
      </div>
      <div className="flex gap-2">
        <p className="header-item-btn" onClick={() => window.open(REDIRECT_LINK.speedrun, "_blank")}>
          Learn
        </p>
        <p className="header-item-btn" onClick={() => window.open(REDIRECT_LINK.scaffoldDoc, "_blank")}>
          Docs
        </p>
        <p className="header-item-btn" onClick={() => window.open(REDIRECT_LINK.scaffoldDemo, "_blank")}>
          Demo
        </p>
        <div
          className="header-item-github-btn flex items-center w-fit gap-2.5"
          onClick={() => window.open(REDIRECT_LINK.scaffoldGit, "_blank")}
        >
          <p>Github</p>
          <Image src={"/assets/github-icon.svg"} alt="icon" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};
