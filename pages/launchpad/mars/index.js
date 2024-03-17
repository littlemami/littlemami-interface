import WriteButton from "@/components/WriteButton";
import { useNetwork, useAccount, useContractReads } from "wagmi";
import { contract } from "@/config";
import USDTABI from "@/abi/USDTABI.json";
import { useEffect, useState } from "react";

const Mars = () => {
  const { chain } = useNetwork();

  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const marsContract = contract[chain?.id]?.mars;

  const { address } = useAccount();

  const { data: reads0, refetch } = useContractReads({
    contracts: [
      {
        ...marsContract,
        functionName: "users",
        args: [address],
      },
      {
        ...marsContract,
        functionName: "lmc",
      },
      {
        ...marsContract,
        functionName: "getPendingPoint",
        args: [address],
      },
    ],
  });

  const user = reads0?.[0]?.result;
  const lmc = reads0?.[1]?.result;
  const pendingPoint = reads0?.[2]?.result;

  console.log(pendingPoint);

  const { data: reads1 } = useContractReads({
    contracts: [
      {
        address: lmc,
        abi: USDTABI,
        functionName: "allowance",
        args: [address, marsContract?.address],
      },
    ],
  });

  const allowance = reads1?.[0]?.result;

  const userLast = user?.[1];

  const userStaked = user?.[0];

  console.log(user);

  const stakeAmount = 1;
  const unStakeAmount = 1;
  const stake = {
    buttonName: "Stake",
    data: {
      ...marsContract,
      functionName: "stake",
      args: [stakeAmount],
    },
    callback: (confirmed) => {
      if (confirmed) {
        refetch();
      }
    },
  };
  const unStake = {
    buttonName: "UnStake",
    data: {
      ...marsContract,
      functionName: "unstake",
      args: [unStakeAmount],
    },
    callback: (confirmed) => {
      if (confirmed) {
        refetch();
      }
    },
  };

  const approve = {
    buttonName: "Approve",
    data: {
      address: lmc,
      abi: USDTABI,
      functionName: "approve",
      args: [marsContract?.address, 2 ** 255],
    },
    callback: (confirmed) => {
      if (confirmed) {
        refetch();
      }
    },
  };

  let showApprove = false;

  if (allowance < stakeAmount * 1e18) {
    showApprove = true;
  }

  return (
    mount && (
      <>
        <div>User Info</div>
        <div>Point {pendingPoint?.toString()}</div>
        <div>LMC staked {userStaked?.toString()}</div>
        <div>Last {userLast?.toString()}</div>
        <div className="flex gap-2">
          {showApprove && <WriteButton {...approve} />}
          {!showApprove && <WriteButton {...stake} />}

          <WriteButton {...unStake} />
        </div>
      </>
    )
  );
};

export default Mars;
