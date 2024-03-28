import Image from "next/image";
import AvatarGroup from "../AvatarGroup";
import { useTotalStakeInfo } from "@/hooks/stake";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { displayNonZeroDigits } from "@/utils";

import Web3 from "web3";

const PoolCard = (props) => {
  const web3 = new Web3("https://ethereum-rpc.publicnode.com");
  const { imgSrc, joinScrArr, onClick, pool } = props;
  const { rate, start, userAmount, stakeAmount, userRemain, tokenAmount } =
    useTotalStakeInfo(pool);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (start) {
      web3.eth.getBlock(start).then((res) => {
        const time1 = res.timestamp.toString();
        const format = dayjs(time1 * 1000).format("DD/MM/YYYY HH");
        const hour = dayjs(time1 * 1000).hour();
        setTime(`${format} ${hour > 11 ? "PM" : "AM"} UTC`);
      });
    }
  }, [start]);

  const arr = useMemo(
    () => [
      {
        text: "Start Time",
        // value: start,
        value: time,
      },
      {
        text: "LMC per Block",
        value: `${rate} LMC`,
      },
      {
        text: "APR",
        value: `${
          displayNonZeroDigits(
            ((+userAmount / +stakeAmount) * +rate * 7200 * 365) /
              (+userAmount * +tokenAmount)
          ) || 0
        } %`,
      },
    ],
    [start, rate, userAmount, stakeAmount, tokenAmount, time]
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
