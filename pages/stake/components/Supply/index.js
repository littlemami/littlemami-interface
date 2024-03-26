import Image from "next/image";
import MyButton from "@/components/MyButton";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Tools from "../Tools";

import Back from "@/public/images/svg/back.svg";
import Plus from "@/public/images/svg/plus_1.svg";

const Supply = ({ handleBack, pool, showSupply }) => {
  const [open, setOpen] = useState(false);
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
              <MyButton
                onClick={() => setOpen(true)}
                text="Choose"
                color="#6944ff"
              />
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
            <div className={styles.r}>0</div>
          </div>
          <div className={styles.item}>
            <div className={styles.l}>
              <div className={styles.smallLeftImg}>
                <Image src={"/images/svg/wallet.svg"} layout="fill" alt={"1"} />
              </div>
            </div>
            <span>20000</span>
          </div>
        </div>
        {/*  */}
        {pool === 2 && (
          <div className={styles.itemBox}>
            <div className={styles.bg}></div>
            <div className={styles.item}>
              <div className={styles.l}>
                <Image src={"/images/svg/tool_2.svg"} layout="fill" alt={"1"} />
              </div>

              <span>Tool</span>
              <div className={styles.r}>
                <MyButton text="Choose" color="#6944ff" />
              </div>
            </div>
          </div>
        )}

        <div className={styles.btnBox}>
          <MyButton fullWidth text="SUPPLY" color="#b844ff" />
        </div>
      </div>
      <Tools open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
export default Supply;
