import Link from "next/link";
import { ExtensionCardPreview } from "../Extensions/ExtensionCardPreview";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { EXTENSIONS } from "~~/constants/extensions";

export const ExtensionsSection = () => {
  return (
    <div className="flex flex-col gap-28 border-t border-t-[#484848] py-20">
      <div className="flex flex-col gap-3  items-center justify-center font-grotesk text-ellipsis">
        <h1 className="text-3xl font-bold text-white mb-6 tracking-wider">Create with Extensions</h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Build you dApp faster with pre-integrated extensions. Save the hassle of integrating different projects by
          using our extensions{" "}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXTENSIONS.map((extension, index) => (
            <ExtensionCardPreview
              key={index}
              title={extension.title}
              description={extension.description}
              command={extension.command}
            />
          ))}
        </div>
        <Link
          href="/extensions"
          className="mt-6 cursor-pointer bg-transparent border border-[#B386FF] text-[#B386FF] px-8 py-3 rounded-full font-grotesk font-medium hover:bg-[#B386FF] hover:text-black transition-all duration-300 flex items-center gap-2 relative z-30"
        >
          Explore all the extensions
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
