import PoolCard from "@/components/Stake/PoolCard";
import StakeTitle from "@/components/Stake/StakeTitle";
import StakeNum from "@/components/Stake/StakeNum";
import PoolList from "@/components/Stake/PoolList";
import MyButton from "@/components/MyButton";
import { poolCardArr, poolListArr } from "../../config/constant";
import Supply from "@/components/Stake/Supply";
import UnStaked from "@/components/Stake/UnStaked";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import WriteButton from "@/components/WriteButton";
import { contract } from "@/config";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import StakePool from "@/components/StakePool";

import { useTotalStakeInfo } from "@/hooks/stake";
import styles from "./index.module.scss";

export const StakeContext = React.createContext(null);

const StakeTop = () => {
  return (
    <div className="flex flex-row justify-between mt-16">
      <StakeTitle
        title="Stake"
        extraNode={
          <div
            className={`${styles.titleInfo} relative text-[rgba(255,255,255,0.90)] font-Poppins text-[1rem] font-not-italic font-400 leading-normal tracking-0.48px before:block before:absolute before:w-full before:h-0.5 before:bg-[#BE35FF]`}
          >
            Boost your profits with LittleMami’s easy and innovative <br />{" "}
            staking, offering rewards and secure governance.
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
      <div className="flex flex-row justify-between gap-[9.375rem]">
        {poolCardArr.map((item) => {
          return <PoolCard onClick={onClick} {...item} key={item} />;
        })}
      </div>
    </div>
  );
};

const MyPosition = ({ refetchAll }) => {
  const { chain } = useNetwork();
  const stakeContract = contract[chain?.id]?.stake;

  const claimAll = {
    buttonName: "Claim All",
    data: {
      ...stakeContract,
      functionName: "claimAll",
      args: [[0, 1]],
    },
    callback: () => {
      refetchAll();
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
  const router = useRouter();

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
    userAmount,
    sharedTokenIds,
    userLast,
    stakeAmount,
    tokenAmount,
    rate,
    userRemain,
    usedPassTokenIds,
    refetchAll,
    balance,
    stakedSharedTokenIds,
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
    userAmount: userAmount1,
    sharedTokenIds: sharedTokenIds1,
    userLast: userLast1,
    stakeAmount: stakeAmount1,
    tokenAmount: tokenAmount1,
    rate: rate1,
    userRemain: userRemain1,
    usedPassTokenIds: usedPassTokenIds1,
    refetchAll: refetchAll1,
    balance: balance1,
    stakedSharedTokenIds: stakedSharedTokenIds1,
  } = useTotalStakeInfo(1);

  const [isClient, setIsClient] = useState(false);
  const [showShakeSuccess, setShowShakeSuccess] = useState(false);

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
  const showSuc = () => {
    setShowShakeSuccess(true);
    setTimeout(() => {
      setShowShakeSuccess(false);
    }, 3000);
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (router.pathname === "/stake") {
      setShowSupply(false);
    }
  }, [router]);
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
          userAmount,
          sharedTokenIds,
          userLast,
          stakeAmount,
          tokenAmount,
          rate,
          userRemain,
          usedPassTokenIds,
          showSuc,
          refetchAll,
          balance,
          stakedSharedTokenIds,
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
          userAmount: userAmount1,
          sharedTokenIds: sharedTokenIds1,
          userLast: userLast1,
          stakeAmount: stakeAmount1,
          tokenAmount: tokenAmount1,
          rate: rate1,
          userRemain: userRemain1,
          usedPassTokenIds: usedPassTokenIds1,
          showSuc,
          refetchAll: refetchAll1,
          balance: balance1,
          stakedSharedTokenIds: stakedSharedTokenIds1,
        },
      ]}
    >
      {isClient ? (
        <div className={styles.shakeBox}>
          {showShakeSuccess ? (
            <div className={styles.shakeSuccess}>
              <img
                className={styles.img1}
                src="/images/svg/sucess.svg"
                alt=""
              />
              <div>
                Successful.
                {/* <p>View On explorer.</p>{" "} */}
              </div>
              {/* <img
                className={styles.img2}
                src="/images/svg/arrow_top_right.svg"
                alt=""
              /> */}
            </div>
          ) : null}

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
              <MyPosition
                refetchAll={() => {
                  refetchAll();
                  refetchAll1();
                }}
              />
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
