import { useEffect, useState } from "react";
import SignButton from "../SignButton";
import rpc from "@/components/Rpc";
import { useRouter } from "next/router";
const Invite = (props) => {
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    setData({ ...data, inviteCode: props.inviteCode });
  }, [props.inviteCode]);

  const sign = {
    buttonName: "Confirm",
    disabled: !data.inviteCode,
    message: JSON.stringify({ inviteCode: data.inviteCode }),
    callback: async (signature) => {
      const res = await rpc.register(data.inviteCode, signature);

      if (res?.error) {
        setData({ ...data, error: res.error });
      } else {
        router.reload();
        router.push("/");
      }
    },
  };

  return (
    <div className="m-auto w-96 text-center mt-20">
      Submit Invite Code
      <input
        type="text"
        placeholder={props.inviteCode || "10001"}
        className="input input-bordered w-full"
        value={data.inviteCode}
        onChange={(e) => {
          setData({ ...data, inviteCode: e.target.value });
        }}
      />
      <SignButton {...sign} className="mt-2" />
      {data.error && <div className="text-red-500">{data.error}</div>}
    </div>
  );
};

export default Invite;
