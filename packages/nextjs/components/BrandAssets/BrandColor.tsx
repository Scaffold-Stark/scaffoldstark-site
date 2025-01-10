import Image from "next/image";

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
          className={`w-full h-[163px] flex items-center justify-center rounded-md`}
          style={{
            background: `${bgColor}`,
          }}
        ></div>
      </div>
      <div className="px-4 py-2">
        <p className="text-lg text-black font-bold">{title}</p>
        <p className="text-[#6B7280] text-sm">{bgColor}</p>
      </div>
      <div className="cursor-pointer flex pt-3.5 border-t border-[#D5D5D5]">
        <p className="text-lg text-black font-bold w-full text-center">Copy Code</p>
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
          <Image src={background} alt="logo" width={400} height={400} className="w-auto h-auto" />
        </div>
      </div>
      <div className="px-4 py-2">
        <p className="text-lg text-black font-bold">{title}</p>
        <div className="flex items-center gap-4">
          <p className="text-[#6B7280] text-sm">{from}</p>
          <p className="text-[#6B7280] text-sm">{to}</p>
        </div>
      </div>
      <div className="cursor-pointer flex border-t border-[#D5D5D5]">
        <p className="text-lg text-black font-bold border-r border-[#D5D5D5] w-full text-center p-3">Copy</p>
        <p className="text-lg text-black font-bold w-full text-center p-3">Copy</p>
      </div>
    </div>
  );
};

export const BrandColor = () => {
  return (
    <div className="content">
      <p className="brand-assets-title text-center">Brand Color</p>
      <p className="text-[#6B7280] text-lg text-center mt-2">
        Make sure there is good contrast between the logo and <br /> background to provide legibility.
      </p>
      <div className="mt-11 grid grid-cols-4 gap-2">
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
