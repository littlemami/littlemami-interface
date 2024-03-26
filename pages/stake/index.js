import PoolCard from "@/components/Stake/PoolCard";
import StakeTitle from "@/components/Stake/StakeTitle";
import StakeNum from "@/components/Stake/StakeNum";
import PoolList from "@/components/Stake/PoolList";
import MyButton from "@/components/MyButton";
import { poolCardArr, poolListArr } from "./constant";
import Supply from "./components/Supply";
import UnStaked from "./components/UnStaked";
import { useState, useEffect } from "react";

import WriteButton from "@/components/WriteButton";
import { contract } from "@/config";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import StakePool from "@/components/StakePool";

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
  const [open, setOpen] = useState(false);
  return (
    <>
      {" "}
      <div className="flex flex-col my-16">
        <StakeTitle
          className="mb-4"
          title="My Position"
          tagNode={
            <div className="ml-6">
              <MyButton color="#6944ff" text="Chaim All" />
            </div>
          }
        />
        <PoolList unStake={(val) => setOpen(true)} list={poolListArr} />
      </div>
      <UnStaked open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
const Stake = () => {
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
  return (
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
          {pools.map((pool, index) => {
            return <StakePool key={pool.poolId} {...pool} />;
          })}
        </>
      )}
    </div>
  );
};

export default Stake;
