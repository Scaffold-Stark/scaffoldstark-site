"use client";

import { useState } from "react";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

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
          <code className="text-white font-mono select-all">{command}</code>
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
