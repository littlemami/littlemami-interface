import PoolCard from "@/components/Stake/PoolCard";
import StakeTitle from "@/components/Stake/StakeTitle";
import StakeNum from "@/components/Stake/StakeNum";
import PoolList from "@/components/Stake/PoolList";
import MyButton from "@/components/MyButton";
import { poolCardArr, poolListArr } from "../../config/constant";
import Supply from "./components/Supply";
import UnStaked from "./components/UnStaked";
import React, { useState, useEffect } from "react";

import WriteButton from "@/components/WriteButton";
import { contract } from "@/config";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import StakePool from "@/components/StakePool";

import { useTotalStakeInfo } from "@/hooks/stake";

export const StakeContext = React.createContext(null);

const StakeTop = () => {
  return (
    <div className="flex flex-row justify-between mt-16">
      <StakeTitle
        title="Stake"
        extraNode={
          <div className="text-[rgba(255,255,255,0.90)] font-Poppins text-[1rem] font-not-italic font-400 leading-normal tracking-0.48px">
            LMC with Tool NFT stake to Get the Highest Yield LMC
          </div>
        }
      />
      <StakeNum className="mt-4" />
    </div>
  );
};

const Pools = ({ onClick }) => {
  return (
    <div className="mt-16">
      <StakeTitle title="Pools" className="mb-4" />
      <div className="flex flex-row justify-between gap-[7rem]">
        {poolCardArr.map((item) => {
          return <PoolCard onClick={onClick} {...item} key={item} />;
        })}
      </div>
    </div>
  );
};

const MyPosition = () => {
  const { chain } = useNetwork();
  const stakeContract = contract[chain?.id]?.stake;

  const claimAll = {
    buttonName: "Claim All",
    data: {
      ...stakeContract,
      functionName: "claimAll",
      args: [[0, 1]],
    },
  };

  return (
    <>
      <div className="flex flex-col my-16">
        <StakeTitle
          className="mb-4"
          title="My Position"
          tagNode={
            <div className="ml-6">
              <WriteButton color="#6944ff" {...claimAll} />
            </div>
          }
        />
        <PoolList list={poolListArr} />
      </div>
    </>
  );
};
const Stake = () => {
  const {
    holdTokenIds,
    holdPassTokenIds,
    allowance,
    stakedTokenIds,
    passRequired,
    start,
    unStake,
    approve,
    stake,
    claim,
    showApprove,
    userPassTokenId,
    userAmount,
    sharedTokenIds,
    userLast,
    stakeAmount,
    tokenAmount,
    rate,
    userRemain,
    usedPassTokenId,
  } = useTotalStakeInfo(0);

  const {
    holdTokenIds: holdTokenIds1,
    holdPassTokenIds: holdPassTokenIds1,
    allowance: allowance1,
    stakedTokenIds: stakedTokenIds1,
    passRequired: passRequired1,
    start: start1,
    unStake: unStake1,
    approve: approve1,
    stake: stake1,
    claim: claim1,
    showApprove: showApprove1,
    userPassTokenId: userPassTokenId1,
    userAmount: userAmount1,
    sharedTokenIds: sharedTokenIds1,
    userLast: userLast1,
    stakeAmount: stakeAmount1,
    tokenAmount: tokenAmount1,
    rate: rate1,
    userRemain: userRemain1,
    usedPassTokenId: usedPassTokenId1,
  } = useTotalStakeInfo(1);

  const [isClient, setIsClient] = useState(false);

  const [showSupply, setShowSupply] = useState(false);
  const [pool, setPool] = useState(1);
  const pools = [
    {
      poolId: 0,
    },
    {
      poolId: 1,
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <StakeContext.Provider
      value={[
        {
          holdTokenIds,
          holdPassTokenIds,
          allowance,
          stakedTokenIds,
          passRequired,
          start,
          unStake,
          approve,
          stake,
          claim,
          showApprove,
          userPassTokenId,
          userAmount,
          sharedTokenIds,
          userLast,
          stakeAmount,
          tokenAmount,
          rate,
          userRemain,
          usedPassTokenId,
        },
        {
          holdTokenIds: holdTokenIds1,
          holdPassTokenIds: holdPassTokenIds1,
          allowance: allowance1,
          stakedTokenIds: stakedTokenIds1,
          passRequired: passRequired1,
          start: start1,
          unStake: unStake1,
          approve: approve1,
          stake: stake1,
          claim: claim1,
          showApprove: showApprove1,
          userPassTokenId: userPassTokenId1,
          userAmount: userAmount1,
          sharedTokenIds: sharedTokenIds1,
          userLast: userLast1,
          stakeAmount: stakeAmount1,
          tokenAmount: tokenAmount1,
          rate: rate1,
          userRemain: userRemain1,
          usedPassTokenId: usedPassTokenId1,
        },
      ]}
    >
      {isClient ? (
        <div>
          {showSupply ? (
            <Supply
              showSupply={showSupply}
              handleBack={() => setShowSupply(false)}
              pool={pool}
            />
          ) : (
            <>
              <StakeTop />
              <Pools
                onClick={(val) => {
                  setShowSupply(true);
                  setPool(val);
                }}
              />
              <MyPosition />
              {/* {pools.map((pool, index) => {
                return <StakePool key={pool.poolId} {...pool} />;
              })} */}
            </>
          )}
        </div>
      ) : null}
    </StakeContext.Provider>
  );
};

export default Stake;
