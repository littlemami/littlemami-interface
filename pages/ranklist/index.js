import { useEffect, useRef, useState } from "react";
import rpc from "@/components/Rpc";
import Loading from "@/components/Loading/Index";
import styles from "./index.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from 'styled-components'
import { LeaderBoardModal } from '@/components/LaunchpadLayout'

export const Tabs = styled.div`
  width: 142px;
  height: 40px;
  display: inline-flex;
  place-content: center;
  place-items: center;
  padding: 8px 30px;
  border-radius: 15px;
  background: ${(props) => props.active ? 'rgb(192, 72, 250)' : 'transparent'};
  box-shadow: ${(props) => props.active ? '0px 6px 14px rgba(184, 68, 255, 0.35)' : 'none'};
  font-size: 16px;
  color: ${(props) => props.active ? '#fff' : 'rgb(182, 182, 182)'};
  cursor: pointer;

`

const Ranklist = () => {
  const [data, setData] = useState({});
  const [mount, setMount] = useState(true);
  const [more, seMore] = useState(true);
  const [page, setPage] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0)
  const pageSize = 20;



  const [data2, setData2] = useState({});
  const [more2, seMore2] = useState(true);
  const [page2, setPage2] = useState(1);
  
  const fetchData2 = async() => {
      const marsRank = await rpc.getMarsRank(page2, pageSize);
      if (!Array.isArray(marsRank)) {
          marsRank = [];
      }
      setData2((prev) => ({
          ...prev,
          marsRank:
              page2 === 1 ? [...marsRank] : [...prev.marsRank, ...marsRank],
      }));
      if (marsRank?.length < pageSize) {
          seMore2(false);
          return;
      }
      
  }

  useEffect(() => {
      fetchData2(page2)
  },[page2])



  async function fetchData(page) {
    const marsRank = await rpc.getMarsRank(page, pageSize);

    let scoreRank = await rpc.getScoreRank(page, pageSize);
    if (!Array.isArray(scoreRank)) {
      scoreRank = [];
    }
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

  return (
    <div className="fx-col w100 ai-ct mt36">
      <div className="fx-row ai-ct" style={{ marginBottom: '120px'}}>
        <Tabs active={activeIdx === 0} onClick={() => setActiveIdx(0)}>MarsNode</Tabs>
        <Tabs className="ml30" active={activeIdx === 1} onClick={() => setActiveIdx(1)}>LaunchPad</Tabs>
      </div>
      {
        activeIdx === 0 && (
          <div className={`${styles["rank-list-box"]} mx-auto`} style={{ width: '712px'}}>
            <div className={styles["rank-list-con"]}>
              <div className={styles["circle-bg"]}></div>
              <div className={styles["con"]}>
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

                    {data?.scoreRank?.length == 0 && (
                      <p className="no-data">No data</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        activeIdx === 1 && (
          <div className={`${styles["rank-list-box"]} mx-auto`}  style={{ width: '712px'}}>
            <div className={styles["rank-list-con"]}>
              <div className={styles["circle-bg"]}></div>
              <div className={styles["con"]}>
                <div className="new-list-box">
                  <div className="item first">
                    <p>Rank</p>
                    <strong>Address</strong>
                    <p>Points</p>
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
                      next={() => setPage2((pre) => pre + 1)}
                      hasMore={more2}
                      loader={
                        <div className="loading-box">
                          <span></span>
                          <span></span>
                        </div>
                      }
                      endMessage={
                        <></>
                    
                      }
                      style={{ display: "flex", flexDirection: "column" }}
                      inverse={false}
                      scrollableTarget="scrollableDiv"
                    >
                      {data2?.marsRank?.map((item, index) => {
                        return (
                          <div className="item" key={index}>
                            <p> {index + 1}</p>
                            <strong>{item.address}</strong>
                            <p> {item.score}</p>
                          </div>
                        );
                      })}
                    </InfiniteScroll>

                    {data2?.marsRank?.length == 0 && (
                      <p className="no-data">No data</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        )
      }
    </div>
  ) 
};

export default Ranklist;



