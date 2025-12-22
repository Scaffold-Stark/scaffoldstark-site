"use client";

import { useLayoutEffect, useState } from "react";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { BlockExplorer } from "~~/components/Landingpage/BlockExplorer";
import { DebugContract } from "~~/components/Landingpage/DebugContract";
import { HookComponent } from "~~/components/Landingpage/HookComponent";
import { OpenSource } from "~~/components/Landingpage/OpenSource";
import { WorldClass } from "~~/components/Landingpage/WorldClass";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  const { setTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  useLayoutEffect(() => {
    const initializeTheme = async () => {
      await setTheme("dark");
      setIsThemeLoaded(true);
    };

    initializeTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isThemeLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F0F0F]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col gap-28">
        <OpenSource />
        <DebugContract />
        <HookComponent />
        <BlockExplorer />
        <WorldClass />
      </div>
    </>
  );
};

export default Home;
