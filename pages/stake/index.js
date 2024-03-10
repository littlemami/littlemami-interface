import WriteButton from "@/components/WriteButton";
import { contract } from "@/config";
import { useEffect, useState } from "react";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import StakePool from "@/components/StakePool";
const Stake = () => {
  const pools = [
    {
      poolId: 0,
    },
    {
      poolId: 1,
    },
  ];
  return (
    <>
      {pools.map((pool, index) => {
        return <StakePool key={pool.poolId} {...pool} />;
      })}
    </>
  );
};

export default Stake;
