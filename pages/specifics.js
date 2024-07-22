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
  const nodeContract = contract[chain?.id]?.node;

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
      { ...nodeContract, functionName: "totalSell", args: [] },
    ],
  });

  const userLength = reads0?.[0]?.result;
  const lmc = reads0?.[1]?.result;
  const totalSell = reads0?.[2]?.result;
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

  let totalPoint = 0;

  for (let i = 0; i < userLength; i++) {
    totalPoint += reads2[i]?.result;
  }

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
  console.log(balance);
  return (
    <>
      <div className="text-center font-black text-5xl">
        <div className="border">
          <div>Mars</div>
          <div>Total Stake LMC :{balance?.toString()}</div>
          <div>Total Point :{totalPoint?.toString()}</div>
        </div>
        <div className="border mt-10">
          <div>Node</div>
          <div>
            Total Node Sell For LMC:
            {((totalSell || 0n) - 648n)?.toString()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mars;
