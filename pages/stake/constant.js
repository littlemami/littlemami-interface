import Image from "next/image";

const commonRes = {
  startTime: "01/01/2024 12pm UTC",
  lmc: "8.8 LMC",
  apr: "312.3%",
};

export const poolCardArr = [
  {
    pool: 1,
    imgSrc: "/images/pool_1.png",
    joinScrArr: ["/images/svg/tool_1.svg", "/images/svg/lmc.svg"],
    ...commonRes,
  },
  {
    pool: 2,
    imgSrc: "/images/pool_2.png",
    joinScrArr: [
      "/images/svg/tool_1.svg",
      "/images/svg/lmc.svg",
      "/images/svg/tool_2.svg",
    ],
    ...commonRes,
  },
];

export const poolListArr = [
  {},
  {
    pool: 1,
    avatarList: ["/images/svg/tool_1.svg", "/images/svg/lmc.svg"],
    lmc: 900.2,
    tagList: [
      {
        color: "#2d2569",
        textNode: "5 Tools",
      },
      {
        color: "#532b69",
        textNode: (
          <div className="flex flex-row items-center">
            <Image src="/images/svg/eth.svg" width={8} height={8} alt="eth" />
            <div className="ml-1">40000 LMC</div>
          </div>
        ),
      },
    ],
  },
  {
    pool: 2,
    avatarList: [
      "/images/svg/tool_1.svg",
      "/images/svg/lmc.svg",
      "/images/svg/tool_2.svg",
    ],
    lmc: 900.2,
    tagList: [
      {
        color: "#2d2569",
        textNode: "5 Tools",
      },
      {
        color: "#532b69",
        textNode: (
          <div className="flex flex-row items-center">
            <Image src="/images/svg/eth.svg" width={8} height={8} alt="eth" />
            <div className="ml-1">40000 LMC</div>
          </div>
        ),
      },
    ],
  },
];
