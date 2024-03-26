import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

const CheckNft = ({ options, onChange, unStaked = false }) => {
  const [checkList, setCheckList] = useState([]);
  const changeFn = (val) => {
    setCheckList((pre) =>
      pre.includes(val) ? pre.filter((item) => item !== val) : [...pre, val]
    );
  };

  useEffect(() => {
    onChange?.(checkList);
  }, [checkList]);

  return (
    <>
      {options?.map((item) => (
        <div
          onClick={() => {
            if (!item?.disabled) changeFn(item?.key);
          }}
          key={item?.key}
          className={`${styles.checkItems} ${
            unStaked ? styles.unStaked : ""
          }   ${item?.disabled ? styles.disabled : ""} ${
            checkList.includes(item?.key) ? styles.checked : ""
          }`}
        >
          <div className={styles.img}>
            <Image src={"/images/svg/nft.svg"} layout="fill" alt={"1"} />
          </div>
          <div className={styles.con}> {item?.value}</div>
          <div className={styles.r}>
            {item?.disabled ? "Staked" : <span className={styles.radio}></span>}
          </div>
        </div>
      ))}
    </>
  );
};
export default CheckNft;
