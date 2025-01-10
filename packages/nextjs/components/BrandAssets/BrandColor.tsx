import Image from "next/image";
import { copyToClipBoard } from "~~/utils";

const MAIN_DATA = [
  {
    title: "Main Light",
    bgColor: "#A38CFF",
  },
  {
    title: "Main Dark",
    bgColor: "#0C0C4F",
  },
];

const GRADIENT_DATA = [
  {
    title: "Main Gradient",
    from: "#181872",
    to: "#9B5584",
    background: "/assets/main-gradient.png",
  },
  {
    title: "Dark logo",
    from: "#FFB0FF",
    to: "#7748CD",
    background: "/assets/darklogo.png",
  },
];

const CardMain = ({ title, bgColor }: { title: string; bgColor: string }) => {
  return (
    <div className="rounded-lg border border-[#D5D5D5] bg-[#F3F3F3]">
      <div className="p-1">
        <div
          className={`w-full lg:h-[163px] h-[96.4px] flex items-center justify-center rounded-md`}
          style={{
            background: `${bgColor}`,
          }}
        ></div>
      </div>
      <div className="px-4 py-2">
        <p className="text-lg text-black font-bold">{title}</p>
        <p className="text-[#6B7280] text-sm">{bgColor}</p>
      </div>
      <div
        className="cursor-pointer flex items-center md:mt-0.5 mt-0 h-10 border-t border-[#D5D5D5]"
        onClick={() => copyToClipBoard(bgColor)}
      >
        <p className="md:text-lg text-xs md:mt-2 mt-0 text-black font-bold w-full text-center">Copy Code</p>
      </div>
    </div>
  );
};

const CardGradiant = ({
  title,
  background,
  from,
  to,
}: {
  title: string;
  background: string;
  from: string;
  to: string;
}) => {
  return (
    <div className="rounded-lg border border-[#D5D5D5] bg-[#F3F3F3]">
      <div className="p-1">
        <div>
          <Image
            src={background}
            alt="logo"
            width={400}
            height={400}
            className="lg:w-auto w-full lg:h-auto h-[96.4px]"
          />
        </div>
      </div>
      <div className="px-4 py-2">
        <p className="md:text-lg text-sm text-black font-bold">{title}</p>
        <div className="flex items-center gap-4">
          <p className="text-[#6B7280] md:text-sm text-xs">{from}</p>
          <p className="text-[#6B7280] md:text-sm text-xs">{to}</p>
        </div>
      </div>
      <div className="cursor-pointer flex border-t border-[#D5D5D5]">
        <p
          className="md:text-lg text-xs text-black font-bold border-r border-[#D5D5D5] w-full text-center p-3"
          onClick={() => copyToClipBoard(from)}
        >
          Copy
        </p>
        <p
          className="md:text-lg text-xs text-black font-bold w-full text-center p-3"
          onClick={() => copyToClipBoard(to)}
        >
          Copy
        </p>
      </div>
    </div>
  );
};

export const BrandColor = () => {
  return (
    <div>
      <p className="brand-assets-title text-center">Brand Color</p>
      <p className="text-[#6B7280] text-lg text-center md:mt-2 mt-1 px-2 leading-5">
        Make sure there is good contrast between the logo and background to provide legibility.
      </p>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 content !mt-11">
        {MAIN_DATA.map((item, index) => (
          <CardMain key={index} {...item} />
        ))}
        {GRADIENT_DATA.map((item, index) => (
          <CardGradiant key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
