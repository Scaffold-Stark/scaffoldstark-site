"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface ExtensionCardDetailProps {
  title: string;
  description: string;
  command: string;
  github: string;
  isActive?: boolean;
}

export const ExtensionCardDetail = ({ title, description, command, github, isActive }: ExtensionCardDetailProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="rounded-2xl px-6 py-8 border-[#3F00AC] border-2 bg-gradient-to-b from-[#322D59] via-[#1a1a1a] to-[#121212] relative overflow-hidden h-full flex flex-col">
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon and Title Section */}

        {/* Title */}
        <h2 className="text-2xl font-bold text-left mb-6 tracking-wider text-[#B386FF]">{title}</h2>

        <div className="flex items-start gap-4 mb-6">
          {github && (
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full  flex items-center justify-center text-black ${
                isActive ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                if (isActive) {
                  window.open(github, "_blank");
                }
              }}
            >
              <Image src="/github.png" alt="GitHub" width={32} height={32} style={{ width: "100%", height: "100%" }} />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-white text-base mb-8 leading-relaxed flex-grow">{description}</p>

        {/* Command Section */}
        <div className="bg-gradient-to-r text-left from-[#4A4A5F] via-[#2a2a3a] to-[#1a1a2e] rounded-lg p-4 flex items-center justify-between">
          <code className="text-white text-left text-sm md:text-base font-mono select-all">{command}</code>
          <button
            onClick={handleCopy}
            className={`ml-4 p-2 rounded-md transition-colors duration-75 flex items-center justify-center ${
              copied ? "bg-[#B386FF] text-white" : "bg-white text-black"
            }`}
            title="Copy command"
          >
            {copied ? <CheckCircleIcon className="w-5 h-5" /> : <DocumentDuplicateIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
