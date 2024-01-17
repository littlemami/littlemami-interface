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

const Node = ({ invites, ...props }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [render, setRender] = useState(0);
  const [open, setOpen] = useState(false);
  const [sucOpen, setSsucOpen] = useState(false);
  const [hammerOpen, setHammerOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [scoreOpen, setScoreOpen] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const [phase, setPhase] = useState(1);
  const [tokenAddress, setTokenAddress] = useState();
  const [preBuyers, setPreBuyers] = useState();
  const [tokenPrice, setTokenPrice] = useState();
  const [totalSell, setTotalSell] = useState();

  const [allowance, setAllowance] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [decimals, setDecimals] = useState();

  const [data, setData] = useState({});
  const [mount, setMount] = useState(false);
  const [nowNumb, setNowNumb] = useState(0);

  const [user, setUser] = useState();
  const [scoreTreasuryInfo, setScoreTreasuryInfo] = useState();
  const [code, setCode] = useState();
  const [score, setScore] = useState();
  const [marsPrize, setMarsPrize] = useState();
  const [tokenPrize, setTokenPrize] = useState();
  const [scoreTreasury, setScoreTreasury] = useState();
  const [stakePrize, setStakePrize] = useState();
  const [stakeRate, setStakeRate] = useState();
  const [leaderPrize, setLeaderPrize] = useState();
  const [totalPrize, setTotalPrize] = useState();
  const [inviteOpen, setInviteOpen] = useState();
  const [leaderPrizeOpen, setLeaderPrizeOpen] = useState();
  const [phase1, setPhase1] = useState();
  const [preBuy, setPreBuy] = useState();
  const [buy, setBuy] = useState();
  const [price, setPrice] = useState();
  const [balance, setBalance] = useState();
  const [showApprove, setShowApprove] = useState();
  const [totalCost, setTotalCost] = useState();
  const [tempSell, setTempSell] = useState();
  const [tempPrice, setTempPrice] = useState();

  const { chain } = useNetwork();

  const { address } = useAccount();

  const nodeContract = contract[chain?.id]?.node;
  /*---------------------------- */
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

  /*---------------------------- */
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

  /*---------------------------- */
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
        setRender((pre) => pre + 1);
      }
    },
  };

  useEffect(() => {
    const tokenPriceIn = read0?.[1]?.result;
    const decimalsIn = read1?.[2]?.result;
    const user1 = data.user;
    const stakePrize1 = user1?.phase3?.stakePrize;
    const leaderPrize1 = user1?.phase3?.leaderPrize;
    const phaseIn = user1?.phase1;
    const priceIn =
      tokenPriceIn &&
      (tokenPriceIn / 10n ** BigInt(decimalsIn || 0))?.toString();
    const tokenBalanceIn = read1?.[1]?.result;
    const totalSellIn = read0?.[2]?.result;

    setTokenAddress(read0?.[0]?.result);
    setTokenPrice(tokenPriceIn);
    setTotalSell(totalSellIn);
    setPhase(read0?.[3]?.result);
    setPreBuyers(read0?.[4]?.result);

    setAllowance(read1?.[0]?.result);
    setTokenBalance(tokenBalanceIn);
    setDecimals(decimalsIn);

    setUser(user1);
    setScoreTreasuryInfo(user1?.phase2?.scoreTreasuryInfo);
    setCode(user1?.phase1?.code);
    setScore(user1?.phase1?.score);
    setMarsPrize(user1?.phase1?.marsPrize);
    setTokenPrize(user1?.phase2?.tokenPrize);
    setScoreTreasury(user1?.phase2?.scoreTreasury);
    setStakeRate(user1?.phase3?.stakeRate);

    setStakePrize(stakePrize1);
    setLeaderPrize(leaderPrize1);
    setTotalPrize(+stakePrize1 + +leaderPrize1);
    setInviteOpen(user1?.inviteOpen);
    //0 no 1 direct 2 indirect + direct
    setLeaderPrizeOpen(user1?.leaderPrizeOpen);

    setBuy({
      buttonName: "Buy Node",
      disabled: !data.amount || data.amount == 0,
      data: {
        ...nodeContract,
        functionName: "buy",
        args: [data?.amount],
      },
      callback: (confirmed) => {
        if (confirmed) {
          reloadPage();
          setSsucOpen(true);
          setRender((pre) => pre + 1);
        }
      },
    });

    setPhase1(phaseIn);

    setPreBuy({
      buttonName: "Pre Buy Node",
      disabled:
        !data.amount ||
        data.amount == 0 ||
        data.amount > phaseIn?.max - Number(preBuyers),
      data: {
        ...nodeContract,
        functionName: "preBuy",
        args: [phaseIn?.signature, phaseIn?.max, data?.amount],
      },
      callback: (confirmed) => {
        if (confirmed) {
          reloadPage();
          setSsucOpen(true);
          setRender((pre) => pre + 1);
        }
      },
    });

    setPrice(priceIn);

    setBalance(
      tokenBalanceIn &&
        (tokenBalanceIn / 10n ** BigInt(decimalsIn || 0))?.toString()
    );
    setShowApprove(allowance < Number(data?.amount) * 10 ** Number(decimalsIn));

    let totalCostIn = 0;
    let tempSellIn = Number(totalSellIn);
    let tempPriceIn = Number(priceIn);

    for (let i = 0; i < Number(data?.amount); i++) {
      totalCostIn += tempPriceIn;
      tempSellIn += 1;
      if (tempSellIn % 50 == 0) {
        tempPriceIn = Math.ceil(tempPriceIn * 1.005);
      }
    }

    setTotalCost(totalCostIn);
    setTempSell(tempSellIn);
    setTempPrice(tempPriceIn);
  }, [read0, read1, data]);

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
                  defaultValue={1}
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
                        <p className={styles["tit"]}>Token Prize</p>
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
            <button className={`price-btn small ${styles["block-btn"]}`}>
              Chaim
            </button>
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
          scoreTreasury={scoreTreasury}
          list={scoreTreasuryInfo?.last100}
          leftBlock={scoreTreasuryInfo?.leftBlock}
        />
      </div>
      <InviteModal
        open={open}
        invites={invites}
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
