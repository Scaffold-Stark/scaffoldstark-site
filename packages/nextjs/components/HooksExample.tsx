import { ReactNode } from "react";
import { Space_Grotesk } from "@next/font/google";

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const Red = ({ children }: { children: ReactNode }) => <span className="text-[#FF5962]">{children}</span>;

const Cyan = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <span className={`${dark ? "text-[#00968D]" : "text-[#00B0A6]"}`}>{children}</span>
);

const Purple = ({ children }: { children: ReactNode }) => <span className="text-[#7B61FF]">{children}</span>;

export const HooksExample = () => {
  return (
    <div className={`w-full flex-grow ${SpaceGrotesk.className}`}>
      <div className="w-full h-full border border-[#BB16E8] rounded-3xl p-4 lg:p-6 text-xs lg:text-sm overflow-x-scroll whitespace-nowrap  lg:overflow-auto lg:whitespace-normal">
        <p className="my-3">
          <Red>const</Red>
          {" { "}writeAsync{" } "}
          <Cyan> = </Cyan>
          <Purple>useScaffoldContractWrite</Purple>({"{"}
          <br />
          <span className="inline-block ml-4">
            <span className="text-[#9F0099]">contractName</span>: <Cyan dark>&quot;YourContract&quot;</Cyan>,
            <br />
            <span className="text-[#9F0099]">functionName</span>: <Cyan dark>&quot;setPurpose&quot;</Cyan>,
            <br />
            <span className="text-[#9F0099]">args</span>: [<Cyan dark>&quot;The value to set&quot;</Cyan>],
            <br />
            <span className="text-[#9F0099]">blockConfirmation</span>: <Cyan dark>1</Cyan>,
            <br />
            {"}"}
          </span>
          <br />
          {"}"});
        </p>
      </div>
    </div>
  );
};
