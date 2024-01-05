import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { getPointCoor } from "@/utils/index";
const ProgressLine = ({ total, ...props }) => {
  const ballInfo = [
    { no: 800, split: "20,000" },
    { no: 1500, split: "40,000" },
    { no: 2100, split: "60,000" },
  ];
  const smallBox = useRef(null);
  const bigBox = useRef(null);
  const [ball1, setBall1] = useState({ left: 0, top: 0 });
  const [ball2, setBall2] = useState({ left: 0, top: 0 });
  const [ball3, setBall3] = useState({ left: 0, top: 0 });
  const [freeBall, setFreeBall] = useState({ left: 0, top: 0 });

  const setPoint = () => {
    const b1 = getPointCoor(800, smallBox, bigBox);
    const b2 = getPointCoor(1500, smallBox, bigBox);
    const b3 = getPointCoor(2100, smallBox, bigBox);
    const fb = getPointCoor(total, smallBox, bigBox);
    setBall1(b1);
    setBall2(b2);
    setBall3(b3);
    setFreeBall(fb);
  };

  useEffect(() => {
    setPoint();
    window.addEventListener("resize", setPoint);
  }, []);

  return (
    <div className={styles["big-ball-ball"]}>
      <div className={styles["all-pro-box"]}>
        <div className={styles["copy-box"]}>
          {ballInfo.map((item, i) => (
            <div
              key={i}
              style={{
                top: `${[ball1, ball2, ball3][i].top}px`,
                left: `${[ball1, ball2, ball3][i].left}px`,
              }}
              className={`${styles.ball} ${styles[`ball${i + 1}`]} ${
                total >= item.no ? styles.passed : ""
              }`}
            >
              <span></span>
              <div className={styles.in}>
                No.{item.no} Node
                <p>SPLIT {item.split}U LMC</p>
              </div>
            </div>
          ))}
          {/* freeBall */}
          <div
            style={{
              top: `${freeBall.top}px`,
              left: `${freeBall.left}px`,
              width: `${1.125 + total * ((2.75 - 1.125) / 30000)}rem`,
              height: `${1.125 + total * ((2.75 - 1.125) / 30000)}rem`,
            }}
            className={`${styles["free-ball"]}`}
          >
            <span></span>
            <p>{total} Sold</p>
          </div>
        </div>
      </div>
      <div className={styles["hidden-box"]}>
        <div ref={smallBox} className={styles["progress-line-box"]}>
          <div ref={bigBox} className={`${styles["big-box"]}`}>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProgressLine;
