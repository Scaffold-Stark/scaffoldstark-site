"use client";

import { useState } from "react";
import Image from "next/image";
import { Space_Grotesk } from "@next/font/google";
import type { NextPage } from "next";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { HooksExample } from "~~/components/HooksExample";
import { MetaHeader } from "~~/components/MetaHeader";

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const Home: NextPage = () => {
  const [cloneCommandCopied, setCloneCommandCopied] = useState(false);
  const [npxCommandCopied, setNpxCommandCopied] = useState(false);
  return (
    <>
      <MetaHeader />
      {/* Hero section  */}
      <div
        className="flex flex-col items-center py-8 gap-12 md:gap-20"
        style={{
          backgroundImage: `url(/background.svg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex relative w-14 h-14 p-3 rounded-full">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/icon.svg" />
          </div>
          <p className="text-3xl m-0 font-medium mt-1 text-[#290C4F]">Scaffold-Stark</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-8 mb-14 px-4 text-[#363636]">
          <h1 className="text-center text-3xl lg:text-5xl max-w-md lg:max-w-2xl px-3 m-0">
            Open-source toolkit for building dApps on Starknet
          </h1>
          <p className="m-0 text-center max-w-xl px-3">
            Built using NextJS, Starknet.js, Scarb, Starknet-React, Starknet Foundry and Typescript. Designed to make it
            easier for developers to create, deploy and interact with smart contracts.
          </p>
          <div className={`flex flex-col gap-5 items-center mb-2 ${SpaceGrotesk.className}`}>
            <CopyToClipboard
              text={"git clone https://github.com/Scaffold-Stark/scaffold-stark-2.git"}
              onCopy={() => {
                setCloneCommandCopied(true);
                setTimeout(() => {
                  setCloneCommandCopied(false);
                }, 800);
              }}
            >
              <div className="mx-2 flex border-2 border-gray-300 rounded-xl px-3 sm:px-5 py-1 gap-2">
                <p className="m-0 text-center text-sm sm:text-base">
                  git clone https://github.com/Scaffold-Stark/scaffold-stark-2.git
                </p>
                {cloneCommandCopied ? (
                  <CheckCircleIcon
                    className="text-xl font-normal h-6 w-4 flex-shrink-0 cursor-pointer"
                    aria-hidden="true"
                  />
                ) : (
                  <DocumentDuplicateIcon
                    className="text-xl font-normal h-6 w-4 flex-shrink-0 cursor-pointer"
                    aria-hidden="true"
                  />
                )}
              </div>
            </CopyToClipboard>
            <div className="divider px-6 sm:px-20 m-0">OR</div>
            <div className="flex items-center gap-2 mx-2">
              <CopyToClipboard
                text={"npx create-stark@latest"}
                onCopy={() => {
                  setNpxCommandCopied(true);
                  setTimeout(() => {
                    setNpxCommandCopied(false);
                  }, 800);
                }}
              >
                <div className="max-w-sm flex border-2 border-gray-300 rounded-xl px-3 sm:px-5 py-1 gap-2">
                  <p className="m-0 text-center text-sm sm:text-base">npx create-stark@latest</p>
                  {npxCommandCopied ? (
                    <CheckCircleIcon
                      className="text-xl font-normal h-6 w-4 cursor-pointer flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <DocumentDuplicateIcon
                      className="text-xl font-normal h-6 w-4 cursor-pointer flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </CopyToClipboard>
            </div>
          </div>

          <div className={`flex flex-wrap gap-4 items-center justify-center ${SpaceGrotesk.className}`}>
            <a
              id="Docs"
              href="https://www.docs.scaffoldstark.com/"
              target="_blank"
              className="btn btn-outline btn-sm px-8 h-10 bg-white normal-case font-normal text-lg rounded-[14px] border-gradient text-[#363636]"
            >
              Docs
            </a>
            <a
              id="Github"
              href="https://github.com/Scaffold-Stark/scaffold-stark-2"
              className="btn btn-outline btn-sm px-5 h-10 bg-gradient normal-case font-normal text-lg flex items-center gap-2 border-none rounded-[14px] text-white"
            >
              Github
              <Image src="/github.png" alt="github icon" height={25} width={25} />
            </a>
            <a
              id="Docs"
              href="https://scaffold-stark-demo.vercel.app/debug"
              target="_blank"
              className="btn btn-outline btn-sm px-8 h-10 bg-white normal-case font-normal text-lg rounded-[14px] border-gradient text-[#363636]"
            >
              Demo
            </a>
          </div>
        </div>
      </div>

      {/* Debug Contracts */}
      <div className={` bg-[#FBFBFB] text-[#000] ${SpaceGrotesk.className}`}>
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:pl-12 lg:pr-6 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 pt-4 lg:pt-0">
              <p className="text-center lg:text-left text-xl m-0 font-light">DEBUG CONTRACTS</p>
            </div>

            <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium text-gradient">
              Your frontend auto-adapts to your smart contract as you edit it.
            </h2>
            <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
              Debug and refine your smart contracts with a live-updating frontend. Scaffold-Stark is an ideal stack for
              progressing from rapid prototyping to production-grade dApps.
            </p>
          </div>
          <div className="max-w-[400px] lg:max-w-none">
            <Image src="/wallet.svg" alt="Debug contracts" width={1400} height={1400} />
          </div>
        </div>
      </div>

      {/* SE-2 Components */}
      <div className={` bg-[#FFF8FC] text-[#000] ${SpaceGrotesk.className}`}>
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
          <div className="flex flex-col items-center">
            <div className="max-w-[400px] lg:max-w-none">
              <Image src="/components.png" alt="Scaffold-ETH 2 components" width={482} height={482} />
            </div>
          </div>
          <div className="space-y-6 flex flex-col items-center lg:items-end">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 lg:w-3/4 pt-4 lg:pt-0">
              <p className="text-center lg:text-left text-xl m-0 font-light">COMPONENTS</p>
            </div>
            <div className="lg:w-3/4 space-y-5">
              <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium text-gradient">
                Collection of common web3 components to quickly build your frontend.
              </h2>
              <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
                Accelerate your dapp development using our pre-built components for common web3 use cases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hooks and Utils */}
      <div className={` bg-[#FBFBFB] text-[#000] ${SpaceGrotesk.className}`}>
        <div className="container max-w-[80%] lg:max-w-7xl m-auto py-24 lg:py-20 lg:pl-12 lg:pr-6 flex flex-col-reverse lg:flex-row items-center gap-9 lg:gap-28">
          <div className="space-y-6 flex-shrink lg:w-2/3 lg:self-start lg:mt-14">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 pt-4 lg:pt-0">
              <p className="text-center lg:text-left text-xl m-0 font-light">CUSTOM HOOKS</p>
            </div>

            <h2 className="text-2xl lg:text-4xl text-center lg:text-left font-medium text-gradient">
              Collection of React hooks wrapper <br /> around starknet-react
            </h2>
            <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:pr-6">
              Simplify interactions with smart contracts with typescript autocompletion
            </p>
          </div>
          <HooksExample />
        </div>
      </div>

      {/* Block Explorer */}
      <div className={` bg-[#FFF8FC] text-[#000] ${SpaceGrotesk.className}`}>
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
          <div className="flex flex-col items-center">
            <div className="max-w-[400px] lg:max-w-none">
              <Image src="/pana.svg" alt="SS-2" width={416} height={416} />
            </div>
          </div>
          <div className="space-y-6 flex flex-col items-center lg:items-end lg:pl-28">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 lg:w-3/4 pt-4 lg:pt-0">
              <p className="text-center lg:text-left text-xl m-0 font-light">COMPONENTS</p>
            </div>
            <div className="lg:w-3/4 space-y-5">
              <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium text-gradient">
                Collection of common web3 components to quickly build your frontend.
              </h2>
              <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
                Accelerate your dapp development using our pre-built components for common web3 use cases.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col items-center py-10 gap-10 md:gap-16 bg-white pt-20 text-black ${SpaceGrotesk.className}`}
      >
        <div className="flex flex-col justify-center items-center gap-6 md:gap-8 mb-10 md:mb-14 px-4">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl max-w-md md:max-w-lg lg:max-w-2xl px-4 m-0">
            Community
          </h1>

          {/* Main Community Content */}
          <div className="md:border border-gray-300 rounded-[135px] flex flex-col md:flex-row items-center pt-3 pb-6 md:py-8">
            {/* Newsletter Icon Section */}
            <div className="border-b md:border-b-0 md:border-r border-gray-300 px-10 md:px-16 pb-4 md:pb-0">
              <Image src="/newsletter.svg" alt="icon" width={130} height={130} />
            </div>

            {/* Community Information Section */}
            <div className="flex flex-col items-center md:items-start px-8 md:px-12 mt-4 md:mt-0">
              <p className="m-0 text-center md:text-left max-w-sm md:max-w-md px-3">
                You can build and learn together with our community, joining over 800 members in creating products,
                prototypes, and tutorials to enrich the web3 ecosystem.
              </p>

              {/* Links Section */}
              <div className="flex flex-wrap items-center justify-center gap-5 mt-8 md:mt-5">
                <a
                  className="flex gap-3 rounded-lg py-2 px-4 items-center border border-[#9B5584]"
                  href="https://t.me/+wO3PtlRAreo4MDI9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/telegram.svg" alt="telegram" width={24} height={24} />
                  <span className="text-[16px] md:text-[18px]">Join Telegram</span>
                </a>
                <a
                  className="flex gap-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg py-2 px-4 items-center text-white"
                  href="https://app.onlydust.com/p/speedrun-scaffold-stark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/onlydust.svg" alt="logo-onlydust" width={26} height={26} />
                  <span className="text-[16px] md:text-[18px]">Join Onlydust</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
