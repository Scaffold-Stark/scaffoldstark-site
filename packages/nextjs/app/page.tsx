"use client";

import type { NextPage } from "next";
import { ComingSoon } from "~~/components/Landingpage/ComingSoon";
import { HookComponent } from "~~/components/Landingpage/CustomHook";
import { DebugContract } from "~~/components/Landingpage/DebugContract";
import { WorldClass } from "~~/components/Landingpage/WorldClass";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div>
        <DebugContract />
        <HookComponent />
        <ComingSoon />
        <WorldClass />
      </div>
    </>
  );
};

export default Home;
