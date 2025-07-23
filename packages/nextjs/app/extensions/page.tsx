"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { ChevronLeftIcon, MagnifyingGlassIcon, PuzzlePieceIcon } from "@heroicons/react/24/solid";
import { ExtensionCardDetail } from "~~/components/Extensions/ExtensionCardDetail";
import { Footer } from "~~/components/Landingpage/Footer";
import { Header } from "~~/components/Landingpage/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { EXTENSIONS } from "~~/constants/extensions";

const Extensions: NextPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExtensions = EXTENSIONS.filter(
    extension =>
      extension.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.longDesc.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <MetaHeader
        title="Extensions | Scaffold-Stark"
        description="Explore all available extensions for Scaffold-Stark. Build your dApp faster with pre-integrated extensions."
      />
      <div className="bg-[#0F0F0F]">
        <Header />
      </div>
      <div className="min-h-screen bg-[#0F0F0F] font-grotesk py-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
            className="relative flex items-center gap-3 text-white mb-8 p-[2px] rounded-[18px] bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#8B5CF6]  hover:from-[#9333EA] hover:via-[#C084FC] hover:to-[#9333EA] transition-all duration-300"
          >
            <div className="flex items-center gap-3 w-full px-5 py-2 bg-[#1A1A2E] rounded-[16px] hover:bg-[#2A2A3E] transition-colors">
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="text-lg font-medium">BACK</span>
            </div>
          </button>

          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Icon and Title */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="relative flex items-center justify-center bottom-1">
                {/* Pulsating circles */}
                <div className="absolute w-24 h-24 rounded-full border border-[#8B5CF6]/20 animate-ping"></div>
                <div
                  className="absolute w-32 h-32 rounded-full border border-[#8B5CF6]/15 animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute w-40 h-40 rounded-full border border-[#8B5CF6]/10 animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Main puzzle icon */}
                <div className="relative w-20 h-20 rounded-full bg-[#C084FC]/15 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
                  <div className="relative w-16 h-16 rounded-full bg-[#C084FC]/15 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
                    <PuzzlePieceIcon className=" text-[#B386FF] w-10 h-10" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider">
                <span className="text-[#B386FF]">Extensions</span> <span className="text-white">List</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 px-4 sm:px-0">
              <div className="flex flex-row bg-gradient-to-r from-[#4A4A5F] via-[#2a2a3a] to-[#1a1a2e] rounded-2xl p-2">
                <div className="bg-white p-2 flex items-center justify-center pointer-events-none rounded-xl min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px]">
                  <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                </div>
                <input
                  type="text"
                  placeholder="Search extension"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="flex-1 ml-3 py-2 sm:py-3 text-base sm:text-lg text-white bg-transparent placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto px-4 sm:px-0">
              Explore our Curated and community-contributed extensions for Scaffold-Stark 2.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              To install an extension, simply copy and run the installation command provided for each extension.
            </p>
          </div>

          {/* Extensions Grid */}
          {filteredExtensions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 mb-16">
              {filteredExtensions.map((extension, index) => (
                <ExtensionCardDetail
                  key={index}
                  title={extension.title}
                  description={extension.longDesc}
                  command={extension.command}
                  github={extension.github}
                  isActive={extension.isActive}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 mb-16">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4A4A5F]/30 to-[#2A2A3E]/30 flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-12 h-12 text-gray-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Extensions Found</h3>
              <p className="text-gray-400 text-center max-w-md mb-6">
                {searchTerm
                  ? `We couldn't find any extensions matching "${searchTerm}". Try a different search term.`
                  : "No extensions are currently available."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white rounded-xl hover:from-[#9333EA] hover:to-[#C084FC] transition-all duration-300 font-medium"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Coming Soon Section */}
          <div className="text-center px-4 sm:px-0">
            <p className="text-xl sm:text-2xl font-medium text-[#B386FF]">and More Coming Soon</p>
          </div>
        </div>
      </div>
      <div className="bg-[#0F0F0F] py-10">
        <Footer />
      </div>
    </>
  );
};

export default Extensions;
