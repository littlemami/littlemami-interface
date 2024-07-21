import { useNetwork, useAccount, useContractReads } from "wagmi";
import { useEffect, useState } from "react";
import { contract } from "@/config";
import LMCABI from "@/abi/LMCABI.json";
const Mars = () => {
  const { chain } = useNetwork();

  const [mount, setMount] = useState(false);
  const [data, setData] = useState({});
  const { address } = useAccount();

  const marsContract = contract[chain?.id]?.mars;

  const { data: reads0, refetch } = useContractReads({
    contracts: [
      {
        ...marsContract,
        functionName: "getUserAddressesLength",
        args: [],
      },
      {
        ...marsContract,
        functionName: "lmc",
        args: [],
      },
    ],
  });

  const userLength = reads0?.[0]?.result;
  const lmc = reads0?.[1]?.result;
  console.log(userLength);

  const searchUsers = [];

  for (let i = 0; i < userLength; i++) {
    searchUsers.push({
      ...marsContract,
      functionName: "getUserAddress",
      args: [i],
    });
  }

  const { data: reads1 } = useContractReads({
    contracts: searchUsers,
  });

  const searchPoint = [];

  for (let i = 0; i < userLength; i++) {
    searchPoint.push({
      ...marsContract,
      functionName: "getPendingPoint",
      args: [reads1[i]?.value],
    });
  }

  console.log(searchPoint);

  const { data: reads2 } = useContractReads({
    contracts: searchPoint,
  });

  console.log(reads2);
  

  const { data: reads4 } = useContractReads({
    contracts: [
      {
        address: lmc,
        abi: LMCABI,
        functionName: "balanceOf",
        args: [marsContract?.address],
      },
    ],
  });

  const balance = reads4?.[0]?.result;

  return (
    <>
      <div className="text-center font-black text-5xl">
        <div>totalStakeLMC :{balance?.toString()}</div>
        <div></div>
      </div>
    </>
  );
};

export default Mars;
