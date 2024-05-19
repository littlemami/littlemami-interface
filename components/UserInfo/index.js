import { contract } from "@/config";
import { useNetwork, useContractReads, useAccount, useDisconnect } from "wagmi";
import { erc20ABI } from "@wagmi/core";
import { Modal, message, Popconfirm } from "antd";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

import Head from "@/public/images/svg/head.svg";

import Down from "@/public/images/svg/down.svg";
import styles from "./index.module.scss";
const UserInfo = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const [render, setRender] = useState(0);
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  const { chain } = useNetwork();

  const nodeContract = contract[chain?.id]?.node;

  const { data: read0 } = useContractReads({
    contracts: [{ ...nodeContract, functionName: "tokenAddress" }],
    scopeKey: render,
  });

  const tokenAddress = read0?.[0]?.result;
  const tokenContract = {
    address: tokenAddress,
    abi: erc20ABI,
  };
  const { data: read1 } = useContractReads({
    contracts: [
      {
        ...tokenContract,
        functionName: "balanceOf",
        args: [address],
      },
      { ...tokenContract, functionName: "decimals" },
    ],
    scopeKey: render,
  });

  const tokenBalance = read1?.[0]?.result;
  const decimals = read1?.[1]?.result;

  useEffect(() => {
    setBalance(
      tokenBalance && (tokenBalance / 10n ** BigInt(decimals || 0))?.toString()
    );
  }, [decimals, tokenBalance]);

  return (
    <div>
      {contextHolder}
      <div style={{ position: "relative", zIndex: 999 }}>
        {address ? (
          <div className={styles["connected"]}>
            <div>{balance || 0} LMC</div>
            <div onClick={() => setOpen((pre) => !pre)}>
              <Head width={"1.25rem"} />
              {address?.slice(0, 4)}...{address?.slice(-4)}
              <Down
                width={"0.875rem"}
                className={`open ${open ? "yes" : ""}`}
              />
            </div>
            {open && (
              <ul>
                <li
                  onClick={(e) => {
                    copy(address);
                    messageApi.open({
                      type: "success",
                      content: "Copied",
                    });
                    setOpen(false);
                  }}
                >
                  Copy Adress
                </li>
                <li
                  onClick={() => {
                    setOpen(false);
                    disconnect();
                  }}
                >
                  Log Out
                </li>
              </ul>
            )}
          </div>
        ) : null}
        {openConnectModal ? (
          <button className={styles.connect} onClick={openConnectModal}>
            Connect
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default UserInfo;
