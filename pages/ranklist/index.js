import { useEffect, useState } from "react";
import rpc from "@/components/Rpc";
import Loading from "@/components/Loading/Index";

const Ranklist = () => {
  const [data, setData] = useState({});
  const [mount, setMount] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const scoreRank = await rpc.getScoreRank();
      setData({ ...data, scoreRank });
      setMount(true);
    }
    fetchData();
  }, []);

  console.log(data);
  return mount ? (
    <div>
      <div className="text-center mt-10 font-black">Score Rank List</div>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th>Current Score</th>
            </tr>
          </thead>
          <tbody>
            {data?.scoreRank?.map((item, index) => {
              return (
                <tr className="bg-base-200" key={index}>
                  <td>#</td>
                  <td>{item.address}</td>
                  <td>{item.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Ranklist;
