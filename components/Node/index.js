import Loading from "@/components/Loading/Index";
import WriteButton from "@/components/WriteButton";

import { useEffect, useState } from "react";
import { contract } from "@/config";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import { erc20ABI } from "@wagmi/core";
import { useRouter } from "next/router";
import rpc from "@/components/Rpc";

const Node = (props) => {
  const router = useRouter();
  const [render, setRender] = useState(0);
  const { chain } = useNetwork();

  const { address } = useAccount();

  const nodeContract = contract[chain?.id]?.node;

  const { data: read0 } = useContractReads({
    contracts: [
      { ...nodeContract, functionName: "tokenAddress" },
      { ...nodeContract, functionName: "tokenPrice" },
      { ...nodeContract, functionName: "totalSell" },
      { ...nodeContract, functionName: "open" },
      { ...nodeContract, functionName: "preOpen" },
      { ...nodeContract, functionName: "preBuyers", args: [address] },
    ],
    scopeKey: render,
  });
  const tokenAddress = read0?.[0]?.result;
  const tokenPrice = read0?.[1]?.result;
  const totalSell = read0?.[2]?.result;
  const open = read0?.[3]?.result;
  const preOpen = read0?.[4]?.result;
  const preBuyers = read0?.[5]?.result;

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
  const user = data.user;

  const buy = {
    buttonName: "Buy Node",
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

  const phase1 = user?.phase1;

  const preBuy = {
    buttonName: "Pre Buy Node",
    disabled:
      !data.amount ||
      data.amount == 0 ||
      data.amount > phase1?.max - Number(preBuyers),
    data: {
      ...nodeContract,
      functionName: "preBuy",
      args: [phase1?.signature, phase1?.max, data?.amount],
    },
    callback: (confirmed) => {
      if (confirmed) {
        setRender(render + 1);
      }
    },
  };

  useEffect(() => {
    async function fetchData() {
      const user = await rpc.getUser(address);
      setData({ ...data, user });
      setMount(true);
    }
    fetchData();
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

  const invites = props?.invites;

  console.log(user);

  return mount ? (
    <>
      <div className="ml-4 font-black mt-10">Buy Node (phase1)</div>
      <div className="divider"></div>
      <div className="ml-4">
        <div>Current Node Progress : {totalSell?.toString() || "--"}</div>
        <div>Current Node Price : {price || "--"} USDT</div>
        <div className="m-auto w-96 text-center flex gap-4">
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

          {showApprove ? (
            <WriteButton {...approve} />
          ) : (
            <>
              {preOpen && <WriteButton {...preBuy} />}
              {/* {open && <WriteButton {...buy} />} */}
            </>
          )}
        </div>
        <div className="my-2 text-center">
          Total cost : {totalCost || "--"} USDT
        </div>
      </div>
      <div className="ml-4 font-black mt-10">My Info</div>
      <div className="divider"></div>
      <div className="ml-4">
        <div>Pre Max : {phase1?.max || "--"}</div>
        <div>Pre Bought : {preBuyers?.toString() || "--"}</div>
        <div>Token Balance : {balance || "--"} USDT</div>
        <div>Current Code : {user?.code || "--"}</div>
        <div>Current Score : {user?.score || "--"}</div>
        <div>Current Bought Node : {user?.boughtNode || "--"}</div>
        <div>Leader : {props?.leader || "--"}</div>
      </div>
      <div className="ml-4 font-black mt-10">My Invites</div>

      {user.inviteOpen ? (
        <div className="ml-4 flex gap-4">
          Invite Link : {window.location.href}
          {user?.id}
          <div
            className="btn btn-success btn-xs"
            onClick={(e) => {
              navigator.clipboard.writeText(window.location.href + user?.id);
              setData({ ...data, copy: true });
            }}
          >
            {data.copy ? "Copied" : "Copy"}
          </div>
        </div>
      ) : (
        <div className="ml-4">Not Invite Open</div>
      )}

      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th>Current Bought Node</th>
            </tr>
          </thead>
          <tbody>
            {invites?.map((invite, index) => {
              return (
                <tr className="bg-base-200" key={index}>
                  <th>#</th>
                  <td>{invite?.address || "--"}</td>
                  <td>{invite?.boughtNode || "--"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Node;
