import Image from "next/image";
import AvatarGroup from "../AvatarGroup";
import { StakeContext } from "@/pages/stake";
import { useEffect, useMemo, useState, useContext } from "react";
import dayjs from "dayjs";
import { displayNonZeroDigits } from "@/utils";

import Web3 from "web3";
import styles from "@/pages/stake/index.module.scss";

const PoolCard = (props) => {
  const web3 = new Web3("https://ethereum-rpc.publicnode.com");
  const { imgSrc, joinScrArr, onClick, pool, subInfo } = props;

  const getStake = useContext(StakeContext);
  const { rate, start, userAmount, stakeAmount, userRemain, tokenAmount } =
    getStake[pool];

  const [time, setTime] = useState("");

  useEffect(() => {
    if (start) {
      web3.eth.getBlock(start).then((res) => {
        const time1 = res.timestamp.toString();
        const format = dayjs(time1 * 1000).format("DD/MM/YYYY HH");
        const hour = dayjs(time1 * 1000).hour();
        setTime(`${format} ${hour > 11 ? "PM" : "AM"} UTC`);
      });
    } else {
      setTime("--");
    }
  }, [start]);

  const arr = useMemo(
    () => [
      {
        text: "Start Block",
        // value: start,
        value: start || "--",
      },
      {
        text: "LMC per Block",
        value: `${rate || 0} LMC`,
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
    [start, rate, userAmount, stakeAmount, tokenAmount, time, start]
  );
  return (
    <div
      onClick={() => onClick?.(props?.pool)}
      className={`${
        pool === 0 ? styles.poolsCards : styles.poolsCards2
      } relative hover:-translate-y-[15px] after:block after:absolute after:-bottom-[4px] after:left-[50%] after:-translate-x-[50%] after:w-[60%] after:h-[4px] after:rounded-[0_0_4px_4px] after:shadow-[0px_2px_10px_0px_#9C21FDF5] transition-all flex-1 shrink-0 rounded-[1.875rem] border-[0.0625rem] border-solid border-[rgba(255,255,255,0.17)] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)] backdrop-blur-[1.5625rem] p-[3.125rem_2.8125rem_3.4375rem_2.8125rem] flex flex-col cursor-pointer`}
      style={{
        background:
          "linear-gradient(198.28deg, rgba(126, 115, 169, 0.1) 17.6%,rgba(81, 72, 107, 0.098) 93.27%)",
      }}
    >
      <div className="relative w-full pt-[50%]">
        <Image src={imgSrc} layout="fill" alt={imgSrc} />
        <p className="absolute bg-[#1E1741B2] p-[10px_30px] left-[50%] bottom-[20px] -translate-x-[50%] rounded-[40px]">
          {subInfo}
        </p>
      </div>
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
