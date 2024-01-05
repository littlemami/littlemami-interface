import { useEffect, useState } from "react";
import rpc from "@/components/Rpc";
import Loading from "@/components/Loading/Index";
import styles from "./index.module.scss";

const Ranklist = () => {
  const [data, setData] = useState({});
  const [mount, setMount] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const scoreRank = await rpc.getScoreRank(1, 100);
      setData({ ...data, scoreRank });
      setMount(true);
    }
    fetchData();
  }, []);

  console.log(data);
  return mount ? (
    <div className={`${styles["rank-list-box"]} mx-auto`}>
      <div className={styles["rank-list-con"]}>
        <div className={styles["circle-bg"]}></div>
        <div className={styles["con"]}>
          <table>
            {/* head */}
            <thead>
              <tr>
                <th width="100" align="center">
                  Rank
                </th>
                <th align="center">Address</th>
                <th width="100" align="center">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.scoreRank?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td width="100" align="center">
                      {index + 1}
                    </td>
                    <td align="center">{item.address}</td>
                    <td width="100" align="center">
                      {item.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {data?.scoreRank?.length == 0 && <p className="no-data">No data</p>}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Ranklist;
