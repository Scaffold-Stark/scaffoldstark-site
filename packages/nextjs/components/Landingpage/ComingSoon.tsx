import Image from "next/image";

export const ComingSoon = () => {
  return (
    <section className="grid lg:grid-cols-6 grid-cols-1 lg:gap-10 gap-0 items-center content lg:!pb-14">
      <div className="col-span-3">
        <Image src={"/assets/comingsoon.png"} alt="rocket" width={416} height={416} className="px-20 lg:px-0 mx-auto" />
      </div>
      <div className="col-span-3 item-spacing-col mt-12 lg:mt-0">
        <p className="subTitle-section text-center lg:text-left">COMING SOON</p>
        <ul className="lg:max-w-[670px] max-w-max list-disc ml-6 lg:pl-12 pl-6">
          <li className="title-section-li mb-3">
            Built-in Block Explorer to check transaction data easily during your tests
          </li>
          <li className="title-section-li">AI App generator</li>
        </ul>
      </div>
    </section>
  );
};
