import Loading from "@/components/Loading/Index";
import WriteButton from "@/components/WriteButton";

import { useEffect, useState } from "react";
import { contract } from "@/config";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import { erc20ABI } from "@wagmi/core";

const Node = (props) => {
  const [render, setRender] = useState(0);
  const { chain } = useNetwork();

  const { address } = useAccount();

  const nodeContract = contract[chain?.id]?.node;

  const { data: read0 } = useContractReads({
    contracts: [
      { ...nodeContract, functionName: "tokenAddress" },
      { ...nodeContract, functionName: "tokenPrice" },
      { ...nodeContract, functionName: "totalSell" },
    ],
    scopeKey: render,
  });
  const tokenAddress = read0?.[0]?.result;
  const tokenPrice = read0?.[1]?.result;
  const totalSell = read0?.[2]?.result;

  const tokenContract = {
    address: tokenAddress,
    abi: erc20ABI,
  };

  const { data: read1 } = useContractReads({
    contracts: [
      {
        ...tokenContract,
        functionName: "allowance",
        args: [address, nodeContract?.address],
      },
      {
        ...tokenContract,
        functionName: "balanceOf",
        args: [address],
      },
      { ...tokenContract, functionName: "decimals" },
    ],
    scopeKey: render,
  });

  const allowance = read1?.[0]?.result;
  const tokenBalance = read1?.[1]?.result;
  const decimals = read1?.[2]?.result;

  const [data, setData] = useState({});
  const [mount, setMount] = useState(false);

  const buy = {
    buttonName: "Buy",
    disabled: !data.amount || data.amount == 0,
    data: {
      ...nodeContract,
      functionName: "buy",
      args: [data?.amount],
    },
    callback: (confirmed) => {
      if (confirmed) {
        setRender(render + 1);
      }
    },
  };

  useEffect(() => {
    setMount(true);
  }, []);

  const approve = {
    buttonName: "Approve USDT",
    data: {
      ...tokenContract,
      functionName: "approve",
      args: [nodeContract?.address, 2 ** 255],
    },
    callback: (confirmed) => {
      if (confirmed) {
        setRender(render + 1);
      }
    },
  };

  const price =
    tokenPrice && (tokenPrice / 10n ** BigInt(decimals || 0))?.toString();

  const balance =
    tokenBalance && (tokenBalance / 10n ** BigInt(decimals || 0))?.toString();

  let showApprove;
  if (allowance < Number(data?.amount) * 10 ** Number(decimals)) {
    showApprove = true;
  } else {
    showApprove = false;
  }

  let totalCost = 0;
  let tempSell = Number(totalSell);
  let tempPrice = Number(price);

  for (let i = 0; i < Number(data?.amount); i++) {
    totalCost += tempPrice;
    tempSell += 1;
    if (tempSell % 50 == 0) {
      tempPrice = Math.ceil(tempPrice * 1.005);
    }
  }

  return mount ? (
    <>
      <div className="m-auto w-96 text-center mt-10">
        <div className="text-right">Price : {price || "--"} USDT</div>
        <input
          type="number"
          placeholder="0"
          className="input input-bordered w-full"
          onChange={(e) => {
            if (e.target.value > 30000) {
              e.target.value = 30000;
            }
            if (e.target.value < 0) {
              e.target.value = 0;
            }
            e.target.value = Math.floor(e.target.value);
            setData({ ...data, amount: e.target.value });
          }}
        />

        <div className="my-2">Total cost : {totalCost || "--"} USDT</div>
        {showApprove ? <WriteButton {...approve} /> : <WriteButton {...buy} />}
      </div>
      <div className="ml-4 font-black mt-10">Info</div>
      <div className="divider"></div>
      <div className="ml-4">
        <div>Current Node Progress : {totalSell?.toString() || "--"}</div>

        <div>Token Balance : {balance || "--"} USDT</div>
        <div>Current Score : {0 || "--"}</div>
        <div>Current Bought Node : {0 || "--"}</div>
        <div>Leader : {props?.leader || "--"}</div>
      </div>
      <div className="ml-4 font-black mt-10">Invites</div>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th>Current Bought Node</th>
              <th>Current Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-base-200">
              <th>#</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Quality Control Specialist</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Node;
