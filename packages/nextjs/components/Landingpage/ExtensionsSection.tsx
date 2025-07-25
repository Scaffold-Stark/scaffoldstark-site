import Link from "next/link";
import { ExtensionCardPreview } from "../Extensions/ExtensionCardPreview";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { EXTENSIONS } from "~~/constants/extensions";

export const ExtensionsSection = () => {
  return (
    <div className="flex flex-col border-t border-t-[#484848] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 items-center justify-center font-grotesk">
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 items-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wider text-center">
              Create with Extensions
            </h1>
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl text-center">
              Build you dApp faster with pre-integrated extensions. Save the hassle of integrating different projects by
              using our extensions
            </p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {EXTENSIONS.map((extension, index) => (
                <ExtensionCardPreview
                  key={index}
                  title={extension.title}
                  description={extension.shortDesc}
                  command={extension.command}
                />
              ))}
            </div>
          </div>
          <Link
            href="/extensions"
            className="mt-4 sm:mt-6 cursor-pointer bg-transparent border-2 border-[#B386FF] text-[#B386FF] px-8 sm:px-12 py-2 sm:py-3 rounded-full font-grotesk font-semibold hover:bg-[#B386FF] hover:text-black transition-all duration-300 flex items-center gap-3 relative z-30 text-base sm:text-xl"
          >
            Explore all the extensions
            <ArrowTopRightOnSquareIcon className="w-5 h-5 sm:w-7 sm:h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
};
