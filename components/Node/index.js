import Loading from "@/components/Loading/Index";
import WriteButton from "@/components/WriteButton";

import { useEffect, useState } from "react";
import { contract } from "@/config";
import { useNetwork, useContractReads, useAccount } from "wagmi";
import { erc20ABI } from "@wagmi/core";
import { useRouter } from "next/router";
import InputNumber from "@/components/InputNumber";
import ProgressLine from "@/components/ProgressLine";

import rpc from "@/components/Rpc";
import styles from "./index.module.scss";
import { Modal, message, Popconfirm, Select } from "antd";
import Goods from "@/public/images/svg/goods.svg";
import Time from "@/public/images/svg/time.svg";
import Link from "@/public/images/svg/link.svg";
import ArrowRight from "@/public/images/svg/arrow_right.svg";
import Chat from "@/public/images/svg/chat.svg";
import Twitter from "@/public/images/svg/twitter.svg";
import Vector from "@/public/images/svg/vector.svg";
import Hammer from "@/public/images/svg/hammer.svg";
import Tips from "@/public/images/svg/tips.svg";
import InviteModal from "./components/InviteModal";
import SuccessfulModal from "./components/SuccessfulModal";
import HammerModal from "./components/HammerModal";
import CodeModal from "./components/CodeModal";
import ScoreModal from "./components/ScoreModal";
import copy from "copy-to-clipboard";

const Node = ({ ...props }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [render, setRender] = useState(0);
  const [open, setOpen] = useState(false);
  const [sucOpen, setSsucOpen] = useState(false);
  const [hammerOpen, setHammerOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [scoreOpen, setScoreOpen] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const { chain } = useNetwork();

  const { address } = useAccount();

  const nodeContract = contract[chain?.id]?.node;

  const { data: read0, refetch: read0refetch } = useContractReads({
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

  console.log(tokenAddress);
  const tokenPrice = read0?.[1]?.result;
  const totalSell = read0?.[2]?.result;
  const phase = read0?.[3]?.result;

  const preBuyers = read0?.[4]?.result;

  const tokenContract = {
    address: tokenAddress,
    abi: erc20ABI,
  };

  const { data: read1, refetch: read1refetch } = useContractReads({
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
        reloadPage();
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
        reloadPage();
      }
    },
  };

  async function fetchData() {
    const user = await rpc.getUser(address);
    setData({ ...data, user });
    setMount(true);
  }
  const reloadPage = () => {
    fetchData();
    read0refetch();
    read1refetch();
  };
  useEffect(() => {
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

  console.log(user);
  const invites = props?.invites;

  const scoreTreasuryInfo = user?.phase2?.scoreTreasuryInfo;

  const code = user?.phase1?.code;

  const score = user?.phase1?.score;

  const marsPrize = user?.phase1?.marsPrize;

  const tokenPrize = user?.phase2?.tokenPrize;

  const scoreTreasury = scoreTreasuryInfo?.scoreTreasury;

  const referralPrize = user?.phase2?.referralPrize;

  const stakePrize = user?.phase3?.stakePrize;

  const stakeRate = user?.phase3?.stakeRate;

  const leaderPrize = user?.phase3?.leaderPrize;

  const log = user?.log;

  const boughtNodeLogs = log?.boughtNodeLogs;
  const leaderPrizeLogs = log?.leaderPrizeLogs;
  const phase2ReferralLogs = log?.phase2ReferralLogs;

  const totalPrize = (Number(stakePrize) + Number(leaderPrize)).toFixed(2);

  const inviteOpen = user?.inviteOpen;

  //0 no 1 direct 2 indirect + direct
  const leaderPrizeOpen = user?.leaderPrizeOpen;
  return mount ? (
    <>
      {contextHolder}
      <div className={styles["node-box"]}>
        <h3 className={styles["title"]}>
          {
            ["Genesis", "Vanguard", "Vibrant"][
              `${BigInt(phase || 1) - BigInt(1)}`
            ]
          }{" "}
          Node
        </h3>
        <div className={styles["node-main"]}>
          <div className={styles["node-main-con"]}>
            <div className={styles["node-intro"]}>
              <div className={styles["circle-bg"]}></div>
              <div className={styles["con"]}>
                <div
                  // onClick={() => setShowSelect((pre) => !pre)}
                  className={styles["node-goods"]}
                >
                  <img src="/images/goods.png" alt="" />
                </div>

                <h2>MarsNode</h2>
                <p>
                  <strong>{price || "--"}</strong>
                  <span>USDT</span>
                </p>
              </div>
            </div>
            <div className={styles["node-numb"]}>
              <InputNumber
                min={0}
                max={
                  phase == 1
                    ? BigInt(phase1?.max || 0) - BigInt(preBuyers || 0)
                    : null
                }
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
                    {phase != 1 && <WriteButton {...buy} />}
                  </>
                )}
              </div>
              {phase == 1 && (
                <p className={styles["max-info"]}>
                  Maximum Purchase:{" "}
                  {(
                    BigInt(phase1?.max || 0) - BigInt(preBuyers || 0)
                  ).toString()}
                </p>
              )}

              {/* {showSelect && (
                <Select
                  value={phase}
                  style={{ width: 120, marginTop: 10 }}
                  onChange={setPhase}
                  options={[
                    { value: 1, label: "phase1" },
                    { value: 2, label: "phase2" },
                    { value: 3, label: "phase3" },
                  ]}
                />
              )} */}
            </div>
          </div>
          <div className={styles["node-main-info"]}>
            <div className={styles["my-info"]}>
              <h4>My Info</h4>
              <ul>
                <li>
                  <div>
                    <p className={styles["tit"]}>Node Amount</p>
                    {/* <em>
                      <div className={styles["stake-pop"]}>
                        <div className={styles["pop-arrow"]}></div>
                        <p>Total number of nodes purchased</p>
                      </div>
                    </em> */}
                  </div>
                  <span>
                    {user?.boughtNode ?? "--"}
                    {false && (
                      <Hammer
                        className="cursor-pointer"
                        onClick={setHammerOpen}
                        width={"1.375rem"}
                      />
                    )}
                  </span>
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => setCodeOpen(true)}
                >
                  <div>
                    <p className={styles["tit"]}>Code Amount</p>
                    <em>
                      <div className={styles["stake-pop"]}>
                        <div className={styles["pop-arrow"]}></div>
                        <p>
                          Both self-purchases and direct referrals purchase will
                          receive 1 lottery code. Referring friends for
                          purchases can earn up to 3 lottery codes. These
                          lottery codes will be used for drawing MARS NFT from
                          the prizes pool.
                        </p>
                      </div>
                    </em>
                  </div>
                  <span>{code ?? "--"}</span>
                </li>
                {phase != 3 && (
                  <li>
                    <div>
                      <p className={styles["tit"]}>Points</p>
                      <em>
                        <div className={styles["stake-pop"]}>
                          <div className={styles["pop-arrow"]}></div>
                          <p>
                            Earn 100 points for each self-purchased node and an
                            additional 50 points for successfully referring a
                            user who makes a purchase. LMC reward airdrops will
                            be unlocked upon reaching specific milestones.
                          </p>
                        </div>
                      </em>
                    </div>
                    <span>{score ?? "--"}</span>{" "}
                  </li>
                )}
                {phase == 2 && (
                  <>
                    <li>
                      <div>
                        <p className={styles["tit"]}>Milestone Rewards</p>
                        <em>
                          <div className={styles["stake-pop"]}>
                            <div className={styles["pop-arrow"]}></div>
                            <p>
                              Split rewards and invitation rewards within Phase
                              2
                            </p>
                          </div>
                        </em>
                      </div>
                      <span>{tokenPrize ?? "--"} U</span>
                    </li>
                    <li>
                      <div>
                        <p className={styles["tit"]}>Referral Rewards</p>
                      </div>
                      <span>{referralPrize ?? "--"} U</span>
                    </li>
                  </>
                )}
                {phase == 3 && (
                  <>
                    <li>
                      <div>
                        <p className={styles["tit"]}>Total Rewards</p>
                        <em>
                          <div className={styles["stake-pop"]}>
                            <div className={styles["pop-arrow"]}></div>
                            <p>Farming rewards and Airdrop Boost earnings</p>
                          </div>
                        </em>
                      </div>
                      <span>{totalPrize ?? "--"} LMC</span>
                    </li>
                    <li>
                      <div>
                        <p className={styles["tit"]}>Leader Rewards</p>
                        <em>
                          <div className={styles["stake-pop"]}>
                            <div className={styles["pop-arrow"]}></div>
                            <p>
                              Airdrop Boost earnings.For every node that the
                              referral friends have , enjoy a 5% share of their
                              airdrop earnings
                            </p>
                          </div>
                        </em>
                      </div>
                      <span>{leaderPrize ?? "--"} LMC</span>
                    </li>
                    <li>
                      <div>
                        <p className={styles["tit"]}>Staking</p>
                      </div>
                      <span>{stakeRate ?? "--"} LMC/Block</span>
                    </li>
                    <li>
                      <div>
                        <p className={styles["tit"]}>Stake Reward</p>
                      </div>
                      <span>{stakePrize ?? "--"} LMC</span>
                    </li>
                  </>
                )}
              </ul>

              {phase != 1 && (
                <div
                  className={`price-btn ${styles["price"]}`}
                  onClick={() => setScoreOpen(true)}
                >
                  <div>
                    <p className={styles["tit"]}>Score Treasure</p>
                    <em>
                      <div className={styles["stake-pop"]}>
                        <div className={styles["pop-arrow"]}></div>
                        <p>
                          Each node&apos;s creation will automatically
                          contribute 5 points to the Points Treasury.
                        </p>
                      </div>
                    </em>
                  </div>
                  <span>{scoreTreasury || "--"}</span>
                </div>
              )}
            </div>

            {phase != 1 && (
              <button
                className={`price-btn small ${styles["block-btn"]}`}
                disabled
              >
                Claim
              </button>
            )}

            <button
              disabled={!user?.inviteOpen}
              className={`price-btn small ${styles["block-btn"]}`}
              onClick={(e) => {
                copy(window.location.href + user?.id);

                messageApi.open({
                  type: "success",
                  content: "Copied",
                });
                setData({ ...data, copy: true });
              }}
            >
              <Link width={"1.25rem"} />
              Copy Invite Link
            </button>

            <button
              onClick={setOpen}
              className={`price-btn small ${styles["block-btn"]}`}
            >
              <Time width={"1.125rem"} />
              Your Invitation
            </button>
          </div>
        </div>
      </div>
      <div className={styles["progress-big-box"]}>
        <ProgressLine
          total={totalSell?.toString() || 0}
          phase={phase}
          code={code}
          marsPrize={marsPrize}
          scoreTreasury={scoreTreasury}
          list={scoreTreasuryInfo?.last100}
          leftBlock={scoreTreasuryInfo?.leftBlock}
        />
      </div>
      <InviteModal
        phase={phase}
        open={open}
        invites={invites}
        referralPrizeLogs={referralPrizeLogs}
        handleClose={() => setOpen(false)}
      />
      <SuccessfulModal
        id={user?.id}
        num={nowNumb}
        open={sucOpen}
        handleClose={() => setSsucOpen(false)}
      />
      <CodeModal
        code={code}
        open={codeOpen}
        marsPrize={marsPrize}
        handleClose={() => setCodeOpen(false)}
      />
      <ScoreModal
        open={scoreOpen}
        scoreTreasury={scoreTreasury}
        list={scoreTreasuryInfo?.last100}
        leftBlock={scoreTreasuryInfo?.leftBlock}
        handleClose={() => setScoreOpen(false)}
      />

      <HammerModal
        open={hammerOpen}
        handleClose={() => setHammerOpen(false)}
        totalPrize={totalPrize}
        stakeRate={stakeRate}
        leaderPrize={leaderPrize}
      />
    </>
  ) : (
    <Loading />
  );
};

export default Node;
