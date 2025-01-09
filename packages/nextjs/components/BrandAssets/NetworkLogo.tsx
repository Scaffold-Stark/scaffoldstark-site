import Image from "next/image";

const DATA_CARD = [
  {
    logo: "/assets/logo-text-scaffold.png",
    title: "Light logotype",
    bgColor: "#FFF",
    logoColor: "#0C0C4F",
  },
  {
    logo: "/assets/logo.png",
    title: "Light logo",
    bgColor: "#FFF",
    logoColor: "#0C0C4F",
  },
  {
    logo: "/assets/logo-text-scaffold-pink.png",
    title: "Dark logotype",
    bgColor: "#000",
    logoColor: "#A38CFF",
  },
  {
    logo: "/assets/scaffold-pink.png",
    title: "Dark logo",
    bgColor: "#000",
    logoColor: "#A38CFF",
  },
];

const Card = ({
  logo,
  title,
  bgColor,
  logoColor,
}: {
  logo: string;
  title: string;
  bgColor: string;
  logoColor: string;
}) => {
  return (
    <div className="rounded-lg border border-[#D5D5D5] bg-[#F3F3F3]">
      <div className="p-1">
        <div
          className={`w-full h-[183px] flex items-center justify-center rounded-md`}
          style={{
            background: `${bgColor}`,
          }}
        >
          {logo.includes("text") ? (
            <Image src={logo} alt="logo" width={244} height={244} />
          ) : (
            <Image src={logo} alt="logo" width={44} height={44} />
          )}
        </div>
      </div>
      <div className="px-4 py-2">
        <p className="text-lg text-black font-bold">{title}</p>
        <p className="text-[#6B7280] text-sm">{logoColor}</p>
      </div>
      <div className="cursor-pointer flex border-t border-[#D5D5D5]">
        <p className="text-lg text-black font-bold border-r border-[#D5D5D5] w-full text-center p-3">PNG</p>
        <p className="text-lg text-black font-bold w-full text-center p-3">SVG</p>
      </div>
    </div>
  );
};

export const NetworkLogo = () => {
  return (
    <div className="py-24">
      <p className="brand-assets-title text-center">Network Logo</p>
      <p className="text-[#6B7280] text-lg text-center mt-2">
        Make sure there is good contrast between the logo and <br /> background to provide legibility.
      </p>
      <div className="grid grid-cols-4 gap-2 !mt-11 content">
        {DATA_CARD.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
