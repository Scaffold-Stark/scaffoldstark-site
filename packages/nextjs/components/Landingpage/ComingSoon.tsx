import Image from "next/image";

export const ComingSoon = () => {
  return (
    <section className="grid grid-cols-6 gap-10 items-center content">
      <div className="col-span-3">
        <Image src={"/assets/comingsoon.png"} alt="rocket" width={416} height={416} />
      </div>
      <div className="col-span-3 item-spacing-col">
        <p className="subTitle-section">COMING SOON</p>
        <ul className="max-w-[670px] list-disc list-outside pl-12">
          <li className="title-section">Built-in Block Explorer to check transaction data easily during your tests</li>
          <li className="title-section">AI App generator</li>
        </ul>
      </div>
    </section>
  );
};
