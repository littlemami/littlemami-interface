"use client";
import Image from "next/image";
import AvatarGroup from "../AvatarGroup";
import { useTotalStakeInfo } from "@/hooks/stake";
import { useMemo } from "react";
import dayjs from "dayjs";

const PoolCard = (props) => {
  const { imgSrc, joinScrArr, startTime, lmc, apr, onClick, pool } = props;
  const { rate, start, userAmount, stakeAmount, userRemain } =
    useTotalStakeInfo(pool);
  console.log(pool, rate);
  const arr = useMemo(
    () => [
      {
        text: "Start Time",
        value: <>{dayjs(start * 1000).format("YYYY-MM-DD HH:mm:ss")}</>,
      },
      {
        text: "LMC per Block",
        value: `${rate} LMC`,
      },
      {
        text: "APR",
        value: apr,
      },
    ],
    [start, rate]
  );
  return (
    <div
      onClick={() => onClick?.(props?.pool)}
      className="flex-1 shrink-0 rounded-[1.875rem] border-[0.0625rem] border-solid border-[rgba(255,255,255,0.17)]  shadow-[0px_4px_13.8px_0px_rgba(0,0,0,0.25)] backdrop-blur-[1.5625rem] p-8 flex flex-col cursor-pointer"
    >
      <Image src={imgSrc} width={800} height={40} alt={imgSrc} />
      <AvatarGroup list={joinScrArr} />
      <div className="flex flex-col">
        {arr.map((item) => {
          return (
            <div className="flex flex-row justify-between mb-3" key={item}>
              <div>{item.text}</div>
              <div>{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoolCard;
