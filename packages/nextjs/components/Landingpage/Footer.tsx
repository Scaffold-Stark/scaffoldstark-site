import { REDIRECT_LINK } from "~~/helper/redirect";

export const Footer = () => {
  return (
    <div className="flex items-center gap-4 justify-center mt-20">
      <a className="font-medium cursor-pointer underline" onClick={() => window.open(REDIRECT_LINK.editme, "_blank")}>
        Edit me
      </a>
      <div className="w-1 h-1 bg-white rounded-full"></div>
      <a className="font-medium cursor-pointer underline" onClick={() => window.open("/brandkit", "_blank")}>
        Brand Assets
      </a>
    </div>
  );
};
