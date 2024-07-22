import { useNetwork, useAccount, useContractReads } from "wagmi";
import { useEffect, useState } from "react";
import { contract } from "@/config";
import LMCABI from "@/abi/LMCABI.json";
import rpc from "@/components/Rpc";

const Mars = () => {
  const { chain } = useNetwork();

  const [mount, setMount] = useState(false);
  const [data, setData] = useState({});
  const { address } = useAccount();

  const marsContract = contract[chain?.id]?.mars;
  const nodeContract = contract[chain?.id]?.node;

  useEffect(() => {
    async function fetchData() {
      const res = await rpc.getSpecifics();

      setData({ ...data, totalPoint: res?.totalScore });
      setMount(true);
    }

    fetchData();
  }, []);

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
      args: [reads1?.[i]?.value],
    });
  }

  console.log(searchPoint);

  const { data: reads2 } = useContractReads({
    contracts: searchPoint,
  });

  console.log(reads2);

  let totalPoint = 0;

  for (let i = 0; i < userLength; i++) {
    totalPoint += reads2?.[i]?.result;
  }

  const { data: reads4 } = useContractReads({
    contracts: [
      {
        address: lmc,
        abi: LMCABI,
        functionName: "balanceOf",
        args: [marsContract?.address],
      },
      {
        address: lmc,
        abi: LMCABI,
        functionName: "balanceOf",
        args: [nodeContract?.address],
      },
    ],
  });

  const marsBalance = reads4?.[0]?.result;
  const nodeBalance = reads4?.[1]?.result;

  return (
    mount && (
      <>
        <div className="text-center font-black text-5xl">
          <div className="border">
            <div>Mars</div>
            <div>launch 参与质押地址数 : {userLength?.toString() || 0}</div>
            <div>launch做任务地址数 :{}</div>

            <div>
              总质押lmc参与launch数据 :
              {((marsBalance || 0n) / BigInt(1e18))?.toString()} LMC
            </div>
            <div>
              launch产生总积分（包含任务积分和质押lmc积分） :
              {(
                (totalPoint || 0n) + BigInt(data?.totalPoint || 0n)
              )?.toString()}
            </div>
          </div>
          <div className="border mt-10">
            <div>Node</div>
            <div>
              lmc购买数量:
              {((nodeBalance || 0n) / BigInt(1e18))?.toString()} LMC
            </div>
            <div>
              lmc购买节点总数统计:
              {((totalSell || 0n) - 648n)?.toString()}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Mars;
