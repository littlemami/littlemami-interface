import Image from "next/image";
import { displayNonZeroDigits } from "@/utils";
import { useMemo, useContext } from "react";
import { StakeContext } from "@/pages/stake";

const StakeNum = (props) => {
  const { className } = props;

  const getStake = useContext(StakeContext);
  const { stakeAmount, tokenAmount, userAmount, userRemain } = getStake[0];
  const {
    stakeAmount: stakeAmount2,
    tokenAmount: tokenAmount2,
    userAmount: userAmount2,
    userRemain: userRemain2,
  } = getStake[1];

  const arr = useMemo(
    () => [
      {
        imgSrc: "/images/svg/totalStake.svg",
        value: `${
          displayNonZeroDigits(
            stakeAmount * tokenAmount + stakeAmount2 * tokenAmount2
          ) || 0
        }`,
        title: "Total Staked",
      },
      {
        imgSrc: "/images/svg/myStake.svg",
        value: `${
          displayNonZeroDigits(
            userAmount * tokenAmount + userAmount2 * tokenAmount2
          ) || 0
        }`,
        title: "My Staked",
      },
      {
        imgSrc: "/images/svg/reward.svg",
        value: `${displayNonZeroDigits(userRemain + userRemain2) || 0}`,
        title: "My Rewards",
      },
    ],
    [
      stakeAmount,
      tokenAmount,
      stakeAmount2,
      tokenAmount2,
      userAmount,
      userAmount2,
      userRemain,
      userRemain2,
    ]
  );
  return (
    <div className={`flex flex-row ${className} gap-12`}>
      {arr.map((item) => {
        return (
          <div className="flex flex-row items-center" key={item}>
            <Image
              src={item.imgSrc}
              width={30}
              height={30}
              alt={item.imgSrc}
              className="mr-4"
            />
            <div className="flex flex-col">
              <div className="font-bold text-[#FFF] text-lg">
                {item.value} LMC
              </div>
              <div className="text-[rgba(226,217,240,0.60)]">{item.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StakeNum;
