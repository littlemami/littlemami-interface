import { useEffect, useState } from "react";
import SignButton from "../SignButton";
import rpc from "@/components/Rpc";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
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
        router.push("/");
        router.reload();
      }
    },
  };

  return (
    <div className={styles["invite-box"]}>
      <div className={styles.top}>
        <h2 className={styles["invite-h2"]}>Invite Code</h2>
        <div className={`${styles["invite-info"]}`}>
          You can get invite code from your friend.
        </div>
        <input
          type="text"
          // placeholder={props.inviteCode || "10001"}
          className={styles["invite-input"]}
          value={data.inviteCode}
          onChange={(e) => {
            setData({ ...data, inviteCode: e.target.value });
          }}
        />
        <SignButton {...sign} className="mt-2" />
      </div>
      <div className={styles.bot}>
        <a href="https://t.me/XNM0620" target="_blank">
          Follow Us to Get Node
        </a>
      </div>
    </div>
  );
};

export default Invite;
