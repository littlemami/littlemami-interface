import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

const CheckNft = ({
  options,
  onChange,
  defaultList,
  unStaked = false,
  only,
  passCard = false,
  max = null,
}) => {
  const [checkList, setCheckList] = useState(
    defaultList || (only ? undefined : [])
  );
  const [inOptions, setInOptions] = useState(options || []);
  const changeFn = (val) => {
    setCheckList((pre) => {
      if (only) {
        return pre === val ? undefined : val;
      } else {
        return pre.includes(val)
          ? pre.filter((item) => item !== val)
          : [...pre, val];
      }
    });
  };

  useEffect(() => {
    onChange?.(checkList);
  }, [checkList]);

  const setOptionsDisable = (type) => {
    setInOptions((prev) =>
      prev.map((item) => {
        if (!type) {
          return { ...item, disabled: false };
        } else {
          return {
            ...item,
            disabled: !checkList.includes(item.key),
          };
        }
      })
    );
  };

  useEffect(() => {
    if (!max) return;
    setOptionsDisable(checkList?.length >= max);
  }, [max, checkList]);

  return (
    <>
      {inOptions?.map((item) => (
        <div
          onClick={() => {
            if (!(item?.staked || item?.disabled)) changeFn(item?.key);
          }}
          key={item?.key}
          className={`${styles.checkItems}  ${
            unStaked ? styles.unStaked : ""
          }   ${item?.staked || item?.disabled ? styles.disabled : ""} ${
            only
              ? checkList === item?.key
                ? styles.checked
                : ""
              : checkList?.includes(item?.key)
              ? styles.checked
              : ""
          }`}
        >
          <div className={styles.img}>
            {passCard ? (
              <Image src={"/images/svg/pass.svg"} layout="fill" alt={"PASS"} />
            ) : (
              <Image src={"/images/svg/tool_2.svg"} layout="fill" alt={"SSR"} />
            )}
          </div>
          <div className={styles.con}> {item?.value.toString()}</div>
          <div className={styles.r}>
            {item?.staked ? "Staked" : <span className={styles.radio}></span>}
          </div>
        </div>
      ))}
    </>
  );
};
export default CheckNft;
