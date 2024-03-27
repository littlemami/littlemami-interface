import Image from "next/image";

export const poolCardArr = [
  {
    pool: 0,
    imgSrc: "/images/pool_2.png",
    joinScrArr: ["/images/svg/tool_1.svg", "/images/svg/lmc.svg"],
  },
  {
    pool: 1,
    imgSrc: "/images/pool_1.png",
    joinScrArr: [
      "/images/svg/tool_1.svg",
      "/images/svg/lmc.svg",
      "/images/svg/tool_2.svg",
    ],
  },
];

export const poolListArr = [
  {},
  {
    pool: 0,
    avatarList: ["/images/svg/tool_1.svg", "/images/svg/lmc.svg"],
    lmc: 900.2,
    tagList: (tools = 0, lmc = 0) => [
      {
        color: "#2d2569",
        textNode: `${tools} Tools`,
      },
      {
        color: "#532b69",
        textNode: (
          <div className="flex flex-row items-center">
            <Image src="/images/svg/eth.svg" width={8} height={8} alt="eth" />
            <div className="ml-1">{lmc} LMC</div>
          </div>
        ),
      },
    ],
  },
  {
    pool: 1,
    avatarList: [
      "/images/svg/tool_1.svg",
      "/images/svg/lmc.svg",
      "/images/svg/tool_2.svg",
    ],
    lmc: 900.2,
    tagList: (tools = 0, lmc = 0) => [
      {
        color: "#2d2569",
        textNode: `${tools} Tools`,
      },
      {
        color: "#532b69",
        textNode: (
          <div className="flex flex-row items-center">
            <Image src="/images/svg/eth.svg" width={8} height={8} alt="eth" />
            <div className="ml-1">{lmc} LMC</div>
          </div>
        ),
      },
    ],
  },
];
