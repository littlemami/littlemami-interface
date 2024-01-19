import { Modal, message, Popconfirm } from "antd";
import { hiddenAddress } from "@/utils";
import { useEffect, useState } from "react";
const InviteModal = ({
  open,
  handleClose,
  phase,
  referralPrizeLogs,
  invites,
}) => {
  const [tabActive, setTabActive] = useState(1);
  const [list, setList] = useState(invites);

  // invites = new Array(3).fill({
  //   address: "0xfEeE4A7F538E8ea47Ab3b8B319931F2d501D4124",
  //   boughtNode: "2",
  //   referralPrize: "2",
  // });
  const tabs = [
    { key: 1, title: "Direct Friends" },
    { key: 2, title: "Indirect Assistance", disabled: invites.length < 3 },
  ];
  useEffect(() => {
    setList(tabActive === 1 ? invites : referralPrizeLogs);
  }, [tabActive]);

  useEffect(() => {
    setTabActive(1);
  }, [open]);
  return (
    <Modal
      centered
      open={open}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
      width={900}
      wrapClassName="cur-modal-box"
      classNames={{ mask: "cur-modal-mask", body: "cur-modal-body inivte" }}
    >
      <h4>Invite Record</h4>

      <ul>
        <li>
          Direct referrals of friends who purchase node that you can earn 50
          points and unlock <strong>$120,000 LMC</strong> reward airdrops upon
          reaching specific milestones.
        </li>
        <li>
          Direct referrals of friends who purchase nodes will receive 1 MARS NFT
          lottery code, and you can earn up to 3 codes. These lottery codes will
          be used for drawing MARS NFT prizes.
        </li>
        <li>
          Direct referrals of friends who purchase nodes that you will receive
          an LMC reward equivalent to <strong>5%</strong> of the purchased
          node&apos;s price.
        </li>
        <li>
          For every directly referred node friend, you will enjoy 5% of their
          node mining earnings. When you have three or more directly referred
          node friends, indirect assistance earnings will be activated, allowing
          you to accumulate additional earnings from the mining activities of
          indirectly referred node friends, also at a rate of 5%.
        </li>
      </ul>
      <div className="new-list-box">
        {phase != 1 && (
          <div className="invite-tab">
            {tabs.map((item) => (
              <span
                onClick={() => {
                  if (item?.disabled) return;

                  setTabActive(item.key);
                }}
                key={item.key}
                className={`${item.key === tabActive ? "active" : ""} ${
                  item?.disabled ? "disabled" : ""
                }`}
              >
                {item.title}
              </span>
            ))}
          </div>
        )}

        <div className="item first">
          <strong>Address</strong>
          <p>Node Amount</p>
          <p>Referral Rewards</p>
        </div>
        <div className="con">
          {list?.map((invite, index) => {
            return (
              <div className="item" key={index}>
                <strong>{hiddenAddress(invite?.address) || "--"}</strong>
                <p> {invite?.boughtNode || "--"}</p>
                <p> {invite?.referralPrize || "--"} LMC</p>
              </div>
            );
          })}
          {list.length == 0 && (
            <p style={{ width: "100%" }} className="no-data">
              No Record
            </p>
          )}{" "}
          {invites.length < 3 && phase != 1 ? (
            <div className="invite-box">
              <div className="invite-less">
                <p>
                  <strong>{3 - invites.length}</strong> more directly referred
                  node friends
                  <br /> to get indirect assistance
                </p>
                <div className={`s-item last-${3 - invites.length}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;
