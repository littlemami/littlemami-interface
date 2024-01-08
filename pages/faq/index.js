import { Collapse, ConfigProvider } from "antd";
import styles from "./index.module.scss";

import ColRight from "@/public/images/svg/col_right.svg";

const items = [
  {
    key: "1",
    label: "What’s the MarsNode?",
    children: (
      <p>
        Thirty thousand MarsNodes are available at a starting price of three
        hundred U. Every 50 nodes that are created will result in a 0.5% price
        increase. Every node automatically receives a Node Badge NFT after a
        successful purchase. NFT can be traded or transferred once the nodes are
        sold out. When there are 3000 nodes, mining of LMC (likely a
        cryptocurrency) will start. There will be a 100 million LMC supply
        total, with a reward of 69.5 LMC per block. Every ninety days, the
        mining rewards will be halved according to the percentage of nodes.
      </p>
    ),
  },
  {
    key: "2",
    label: " How to join in MarsNode?",
    children: (
      <p>
        1) The holders of PassCard, LMC TOOL NFT, and MARS NFT addresses will be
        granted direct access to the Node whitelist before the official launch,
        and purchasing can be done 12 hours after the launch. <br />
        2) After the whitelist purchase phase ends, users can make direct
        purchases through the official website or invitation links.
      </p>
    ),
  },
  {
    key: "3",
    label: "What’s the benefits of MarsNode?",
    children: (
      <p>
        Node Mining Earning、Referral Commissions、Leaderboard NFT Airdrop、LMC
        fund pool、Indirectly supporting the Airdrop、Protocol Transaction Fee
        Earnings、LittleMami Launchpad Airdrop
      </p>
    ),
  },
];

const Faq = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className={styles["faq-box"]}>
      <h2 className={styles["faq-box-h2"]}>FAQS</h2>
      <ConfigProvider
        theme={{
          token: {
            colorBorder: "#3C334F",
            colorText: "#fff",
          },
          components: {
            Collapse: {
              contentBg:
                "linear-gradient(90deg, rgba(205, 198, 221, 0.03) 0.02%, rgba(151, 125, 251, 0.00) 101.41%)",
              headerBg:
                "linear-gradient(91deg, rgba(152, 102, 215, 0.07) 19.69%, rgba(16, 36, 34, 0.04) 101.98%)",
            },
          },
        }}
      >
        <Collapse
          expandIcon={(panelProps) => (
            <ColRight
              width={"1.1875rem"}
              className={`open ${panelProps.isActive ? "yes" : ""}`}
            />
          )}
          className="lit-collapse"
          expandIconPosition="end"
          items={items}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
};

export default Faq;
