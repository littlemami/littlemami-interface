import Loading from "@/components/Loading/Index";
import WriteButton from "@/components/WriteButton";

import { useEffect, useState } from "react";
import { contract } from "@/config";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import { erc20ABI } from "@wagmi/core";
import { useRouter } from "next/router";
import InputNumber from "@/components/InputNumber";
import rpc from "@/components/Rpc";
import styles from "./index.module.scss";
import { Modal } from "antd";
import Goods from "@/public/images/svg/goods.svg";
import Time from "@/public/images/svg/time.svg";
import Link from "@/public/images/svg/link.svg";
import ArrowRight from "@/public/images/svg/arrow_right.svg";

const Node = (props) => {
  const router = useRouter();
  const [render, setRender] = useState(0);
  const [open, setOpen] = useState(false);
  const { chain } = useNetwork();

  const { address } = useAccount();

  const nodeContract = contract[chain?.id]?.node;

  const { data: read0 } = useContractReads({
    contracts: [
      { ...nodeContract, functionName: "tokenAddress" },
      { ...nodeContract, functionName: "tokenPrice" },
      { ...nodeContract, functionName: "totalSell" },
      { ...nodeContract, functionName: "phase" },
      { ...nodeContract, functionName: "preBuyers", args: [address] },
    ],
    scopeKey: render,
  });
  const tokenAddress = read0?.[0]?.result;
  const tokenPrice = read0?.[1]?.result;
  const totalSell = read0?.[2]?.result;
  const phase = read0?.[3]?.result;
  const preBuyers = read0?.[4]?.result;

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
  const onChange = (value) => {
    console.log("changed", value);
  };
  console.log(user);

  return mount ? (
    <>
      <div className={styles["node-box"]}>
        <h3 className={styles["title"]}>phase {phase?.toString()}</h3>
        <p className={styles["title-info"]}>Genesis Node</p>
        <div className={styles["node-main"]}>
          <div className={styles["node-main-con"]}>
            <div className={styles["node-intro"]}>
              <div className={styles["circle-bg"]}></div>
              <div className={styles["con"]}>
                <div className={styles["node-goods"]}>
                  <Goods className="mx-auto" />
                </div>

                <h2>Holo Head mural</h2>
                <p>
                  <strong>300</strong>
                  <span>USDT</span>
                </p>
              </div>
            </div>
            <div className={styles["node-numb"]}>
              <InputNumber
                min={0}
                max={2}
                defaultValue={0}
                onChange={onChange}
                precision={0}
              />
              <p>6000 USDT</p>
              <button className="lit-btn small">Buy node</button>
            </div>
          </div>
          <div className={styles["node-main-info"]}>
            <div className={styles["my-info"]}>
              <h4>My Info</h4>
              <ul>
                <li>
                  <p>Node Amount</p>
                  <span>0</span>
                </li>
                <li>
                  <p>Value</p>
                  <span>0</span>
                </li>
                <li>
                  <p>Code Value</p>
                  <span>400 U</span>
                </li>
              </ul>
              <div className={`price-btn ${styles["price"]}`}>
                <span>My Price</span>
                <p>
                  <span>2000U</span>
                  <ArrowRight />
                </p>
              </div>
            </div>
            <button className={`price-btn small ${styles["block-btn"]}`}>
              <Link />
              Copy Invite Lite
            </button>
            <button
              onClick={setOpen}
              className={`price-btn small ${styles["block-btn"]}`}
            >
              <Time />
              View Invite Node
            </button>
          </div>
        </div>
      </div>
      <div className="ml-4 font-black mt-10">
        Buy Node (phase {phase?.toString()})
      </div>
      <div className="divider"></div>
      <div className="ml-4">
        <div>Current Node Progress : {totalSell?.toString() || "--"}</div>
        <div>Current Node Price : {price || "--"} USDT</div>
        <div>Current Score Treasury : {user.scoreTreasury || "--"}</div>
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
              {phase == 1 && <WriteButton {...preBuy} />}
              {phase == 2 && <WriteButton {...buy} />}
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
        <div>Current Prize : {user?.tokenPrize || "--"} USDT</div>
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
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={824}
        wrapClassName="cur-modal-box"
        classNames={{ mask: "cur-modal-mask", body: "cur-modal-body" }}
      >
        <h4>Invite Record</h4>
        <ul>
          <li>Buy a node to get 100 scores.</li>
          <li>
            Invite a friend to buy a node for 100 points, and LMC bonus of 5% of
            the price of the node purchased by the invited friend.
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th width="80%" align="left">
                Address
              </th>
              <th width="20%" align="center">
                Node Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key={1}>
              <td>0xfEeE4A7F538E8ea47Ab3b8B319931F2d501D4124</td>
              <td align="center">asDSDASD</td>
            </tr>{" "}
            <tr key={1}>
              <td>sdSDasd</td>
              <td align="center">asDSDASD</td>
            </tr>{" "}
            <tr key={1}>
              <td>sdSDasd</td>
              <td align="center">asDSDASD</td>
            </tr>{" "}
            <tr key={1}>
              <td>sdSDasd</td>
              <td align="center">asDSDASD</td>
            </tr>{" "}
            <tr key={1}>
              <td>sdSDasd</td>
              <td align="center">asDSDASD</td>
            </tr>
            {invites?.map((invite, index) => {
              return (
                <tr key={index}>
                  <td>{invite?.address || "--"}</td>
                  <td align="center">{invite?.boughtNode || "--"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal>
    </>
  ) : (
    <Loading />
  );
};

export default Node;
