"use client";

import type { NextPage } from "next";
import { ComingSoon } from "~~/components/Landingpage/ComingSoon";
import { DebugContract } from "~~/components/Landingpage/DebugContract";
import { HookComponent } from "~~/components/Landingpage/HookComponent";
import { OpenSource } from "~~/components/Landingpage/OpenSource";
import { WorldClass } from "~~/components/Landingpage/WorldClass";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col gap-28">
        <OpenSource />
        <DebugContract />
        <HookComponent />
        <ComingSoon />
        <WorldClass />
      </div>
    </>
  );
};

export default Home;
