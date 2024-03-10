import WriteButton from "@/components/WriteButton";
import { contract } from "@/config";
import { useEffect, useState } from "react";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import USDTABI from "@/abi/USDTABI.json";
import NFTABI from "@/abi/NFTABI.json";

const StakePool = (props) => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const { chain } = useNetwork();

  const poolId = props?.poolId;

  const stakeTokenIds = [];

  const unStakeTokenIds = [];

  const passTokenId = 0;

  const stakeContract = contract[chain?.id]?.stake;

  const address = useAccount();

  const { data: reads0 } = useContractReads({
    contracts: [
      { ...stakeContract, functionName: "poolInfos", args: [poolId] },
      { ...stakeContract, functionName: "passAddress" },
    ],
  });

  const poolInfo = reads0?.[0]?.result;
  const passAddress = reads0?.[1]?.result;

  const nftAddress = poolInfo?.[0];
  const tokenAddress = poolInfo?.[1];
  const tokenAmount = poolInfo?.[2];
  const start = poolInfo?.[3];
  const rate = poolInfo?.[4];
  const rewardsTokenAddress = poolInfo?.[5];
  const stakeAmount = poolInfo?.[6];
  const passRequired = poolInfo?.[7];

  console.log(nftAddress,passAddress)

  const { data: reads1 } = useContractReads({
    contracts: [
      {
        address: nftAddress,
        abi: NFTABI,
        functionName: "tokensOfOwner",
        args: [address],
      },
      {
        address: passAddress,
        abi: NFTABI,
        functionName: "tokensOfOwner",
        args: [address],
      },
    ],
  });

  const holdTokenIds = reads1?.[0]?.result;
  const holdPassTokenIds = reads1?.[1]?.result;

  console.log(holdTokenIds, holdPassTokenIds);

  const stake = {
    buttonName: "Stake",
    data: {
      ...stakeContract,
      functionName: "stake",
      args: [poolId, stakeTokenIds, passTokenId],
    },
  };

  const unStake = {
    buttonName: "UnStake",
    data: {
      ...stakeContract,
      functionName: "unStake",
      args: [poolId, unStakeTokenIds, passTokenId],
    },
  };

  const approve = {
    buttonName: "Approve Token",
    data: {
      address: tokenAddress,
      abi: USDTABI,
      functionName: "approve",
      args: [stakeContract?.address, 2 * 255],
    },
  };

  return (
    mount && (
      <>
        <div>poolId {props.poolId}</div>
        <div>sakeAmount {stakeAmount?.toString()}</div>
        <div>tokenRequired {tokenAmount?.toString()}</div>
        <div>passRequired {passRequired?.toString()}</div>
        <div>start block number {start?.toString()}</div>
        <div>rate {rate?.toString()}</div>

        <div></div>
        <div>
          <WriteButton {...approve} />
          <WriteButton {...stake} className="my-1" />
          <WriteButton {...unStake} />
        </div>
      </>
    )
  );
};

export default StakePool;
