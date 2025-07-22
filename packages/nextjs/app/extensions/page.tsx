"use client";

import type { NextPage } from "next";
import { ExtensionCardPreview } from "~~/components/Extensions/ExtensionCardPreview";
import { MetaHeader } from "~~/components/MetaHeader";
import { EXTENSIONS } from "~~/constants/extensions";

const Extensions: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Extensions | Scaffold-Stark"
        description="Explore all available extensions for Scaffold-Stark. Build your dApp faster with pre-integrated extensions."
      />
      <div className="min-h-screen bg-[#0F0F0F] py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6 tracking-wider">Extensions</h1>
            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
              Build your dApp faster with pre-integrated extensions. Save the hassle of integrating different projects
              by using our extensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXTENSIONS.map((extension, index) => (
              <ExtensionCardPreview
                key={index}
                title={extension.title}
                description={extension.description}
                command={extension.command}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Extensions;
