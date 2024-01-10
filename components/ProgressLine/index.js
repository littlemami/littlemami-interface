import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { getPointCoor } from "@/utils/index";

import EndStar from "@/public/images/svg/end_star.svg";
const ProgressLine = ({ total, passTotalNum, ...props }) => {
  const ballInfo = [
    { no: 800, split: "20,000" },
    { no: 1500, split: "40,000" },
    { no: 2100, split: "60,000" },
  ];
  // Math.abs(x1 - x2) < 5 && Math.abs(y1 - y2) < 5;
  const smallBox = useRef(null);
  const bigBox = useRef(null);
  const [ball1, setBall1] = useState({ left: 0, top: 0 });
  const [ball2, setBall2] = useState({ left: 0, top: 0 });
  const [ball3, setBall3] = useState({ left: 0, top: 0 });
  const [lastBall, setLastBall] = useState({ left: 0, top: 0 });
  const [totalNum, setTotalNum] = useState(passTotalNum || 30000);
  const [freeBall, setFreeBall] = useState({ left: 0, top: 0 });

  const setPoint = () => {
    const b1 = getPointCoor(800, smallBox, bigBox, totalNum);
    const b2 = getPointCoor(1500, smallBox, bigBox, totalNum);
    const b3 = getPointCoor(2100, smallBox, bigBox, totalNum);
    const lastBall = getPointCoor(totalNum, smallBox, bigBox, totalNum);
    const fb = getPointCoor(total, smallBox, bigBox, totalNum);
    setBall1(b1);
    setBall2(b2);
    setBall3(b3);
    setLastBall(lastBall);
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
          <div
            style={{
              top: `${lastBall.top}px`,
              left: `${lastBall.left}px`,
            }}
            className={`${styles.ball} ${styles.lastball}`}
          >
            <span>
              <EndStar width={20} />
            </span>
            <div className={styles.in}>
              No.{totalNum} Node
              <p>Start Farming</p>
            </div>
          </div>
          {/* freeBall */}
          <div
            style={{
              top: `${freeBall.top}px`,
              left: `${freeBall.left}px`,
              width: `${1.125 + total * ((2.75 - 1.125) / totalNum)}rem`,
              height: `${1.125 + total * ((2.75 - 1.125) / totalNum)}rem`,
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
