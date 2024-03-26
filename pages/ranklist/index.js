import { useEffect, useRef, useState } from "react";
import rpc from "@/components/Rpc";
import Loading from "@/components/Loading/Index";
import styles from "./index.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
const Ranklist = () => {
  const [data, setData] = useState({});
  const [mount, setMount] = useState(true);
  const [more, seMore] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  async function fetchData(page) {
    const scoreRank = await rpc.getScoreRank(page, pageSize);

    setData((prev) => ({
      ...prev,
      scoreRank:
        page === 1 ? [...scoreRank] : [...prev.scoreRank, ...scoreRank],
    }));
    if (scoreRank?.length < pageSize) {
      seMore(false);
      return;
    }
    page === 1 && setMount(true);
  }

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return mount ? (
    <div className={`${styles["rank-list-box"]} mx-auto`}>
      <div className={styles["rank-list-con"]}>
        <div className={styles["circle-bg"]}></div>
        <div className={styles["icon"]}>
          <div className="new-list-box">
            <div className="item first">
              <p>Rank</p>
              <strong>Address</strong>
              <p>Score</p>
            </div>
            <div
              id="scrollableDiv"
              style={{
                height: `calc(100vh - 25rem)`,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfiniteScroll
                dataLength={10} //This is important field to render the next data
                next={() => setPage((pre) => pre + 1)}
                hasMore={more}
                loader={
                  <div className="loading-box">
                    <span></span>
                    <span></span>
                  </div>
                }
                endMessage={
                  <></>
                  // <p style={{ textAlign: "center" }}>
                  //   <b>Yay! You have seen it all</b>
                  // </p>
                }
                style={{ display: "flex", flexDirection: "column" }}
                inverse={false}
                scrollableTarget="scrollableDiv"
              >
                {data?.scoreRank?.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <p> {index + 1}</p>
                      <strong>{item.address}</strong>
                      <p> {item.score}</p>
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          </div>

          {data?.scoreRank?.length == 0 && <p className="no-data">No data</p>}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Ranklist;
