import Loading from "@/components/Loading/Index";
import WriteButton from "@/components/WriteButton";
import { useEffect, useState } from "react";

const Node = () => {
  const [data, setData] = useState({});
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const buy = {
    buttonName: "Buy",
  };
  return mount ? (
    <>
      <div className="m-auto w-96 text-center">
        <div className="text-right">Price : 1 USDT</div>
        <input
          type="number"
          placeholder="0"
          className="input input-bordered w-full"
          onChange={(e) => {
            setData({ ...data, amount: e.target.value });
          }}
        />
        <div className="my-2">Total cost : {data?.amount * 1 || 0} USDT</div>
        <WriteButton {...buy} className="" />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Node;
