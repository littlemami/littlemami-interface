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
import { Modal, message, Popconfirm } from "antd";
import Goods from "@/public/images/svg/goods.svg";
import Time from "@/public/images/svg/time.svg";
import Link from "@/public/images/svg/link.svg";
import ArrowRight from "@/public/images/svg/arrow_right.svg";
import Chat from "@/public/images/svg/chat.svg";
import Twitter from "@/public/images/svg/twitter.svg";
import Vector from "@/public/images/svg/vector.svg";

const Node = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [render, setRender] = useState(0);
  const [open, setOpen] = useState(false);
  const [sucOpen, setSsucOpen] = useState(false);

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
  const [nowNumb, setNowNumb] = useState(0);

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
        setSsucOpen(true);
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
        setSsucOpen(true);
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
      {contextHolder}
      <div className={styles["node-box"]}>
        <h3 className={styles["title"]}>phase {phase?.toString()}</h3>
        <p className={styles["title-info"]}>
          {["Genesis", "Vanguard", "Vibrant"][`${BigInt(phase) - BigInt(1)}`]}{" "}
          Node
        </p>
        <div className={styles["node-main"]}>
          <div className={styles["node-main-con"]}>
            <div className={styles["node-intro"]}>
              <div className={styles["circle-bg"]}></div>
              <div className={styles["con"]}>
                <div className={styles["node-goods"]}>
                  <img src="/images/goods.png" alt="" />
                </div>

                <h2>Littlemami Node</h2>
                <p>
                  <strong>{price || "--"}</strong>
                  <span>USDT</span>
                </p>
              </div>
            </div>
            <div className={styles["node-numb"]}>
              <InputNumber
                min={0}
                max={BigInt(phase1?.max) - BigInt(preBuyers) || 0}
                value={nowNumb}
                onChange={(value) => {
                  if (value > 30000) {
                    setNowNumb(30000);
                  }
                  if (value < 0) {
                    setNowNumb(0);
                  }
                  setNowNumb(value);
                  setData({ ...data, amount: value });
                }}
                precision={0}
              />

              <p>{totalCost > 0 && `${totalCost} USDT`}</p>
              <div className={styles["btns-box"]}>
                {showApprove ? (
                  <WriteButton {...approve} />
                ) : (
                  <>
                    {phase == 1 && <WriteButton {...preBuy} />}
                    {phase == 2 && <WriteButton {...buy} />}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles["node-main-info"]}>
            <div className={styles["my-info"]}>
              <h4>My Info</h4>
              <ul>
                <li>
                  <p>Node Amount</p>
                  <span>{user?.boughtNode || "--"}</span>
                </li>
                <li>
                  <p>Code Value</p>
                  <span>{user?.code || "--"}</span>
                </li>
                {phase != 1 && (
                  <li>
                    <p>Score Treasure</p>
                    <span>{user.scoreTreasury || "--"} U</span>
                  </li>
                )}
                {phase == 3 && (
                  <li>
                    <p>Stake</p>
                    <span>
                      233LMC
                      <div className={styles["stake-pop-box"]}>
                        <div className={styles["stake-pop"]}>
                          <div className={styles["pop-arrow"]}></div>
                          <p>Holding node gets LMC airdrop</p>
                          <div>
                            <strong>Staking</strong>
                            <span>0.12LMC/Block</span>
                          </div>
                          <div>
                            <strong>Leadership Rewards</strong>
                            <span>122 LMC</span>
                          </div>
                        </div>
                        <Chat />
                      </div>
                    </span>
                  </li>
                )}
              </ul>
              {phase != 1 && (
                <div className={`price-btn ${styles["price"]}`}>
                  <span>Claim Prize</span>
                  <p>
                    <span>{user?.tokenPrize || "--"}U</span>
                    <ArrowRight />
                  </p>
                </div>
              )}
            </div>
            {phase != 1 && (
              <>
                {!user.inviteOpen ? (
                  <button
                    className={`price-btn small ${styles["block-btn"]}`}
                    onClick={(e) => {
                      navigator.clipboard.writeText(
                        window.location.href + user?.id
                      );
                      messageApi.open({
                        type: "success",
                        content: "Copied",
                      });
                      setData({ ...data, copy: true });
                    }}
                  >
                    <Link />
                    Copy Invite Lite
                  </button>
                ) : null}

                <button
                  onClick={setOpen}
                  className={`price-btn small ${styles["block-btn"]}`}
                >
                  <Time />
                  View Invite Node
                </button>
              </>
            )}
          </div>
        </div>
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
          <li>
            Holding nodes qualifies for LMC airdrops at a rate of
            <strong>69.5 LMC</strong> per block.
          </li>
          <li>
            Total supply of <strong>one hundred million.</strong>
          </li>
          <li>
            For every node that the referral friends enjoy a <strong>5%</strong>
            share of their airdrop earnings. Upon successfully inviting three
            node friends, activate indirect Airdrop Boost earnings, which can be
            further stacked with an additional 5% from each indirect node
            friend.
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th align="left">Address</th>
              <th width="150" align="center">
                Node Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invites?.map((invite, index) => {
              return (
                <tr key={index}>
                  <td>{invite?.address || "--"}</td>
                  <td width="150" align="center">
                    {invite?.boughtNode || "--"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {invites.length == 0 && <p className="no-data">No data</p>}
      </Modal>
      <Modal
        centered
        open={sucOpen}
        onOk={() => setSsucOpen(false)}
        onCancel={() => setSsucOpen(false)}
        footer={null}
        width={550}
        wrapClassName="cur-modal-box"
        classNames={{
          mask: "cur-modal-mask",
          body: "cur-modal-body suc-modal-body",
        }}
      >
        <div className="suc">
          <Vector />
          <div>
            <strong> Purchase successful!</strong>
            <p>You now have 2 nodes in total.</p>
          </div>
        </div>
        <button
          className={`price-btn small`}
          onClick={(e) => {
            const text = encodeURIComponent("Hello World!");
            const tweetUrl = `https://twitter.com/Littlemamilabs?text=${text}`; // https://twitter.com/intent/tweet

            window.open(tweetUrl, "_blank");
          }}
        >
          <Twitter />
          Share it!
        </button>
      </Modal>
    </>
  ) : (
    <Loading />
  );
};

export default Node;
