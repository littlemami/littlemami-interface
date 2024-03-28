import Image from "next/image";
import { useTotalStakeInfo } from "@/hooks/stake";
import { displayNonZeroDigits } from "@/utils";
import { useMemo } from "react";

const StakeNum = (props) => {
  const { className } = props;
  const { stakeAmount, tokenAmount, userAmount, userRemain } =
    useTotalStakeInfo(0);
  const {
    stakeAmount: stakeAmount2,
    tokenAmount: tokenAmount2,
    userAmount: userAmount2,
    userRemain: userRemain2,
  } = useTotalStakeInfo(0);
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
    []
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
