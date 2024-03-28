"use client";
import { useEffect, useState } from "react";
import { useNetwork, useContractReads, useAccount, useConnectors } from "wagmi";
import WriteButton from "@/components/WriteButton";
import { contract } from "@/config";
import USDTABI from "@/abi/USDTABI.json";
import NFTABI from "@/abi/NFTABI.json";

export const useTotalStakeInfo = (poolId) => {
  const { chain } = useNetwork();

  const stakeTokenIds = [0]; //stake时使用

  const unStakeTokenIds = [0]; //unstake时使用

  const passTokenId = 1; //stake时 使用

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
  const sharedTokenIds = reads0?.[4]?.result; //池子与不同池子共享nft质押， 比如设置为1,当前池子质押了tokenId 0 ，poolId为1 的池子就质押不了tokenId 0

  const nftAddress = poolInfo?.[0];
  const tokenAddress = poolInfo?.[1];
  const tokenAmount = poolInfo?.[2]; //池子质押一个nft需要多少币

  const start = poolInfo?.[3]; //池子开始挖矿时间

  const rate = poolInfo?.[4]; //池子每区块挖矿多少币
  const rewardsTokenAddress = poolInfo?.[5];
  const stakeAmount = poolInfo?.[6]; //池子总质押nft数量

  const passRequired = poolInfo?.[7]; //池子是否需要pass

  const userLast = userInfo?.[0]; //用户最后一次交互合约的区块号

  const userAmount = userInfo?.[1]; //用户在当前池子质押的nft数量
  const userRemain = userInfo?.[2]; //用户待领取奖励

  const userPassTokenId = userInfo?.[3]; // 用户已经在当前池子使用的pass,为0 则没有使用

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
  console.log("holdTokenIds", { holdTokenIds, holdPassTokenIds, passRequired });
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

  const sharedPoolId = sharedTokenIds?.[0];
  if (sharedPoolId) {
    for (let i = 0; i <= nftTotalSupply; i++) {
      searchNFT.push({
        ...stakeContract,
        functionName: "tokenUsed",
        args: [sharedPoolId, i],
      });
    }
  }

  const { data: reads2 } = useContractReads({
    contracts: searchNFT,
  });

  const stakedTokenIds = []; //用户在当前池子质押的tokenIds

  let usedPassTokenId;

  reads2?.forEach((item, index) => {
    if (item?.result == address) {
      stakedTokenIds.push(index);
    }
  });

  const stake = ({ stakeTokenIds, passTokenId, callback }) => ({
    buttonName: "Stake",
    data: {
      ...stakeContract,
      functionName: "stake",
      args: [poolId, stakeTokenIds, passTokenId],
    },
    callback: () => {
      refetch();
      callback?.();
    },
  });

  const unStake = ({ unStakeTokenIds, passTokenId, callback }) => ({
    buttonName: "UnStake",
    data: {
      ...stakeContract,
      functionName: "unStake",
      args: [poolId, unStakeTokenIds, passTokenId],
    },
    callback: () => {
      refetch();
      callback?.();
    },
  });

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
  return {
    holdTokenIds,
    holdPassTokenIds,
    allowance,
    stakedTokenIds,
    passRequired: passRequired?.toString(),
    start: start?.toString(),
    unStake,
    approve,
    stake,
    claim,
    showApprove,
    userPassTokenId: userPassTokenId?.toString(),
    userAmount: userAmount?.toString(),
    sharedTokenIds,
    userLast: userLast?.toString(),
    stakeAmount: stakeAmount?.toString(),
    tokenAmount: tokenAmount?.toString() / 1e18,
    rate: rate?.toString() / 1e18,
    userRemain: (userRemain + pendingRemain)?.toString() / 1e18,
    usedPassTokenId,
  };
};