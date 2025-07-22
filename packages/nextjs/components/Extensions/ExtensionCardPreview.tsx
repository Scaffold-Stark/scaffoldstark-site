"use client";

import { useState } from "react";
import Image from "next/image";

interface ExtensionCardPreviewProps {
  title: string;
  description: string;
  command: string;
}

export const ExtensionCardPreview = ({ title, description, command }: ExtensionCardPreviewProps) => {
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
    <div className="rounded-xl p-8 border border-[#3F00AC] bg-gradient-to-b from-[#322D59] via-[#1a1a1a] to-[#121212] relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold  mb-6 tracking-wider text-[#B386FF]">{title}</h2>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{description}</p>

        {/* Command Section */}
        <div className="bg-gradient-to-r from-[#4A4A5F] via-[#2a2a3a] to-[#1a1a2e] rounded-lg p-4 flex items-center justify-between">
          <code className="text-white font-mono text-sm select-all">{command}</code>
          <button
            onClick={handleCopy}
            className={`ml-4 p-2 rounded-md transition-colors duration-75 flex items-center justify-center ${
              copied
                ? "bg-[#B386FF] text-white"
                : "bg-gradient-to-br from-[#B386FF] to-[#9966CC] text-white hover:from-[#9966CC] hover:to-[#7A4DB8]"
            }`}
            title="Copy command"
          >
            {copied ? (
              <Image src="/check-circle.svg" alt="check" width={20} height={20} />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
