import WriteButton from "@/components/WriteButton";
import { useNetwork, useAccount, useContractReads } from "wagmi";
import { contract } from "@/config";
import LMCABI from "@/abi/LMCABI.json";
import { useEffect, useState } from "react";
import rpc from "@/components/Rpc";

async function x(address) {
  await rpc.getMarsScore("x", address);
}

async function telegram(address) {
  await rpc.getMarsScore("telegram", address);
}

async function dailyCheckIn(address) {
  await rpc.getMarsScore("dailyCheckIn", address);
}

async function uniswap(address) {
  await rpc.getMarsScore("uniswap", address);
}

const Mars = () => {
  const { chain } = useNetwork();

  const [mount, setMount] = useState(false);
  const [data, setData] = useState({});
  const { address } = useAccount();

  useEffect(() => {
    async function fetchData() {
      const user = await rpc.getUser(address);

      if (user) {
        setData({ ...data, user });
      } else {
        delete data.user;
        setData({ ...data });
      }
      setMount(true);
    }
    fetchData();
  }, [address]);
  const marsContract = contract[chain?.id]?.mars;

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
  console.log('reads0', reads0)
  const invites = data?.user?.invites;

  const marsReferrals = data?.user?.marsReferrals; //mars活动新邀请进来的人

  const searchInvites = invites?.map((item) => {
    return {
      ...marsContract,
      functionName: "getPendingPoint",
      args: [item?.address],
    };
  });

  const user = reads0?.[0]?.result;
  const lmc = reads0?.[1]?.result;
  const pendingPoint = reads0?.[2]?.result; //用户通过stake获得point总数
  const { data: reads1 } = useContractReads({
    contracts: [
      {
        address: lmc,
        abi: LMCABI,
        functionName: "allowance",
        args: [address, marsContract?.address],
      },
    ],
  });

  const backendUser = data?.user;

  const marsX = backendUser?.marsX; //是否点了推特

  const marsTelegram = backendUser?.marsTelegram; //是否点了telegram

  const dailyCheckedIn = backendUser?.dailyCheckedIn; //是否每日已签到

  const marsRank = backendUser?.marsRank; //  marsRank

  const marsScore = backendUser?.marsScore; //  marsScore

  const marsUniswap = backendUser?.marsUniswap; //  marsUniswap

  console.log(marsX, marsTelegram);

  const { data: reads2 } = useContractReads({ contracts: searchInvites });

  const allowance = reads1?.[0]?.result; //授权数量

  const userLast = user?.[1]; //最后区块

  const userStaked = user?.[0]; //已经质押数量

  const stakeAmount = 1; //质押数量
  const unStakeAmount = 1; //解除质押数量
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
      abi: LMCABI,
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

        <div className="mt-2">Referrals</div>
        <div>Invite Code {data?.user?.id}</div>
        {invites?.map((item, index) => {
          return (
            <div key={index}>
              <div>Address {item?.address}</div>
              <div>Point {reads2?.[index]?.result?.toString()}</div>
            </div>
          );
        })}
      </>
    )
  );
};

export default Mars;
