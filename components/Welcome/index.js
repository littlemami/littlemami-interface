import Node from "@/components/Node";
import Invite from "@/components/Invite";
import rpc from "@/components/Rpc";
import { useConnect } from "wagmi";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Index";
import { useRouter } from "next/router";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import styles from "./index.module.scss";

const Welcome = (props) => {
  const { openConnectModal } = useConnectModal();

  return (
    <div className={styles["home_box"]}>
      <h1
        className={`animate__animated animate__fadeInDown ${styles["home-h1"]}`}
      >
        LittleMami
      </h1>
      <h2
        className={`animate__animated animate__fadeInDown animate__delay-1s ${styles["home-h2"]}`}
      >
        MarsNode
      </h2>
      <p
        className={`animate__animated animate__fadeInUp animate__delay-2s ${styles["home-p"]}`}
      >
        Get Started with Your Wallet Connected.
      </p>
      {openConnectModal ? (
        <button
          className={`animate__animated animate__fadeInUp animate__delay-2s lit-btn`}
          onClick={openConnectModal}
        >
          connect
        </button>
      ) : null}
    </div>
  );
};

export default Welcome;
