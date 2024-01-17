import { Modal, message, Popconfirm } from "antd";
const InviteModal = ({ open, handleClose, invites }) => {
  return (
    <Modal
      centered
      open={open}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
      width={900}
      wrapClassName="cur-modal-box"
      classNames={{ mask: "cur-modal-mask", body: "cur-modal-body" }}
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
        <div className="item first">
          <strong>Address</strong>
          <p>Node Amount</p>
        </div>
        <div className="con">
          {invites?.map((invite, index) => {
            return (
              <div className="item" key={index}>
                <strong>{invite?.address || "--"}</strong>
                <p> {invite?.boughtNode || "--"}</p>
              </div>
            );
          })}
        </div>
        {invites.length == 0 && (
          <p style={{ width: "100%" }} className="no-data">
            No data
          </p>
        )}
      </div>
    </Modal>
  );
};

export default InviteModal;
