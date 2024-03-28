import Image from "next/image";
import MyButton from "@/components/MyButton";
import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import Tools from "../Tools";
import WriteButton from "@/components/WriteButton";

import { useTotalStakeInfo } from "@/hooks/stake";

import Back from "@/public/images/svg/back.svg";
import Plus from "@/public/images/svg/plus_1.svg";
import { displayNonZeroDigits } from "@/utils";

const Supply = ({ handleBack, pool, showSupply }) => {
  const [open, setOpen] = useState(false);
  const [chooseNfts, setChooseNfts] = useState([]);
  const [choosePass, setChoosePass] = useState();
  const [type, setType] = useState("nft");
  const {
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
    userPassTokenId,
  } = useTotalStakeInfo(pool);
  const { stakedTokenIds: stakedTokenIds1, userPassTokenId: userPassTokenId1 } =
    useTotalStakeInfo(0);
  const { stakedTokenIds: stakedTokenIds2, userPassTokenId: userPassTokenId2 } =
    useTotalStakeInfo(1);

  const nftOptions = useMemo(
    () =>
      holdTokenIds?.map((item) => ({
        value: item,
        key: item,
        disabled: [...stakedTokenIds1, ...stakedTokenIds2]?.includes(item),
      })),
    [holdTokenIds, stakedTokenIds1, stakedTokenIds2]
  );

  const passOptions = useMemo(
    () =>
      holdPassTokenIds?.map((item) => ({
        value: item,
        key: item,
        disabled: [userPassTokenId1, userPassTokenId2]?.includes(item),
      })),
    [holdPassTokenIds, userPassTokenId1, userPassTokenId2]
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
              <Image src={"/images/svg/tool_1.svg"} layout="fill" alt={"1"} />
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
                        src={"/images/svg/nft.svg"}
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
          {/* test */}
          {false && (
            <div className={styles.item}>
              <div className={styles.l}>
                <div className={styles.smallLeftImg}>
                  <Image
                    src={"/images/svg/wallet.svg"}
                    layout="fill"
                    alt={"1"}
                  />
                </div>
              </div>
              <span>{allowance || 0}</span>
            </div>
          )}
        </div>
        {/*  */}
        {pool !== 0 && (
          <div className={styles.itemBox}>
            <div className={styles.bg}></div>
            <div className={styles.item}>
              <div className={styles.l}>
                <Image src={"/images/svg/tool_2.svg"} layout="fill" alt={"1"} />
              </div>

              <span>Pass</span>
              <div className={styles.r}>
                {(userPassTokenId && userPassTokenId !== "0") || choosePass ? (
                  <div
                    className={styles.imgList}
                    onClick={() => {
                      if (userPassTokenId && userPassTokenId !== "0") return;
                      setOpen(true);
                      setType("pass");
                    }}
                  >
                    <div className={styles.img}>
                      <Image
                        style={{ borderRadius: "100%" }}
                        src={"/images/svg/pass.svg"}
                        layout="fill"
                        alt={"1"}
                      />
                    </div>
                  </div>
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

        <div className={styles.btnBox}>
          {showApprove && <WriteButton fullWidth {...approve} />}
          {!showApprove && (
            <WriteButton
              fullWidth
              {...stake({
                stakeTokenIds: chooseNfts,
                passTokenId:
                  userPassTokenId && userPassTokenId !== "0"
                    ? userPassTokenId
                    : choosePass,
                callback: handleBack,
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
        only={type === "nft" ? false : true}
        defaultList={type === "nft" ? chooseNfts : choosePass}
        onChange={type === "nft" ? setChooseNfts : setChoosePass}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};
export default Supply;
