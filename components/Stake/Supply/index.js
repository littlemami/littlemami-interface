import Image from "next/image";
import MyButton from "@/components/MyButton";
import { useEffect, useMemo, useState, useContext } from "react";
import styles from "./index.module.scss";
import Tools from "@/components/Stake/Tools";
import WriteButton from "@/components/WriteButton";

import { StakeContext } from "@/pages/stake";

import Back from "@/public/images/svg/back.svg";
import Plus from "@/public/images/svg/plus_1.svg";
import { displayNonZeroDigits } from "@/utils";
import { BigNumber } from "bignumber.js";

const Supply = ({ handleBack, pool, showSupply }) => {
  const [open, setOpen] = useState(false);
  const [chooseNfts, setChooseNfts] = useState([]);
  const [choosePass, setChoosePass] = useState([]);
  const [type, setType] = useState("nft");

  const getStake = useContext(StakeContext);
  let {
    rate,
    start,
    userAmount,
    stakeAmount,
    userRemain,
    holdTokenIds,
    passRequired,
    allowance,
    showApprove,
    approve,
    stake,
    tokenAmount,
    holdPassTokenIds,
    stakedTokenIds,
    showSuc,
    balance,
  } = getStake[pool];
  const {
    stakedTokenIds: stakedTokenIds1,
    usedPassTokenIds: usedPassTokenIds1,
  } = getStake[0];
  const {
    stakedTokenIds: stakedTokenIds2,
    usedPassTokenIds: usedPassTokenIds2,
  } = getStake[1];
  const balanceString = balance
    ? displayNonZeroDigits(new BigNumber(balance).div(10 ** 18).toString())
    : 0;

  const nftOptions = useMemo(
    () =>
      holdTokenIds?.map((item) => ({
        value: `No.${item}`,
        key: item,
        disabled: [...stakedTokenIds1, ...stakedTokenIds2]?.find(
          (initem) => initem.toString() === item.toString()
        ),
      })),
    [holdTokenIds, stakedTokenIds1, stakedTokenIds2]
  );

  const passOptions = useMemo(
    () =>
      holdPassTokenIds?.map((item) => ({
        value: `No.${item}`,
        key: item,
        disabled: [...usedPassTokenIds1, ...usedPassTokenIds2]?.find(
          (initem) => initem.toString() === item.toString()
        ),
      })),
    [holdPassTokenIds, usedPassTokenIds1, usedPassTokenIds2]
  );

  const lengthDis = useMemo(
    () => pool === 1 && choosePass?.length !== chooseNfts?.length,
    [choosePass, chooseNfts, pool]
  );

  const lmcDis = useMemo(
    () => balance < (chooseNfts?.length || 0) * tokenAmount || 0,
    [balance, chooseNfts, tokenAmount]
  );

  useEffect(() => {
    // 重置
  }, [handleBack]);

  return (
    <>
      <div className={`${styles.suppyBox} w-[50%] min-w-[600px] mx-auto`}>
        <div className={`cursor-pointer ${styles.back}`} onClick={handleBack}>
          <Back /> Back
        </div>
        {/*  */}
        <div className={styles.itemBox}>
          <div className={styles.bg}></div>
          <div className={styles.item}>
            <div className={styles.l}>
              <Image src={"/images/svg/tool_2.svg"} layout="fill" alt={"1"} />
            </div>
            <span>Tool</span>
            <div className={styles.r}>
              {chooseNfts?.length !== 0 ? (
                <div
                  className={styles.imgList}
                  onClick={() => {
                    setOpen(true);
                    setType("nft");
                  }}
                >
                  {chooseNfts.slice(0, 5)?.map((item, i) => (
                    <div key={i} className={styles.img}>
                      <Image
                        style={{ borderRadius: "100%" }}
                        src={"/images/svg/tool_2.svg"}
                        layout="fill"
                        alt={"1"}
                      />
                    </div>
                  ))}
                  {chooseNfts?.length > 5 && (
                    <div className={styles.lastImg}>x{chooseNfts?.length}</div>
                  )}
                </div>
              ) : (
                <MyButton
                  onClick={() => {
                    setOpen(true);
                    setType("nft");
                  }}
                  text="Choose"
                  color="#6944ff"
                />
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className={styles.itemBox}>
          <div className={styles.bg}></div>
          <div className={styles.item}>
            <div className={styles.l}>
              <Image src={"/images/svg/lmc.svg"} layout="fill" alt={"1"} />
            </div>

            <span>LMC</span>
            <div className={styles.r}>
              {displayNonZeroDigits(
                (chooseNfts?.length || 0) * tokenAmount || 0
              )}
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.l}>
              <div className={styles.smallLeftImg}>
                <Image src={"/images/svg/wallet.svg"} layout="fill" alt={"1"} />
              </div>
            </div>
            <span>{balanceString || 0}</span>
            <div className={styles.r}>
              {lmcDis ? (
                <p className="mt-[10px] text-[#BC2A4D]">Insufficient balance</p>
              ) : null}
            </div>
          </div>
        </div>
        {/*  */}
        {pool !== 0 && (
          <div className={styles.itemBox}>
            <div className={styles.bg}></div>
            <div className={styles.item}>
              <div className={styles.l}>
                <Image
                  src={"/images/svg/pass_border.svg"}
                  layout="fill"
                  alt={"1"}
                />
                ``
              </div>

              <span>Pass</span>
              <div className={styles.r}>
                {choosePass?.length !== 0 ? (
                  <>
                    <div
                      className={styles.imgList}
                      onClick={() => {
                        setOpen(true);
                        setType("pass");
                      }}
                    >
                      {choosePass.slice(0, 5)?.map((item, i) => (
                        <div key={i} className={styles.img}>
                          <Image
                            style={{ borderRadius: "100%" }}
                            src={"/images/svg/pass.svg"}
                            layout="fill"
                            alt={"1"}
                          />
                        </div>
                      ))}
                      {choosePass?.length > 5 && (
                        <div className={styles.lastImg}>
                          x{choosePass?.length}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <MyButton
                    onClick={() => {
                      setOpen(true);
                      setType("pass");
                    }}
                    text="Choose"
                    color="#6944ff"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {lengthDis ? (
          <p className="mt-[10px] text-[#BC2A4D]">
            Inconsistent number of pass cards and ssr cards
          </p>
        ) : null}

        <div className={styles.btnBox}>
          {showApprove && <WriteButton fullWidth {...approve} />}
          {!showApprove && (
            <WriteButton
              disabled={lengthDis || lmcDis}
              fullWidth
              {...stake({
                stakeTokenIds: chooseNfts,
                passTokenId: choosePass,
                callback: () => {
                  showSuc();
                  handleBack();
                },
              })}
            />
          )}
          {/* <MyButton fullWidth text="SUPPLY" color="#b844ff" /> */}
        </div>
      </div>
      <Tools
        options={type === "nft" ? nftOptions : passOptions}
        open={open}
        tokenAmount={tokenAmount}
        passCard={type === "nft" ? false : true}
        defaultList={type === "nft" ? chooseNfts : choosePass}
        onChange={type === "nft" ? setChooseNfts : setChoosePass}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};
export default Supply;
