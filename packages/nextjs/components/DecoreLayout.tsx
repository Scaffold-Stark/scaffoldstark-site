export const DecoreLayout = () => {
  return (
    <div className="relative">
      <div className="bg-[#0F0F0F] h-[113px] left-0 w-[calc((100%-1439px)/2)] absolute top-0 z-10"></div>
      <div className="bg-[#0F0F0F] h-[113px] right-0 w-[calc((100%-1439px)/2)] absolute top-0 z-10"></div>
      <div className="absolute w-full rotate-180 z-20 md:top-0 -top-10">
        <div className="relative max-w-[1440px] mx-auto">
          <div
            className="w-full h-[113px] bg-[#0F0F0F]"
            style={{
              clipPath:
                "polygon(0 100%, 100% 100%, 100% 0, calc(100% - 59px) 0, calc(100% - 120px) 59px, 120px 59px, 59px 0, 0 0)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
