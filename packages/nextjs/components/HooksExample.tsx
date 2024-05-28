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
    <div className={`w-[50rem] flex-grow ${SpaceGrotesk.className}`}>
      <div className="w-full h-full border border-[#BB16E8] rounded-3xl p-4 lg:p-6 text-xs lg:text-sm overflow-x-scroll whitespace-nowrap lg:overflow-auto lg:whitespace-normal">
        <p className="my-3">
          <Red>const</Red> {" { "} writeAsync {" } "}
          <Cyan>=</Cyan> <Purple>useScaffoldWriteContract</Purple>({"{"}
          <br />
          <span className="inline-block ml-4">
            <span className="text-[#9F0099]">contractName</span>: &quot;MyContract&quot;,
            <br />
            <span className="text-[#9F0099]">functionName</span>: &quot;myFunction&quot;,
            <br />
            <span className="text-[#9F0099]">args</span>: [arg1, arg2],
            <br />
            <span className="text-[#9F0099]">options</span>: &quot;&quot;,
            <br />
            {"}"}
          </span>
          <br />
          {"});"}
        </p>
      </div>
    </div>
  );
};
