import React from "react";
import { Space_Grotesk } from "@next/font/google";

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const Footer = () => {
  return (
    <div className={`min-h-0 py-5 px-1 mb-11 lg:mb-0 bg-[#202537] text-white ${SpaceGrotesk.className}`}>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <a
                href="https://github.com/Quantum3-Labs/scaffold-stark-2"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Fork me
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a href="https://t.me/+wO3PtlRAreo4MDI9" target="_blank" rel="noreferrer" className="link">
                Support
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
