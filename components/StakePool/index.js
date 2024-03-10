import WriteButton from "@/components/WriteButton";
import { contract } from "@/config";
import { useEffect, useState } from "react";
import { useNetwork, useContractReads, useAccount, useConnectors } from "wagmi";
import USDTABI from "@/abi/USDTABI.json";
import NFTABI from "@/abi/NFTABI.json";

const StakePool = (props) => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const { chain } = useNetwork();

  const poolId = props?.poolId;

  const stakeTokenIds = [0];

  const unStakeTokenIds = [0];

  const passTokenId = 1;

  const stakeContract = contract[chain?.id]?.stake;

  const { address } = useAccount();

  const { data: reads0 } = useContractReads({
    contracts: [
      { ...stakeContract, functionName: "poolInfos", args: [poolId] },
      { ...stakeContract, functionName: "passAddress" },
      { ...stakeContract, functionName: "poolUsers", args: [poolId, address] },
      {
        ...stakeContract,
        functionName: "getPendingRemain",
        args: [poolId, address],
      },
      { ...stakeContract, functionName: "getSharedTokenIds", args: [poolId] },
    ],
  });

  const poolInfo = reads0?.[0]?.result;
  const passAddress = reads0?.[1]?.result;
  const userInfo = reads0?.[2]?.result;
  const pendingRemain = reads0?.[3]?.result;
  const sharedTokenIds = reads0?.[4]?.result;

  const nftAddress = poolInfo?.[0];
  const tokenAddress = poolInfo?.[1];
  const tokenAmount = poolInfo?.[2];
  const start = poolInfo?.[3];
  const rate = poolInfo?.[4];
  const rewardsTokenAddress = poolInfo?.[5];
  const stakeAmount = poolInfo?.[6];
  const passRequired = poolInfo?.[7];

  console.log(poolInfo);

  console.log(sharedTokenIds);

  const userLast = userInfo?.[0];
  const userAmount = userInfo?.[1];
  const userRemain = userInfo?.[2];
  const userPassTokenId = userInfo?.[3];

  const { data: reads1, refetch } = useContractReads({
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
      {
        address: nftAddress,
        abi: NFTABI,
        functionName: "totalSupply",
      },
      {
        address: passAddress,
        abi: NFTABI,
        functionName: "totalSupply",
      },
      {
        address: tokenAddress,
        abi: USDTABI,
        functionName: "allowance",
        args: [address, stakeContract?.address],
      },
    ],
  });

  const holdTokenIds = reads1?.[0]?.result;
  const holdPassTokenIds = reads1?.[1]?.result;
  const nftTotalSupply = reads1?.[2]?.result;
  const passTotalSupply = reads1?.[3]?.result;
  const allowance = reads1?.[4]?.result;

  const searchNFT = [];

  for (let i = 0; i <= nftTotalSupply; i++) {
    searchNFT.push({
      ...stakeContract,
      functionName: "tokenUsed",
      args: [poolId, i],
    });
  }

  const { data: reads2 } = useContractReads({
    contracts: searchNFT,
  });

  const usedTokenIds = [];

  let usedPassTokenId;

  reads2?.forEach((item, index) => {
    if (item?.result == address) {
      usedTokenIds.push(index);
    }
  });

  const searchPass = [];
  for (let i = 0; i <= passTotalSupply; i++) {
    searchPass.push({
      ...stakeContract,
      functionName: "passUsed",
      args: [poolId, i],
    });
  }
  const { data: reads3 } = useContractReads({
    contracts: searchPass,
  });

  reads3?.forEach((item, index) => {
    if (item?.result == address) {
      usedPassTokenId = index;
      return;
    }
  });

  const stake = {
    buttonName: "Stake",
    data: {
      ...stakeContract,
      functionName: "stake",
      args: [poolId, stakeTokenIds, passTokenId],
    },
    callback: () => {
      refetch();
    },
  };

  const unStake = {
    buttonName: "UnStake",
    data: {
      ...stakeContract,
      functionName: "unStake",
      args: [poolId, unStakeTokenIds, passTokenId],
    },
    callback: () => {
      refetch();
    },
  };

  const approve = {
    buttonName: "Approve Token",
    data: {
      address: tokenAddress,
      abi: USDTABI,
      functionName: "approve",
      args: [stakeContract?.address, 2 ** 255],
    },
    callback: () => {
      refetch();
    },
  };

  const claim = {
    buttonName: "Claim",
    data: {
      ...stakeContract,
      functionName: "claim",
      args: [poolId],
    },
    callback: () => {
      refetch();
    },
  };

  let showApprove = false;

  if (allowance < 2 ** 254) {
    showApprove = true;
  }

  return (
    mount && (
      <div className="my-4">
        <div>poolId {props.poolId}</div>
        <div>sakeAmount {stakeAmount?.toString()} NFT</div>
        <div>tokenRequired {tokenAmount?.toString() / 1e18} LMC</div>
        <div>passRequired {passRequired?.toString()}</div>
        <div>start block number {start?.toString()}</div>
        <div>rate {rate?.toString() / 1e18} LMC</div>
        <div>
          sharedTokenIds{" "}
          {sharedTokenIds?.map((item, index) => {
            return <div key={index}>{item.toString()}</div>;
          })}
        </div>

        <div className="mt-4">UserInfo</div>
        <div>userLast {userLast?.toString()}</div>
        <div>userAmount {userAmount?.toString()} NFT</div>
        <div>
          userRemain {(userRemain + pendingRemain)?.toString() / 1e18} LMC
        </div>
        <div>userPassTokenId {userPassTokenId?.toString()}</div>
        <div>
          staked nft tokenIds{" "}
          {usedTokenIds?.map((item, index) => {
            return <div key={index}>{item.toString()}</div>;
          })}
        </div>
        <div>staked pass tokenId {usedPassTokenId?.toString()}</div>
        <div className="flex gap-2">
          hold nft tokenIds{" "}
          {holdTokenIds?.map((item, index) => {
            return <div key={index}>{item.toString()}</div>;
          })}
        </div>
        <div className="flex gap-2">
          hold pass tokenIds{" "}
          {holdPassTokenIds?.map((item, index) => {
            return <div key={index}>{item.toString()}</div>;
          })}
        </div>
        <div className="flex gap-2">
          {showApprove && <WriteButton {...approve} />}

          {!showApprove && <WriteButton {...stake} />}

          <WriteButton {...unStake} />
          <WriteButton {...claim} />
        </div>
      </div>
    )
  );
};

export default StakePool;
