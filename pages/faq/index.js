import { Collapse, ConfigProvider } from "antd";
import styles from "./index.module.scss";

import ColRight from "@/public/images/svg/col_right.svg";

const items = [
  {
    key: "1",
    label: "What’s the MarsNode?",
    children: (
      <p>
        MarsNode, a cutting-edge development by LittleMami, presents an
        innovative approach for users to engage with the blockchain by
        leveraging their social relationships.
        <br /> The initial price of a node is 300 U, with a total supply of
        30,000 nodes. For every 50 nodes created, the price increases by 0.5%.
        In order to facilitate calculation and the subsequent distribution of
        airdrop rewards, the value is rounded up. Upon successful node purchase,
        an accompanying Node Badge NFT is automatically acquired. Once all nodes
        are sold, this NFT can be freely transferred or traded.
      </p>
    ),
  },
  {
    key: "2",
    label: " How to join the MarsNode?",
    children: (
      <p>
        1. The holders of PassCard, LMC TOOL NFT, BLHZ Medel NFT, and MARS NFT
        addresses will be granted direct access to the Node whitelist before the
        official launch, and purchasing can be done during one week after the
        launch.
        <br />
        2. After the whitelist purchase phase ends, users can make direct
        purchases through the official website or invitation links. Users
        entering through the invitation link can purchase a maximum of 2 nodes.
      </p>
    ),
  },
  {
    key: "3",
    label: "What are the benefits of MarsNode?",
    children: (
      <p>
        1）Node Mining Earning <br />
        2）Referral Commissions <br />
        3）NFT Airdrops <br />
        4）Airdrop Rewards through Friend Referrals <br />
        5）Protocol Transaction Fee Earnings <br />
        6）Launchpad project WL or Airdrop <br />
        7）Reward Pool Airdrops
      </p>
    ),
  },
  {
    key: "4",
    label:
      "Is the LMC reward pool airdrop for node milestones credited instantly?",
    children: (
      <p>
        The points, points treasury, and milestone airdrops have been initiated
        since phase 1. When the node quantity milestones reach 800, 1500, and
        2100, snapshots of node users will be taken. An airdrop of LMC,
        equivalent to 120,000 U in total, will be distributed based on the
        points&apos; proportion. The amount of airdropped LMC is determined by
        real-time snapshot data. <br /> <br />
        Ways to earn points include: <br />
        <br />
        Each self-purchased node earns 100 points, and successfully referring a
        user for a purchase earns an additional 50 points. <br />
        With the birth of each node, 5 points are automatically accumulated in
        the points treasury. If no new nodes are born within 7200 blocks, 20% of
        the total accumulated points in the treasury are rewarded to the last
        participant of the node, and the remaining 80% of the total contribution
        is distributed among participants from the second-to-last node to the
        100th-to-last node. The points treasury accumulation is then reset.
      </p>
    ),
  },
  {
    key: "5",
    label:
      "Where do the additional LMC rewards for airdropping to MarsNode come from?",
    children: (
      <p>
        The airdrop quota is sourced from secondary market repurchases and the
        distribution of transaction fee revenue.
      </p>
    ),
  },
  {
    key: "6",
    label: "When does mining start?",
    children: (
      <p>
        Mining will commence when the number of nodes reaches 3000. Holding
        nodes enables you to receive LMC mining airdrops, with 69.5 LMC per
        block. The distribution is based on the proportion of the number of
        nodes, halving every 90 days, with a total supply of 100 million, and
        mining will cease upon completion.
      </p>
    ),
  },
  {
    key: "7",
    label: "How to claim the rewards?",
    children: (
      <p>
        All LMC airdrop rewards are seamlessly synchronized with the database
        and settled every two weeks. Users can claim their rewards at their
        convenience, with unclaimed rewards rolling over to the next settlement
        period.
      </p>
    ),
  },
  {
    key: "8",
    label: "What's the lottery code?",
    children: (
      <p>
        In the whitelist phase, the official has prepared a batch of codes to be
        given to early participants. For every 50 nodes sold, 1 MARS NFT will be
        accumulated in the pool. Meanwhile, both self-purchases and direct
        referrals of friends who purchase nodes will receive 1 MARS NFT lottery
        code. Referring friends for purchases can earn up to 3 MARS NFT lottery
        codes. These lottery codes will be used for drawing MARS NFT prizes from
        the pool.
      </p>
    ),
  },
  {
    key: "9",
    label: "How to activate assistance airdrop earnings？",
    children: (
      <p>
        For every directly referred node friend, you will enjoy 5% of their node
        mining earnings. When you have three or more directly referred node
        friends, indirect assistance earnings will be activated, allowing you to
        accumulate additional earnings from the mining activities of indirectly
        referred node friends, also at a rate of 5%.
      </p>
    ),
  },
];

const Faq = () => {
  const onChange = (key) => {
   
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
