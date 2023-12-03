import { useState } from "react";
import SignButton from "../SignButton";
import rpc from "@/components/Rpc";
import { useRouter } from "next/router";
const Invite = () => {
  const [data, setData] = useState({});
  const router = useRouter();

  const sign = {
    buttonName: "Confirm",
    disabled: !data.leader,
    message: JSON.stringify({ leader: data.leader }),
    callback: async (signature) => {
      const res = await rpc.register(data.leader, signature);

      if (res?.error) {
        setData({ ...data, error: res.error });
      } else {
        router.reload();
      }
    },
  };

  return (
    <div className="m-auto w-96 text-center mt-20">
      Submit Invite Address
      <input
        type="text"
        placeholder="0x..."
        className="input input-bordered w-full"
        onChange={(e) => {
          setData({ ...data, leader: e.target.value });
        }}
      />
      <SignButton {...sign} className="mt-2" />
      {data.error && <div className="text-red-500">{data.error}</div>}
    </div>
  );
};

export default Invite;
