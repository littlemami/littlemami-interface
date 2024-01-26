import { Modal, message, Popconfirm } from "antd";
import { hiddenAddress } from "@/utils";
import { useEffect, useState } from "react";
const InviteModal = ({
  open,
  handleClose,
  phase,
  boughtNodeLogs,
  leaderPrizeLogs,
  referralPrizeLogs,
  invites,
  isAirdrop,
}) => {
  const [tabActive, setTabActive] = useState(1);

  const tabs = [
    { key: 1, title: "Purchase History" },
    { key: 2, title: "Referral Commissions" },
  ];
  if (phase == 3) {
    tabs.push({ key: 3, title: "Airdrop Boost" });
  }

  useEffect(() => {
    setTabActive(isAirdrop ? 3 : 1);
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
      <h4>Record</h4>

      <div style={{ marginTop: "1.625rem" }} className="new-list-box">
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
        {tabActive === 1 && (
          <>
            <div className="item first">
              <strong>Block</strong>
              <p>Purchase quantity</p>
              <p>Spending amount</p>
            </div>
            <div className="con">
              {boughtNodeLogs?.map((invite, index) => {
                return (
                  <div className="item" key={index}>
                    <strong>{invite?.block || "--"}</strong>
                    <p> {invite?.boughtNode || "--"}</p>
                    <p> {invite?.referralPrize || "--"} U</p>
                  </div>
                );
              })}
              {boughtNodeLogs.length == 0 && (
                <p style={{ width: "100%" }} className="no-data">
                  No Record
                </p>
              )}
            </div>
          </>
        )}
        {tabActive === 2 && (
          <>
            <div className="item first">
              <strong>Address</strong>
              <p>Node Amount</p>
              <p>Referral Rewards</p>
            </div>
            <div className="con">
              {referralPrizeLogs?.map((invite, index) => {
                return (
                  <div className="item" key={index}>
                    <strong>{hiddenAddress(invite?.address) || "--"}</strong>
                    <p> {invite?.boughtNode || "--"}</p>
                    <p> {invite?.referralPrize || "--"} U</p>
                  </div>
                );
              })}
              {referralPrizeLogs.length == 0 && (
                <p style={{ width: "100%" }} className="no-data">
                  No Record
                </p>
              )}
            </div>
          </>
        )}
        {tabActive === 3 && (
          <>
            <div className="item first">
              <strong>Address</strong>
              {invites.length >= 3 && <p>Type</p>}
              <p>Leader Rewards</p>
            </div>
            <div className="con">
              {leaderPrizeLogs?.map((invite, index) => {
                return (
                  <div className="item" key={index}>
                    <strong>{hiddenAddress(invite?.address) || "--"}</strong>
                    {invites.length >= 3 && <p> {invite?.type || "--"}</p>}
                    <p> {invite?.amount || "--"} LMC</p>
                  </div>
                );
              })}
              {leaderPrizeLogs.length == 0 && (
                <p style={{ width: "100%" }} className="no-data">
                  No Record
                </p>
              )}
              {invites.length < 3 ? (
                <div className="invite-box">
                  <div className="invite-less">
                    <p>
                      <strong>{3 - invites.length}</strong> more directly
                      referred node friends
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
          </>
        )}
      </div>
    </Modal>
  );
};

export default InviteModal;
