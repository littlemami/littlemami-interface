import { Modal, message, Popconfirm } from "antd";
const InviteModal = ({ open, handleClose, invites }) => {
  return (
    <Modal
      centered
      open={open}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
      width={824}
      wrapClassName="cur-modal-box"
      classNames={{ mask: "cur-modal-mask", body: "cur-modal-body" }}
    >
      <h4>Invite Record</h4>

      <ul>
        <li>
          Holding nodes qualifies for LMC airdrops at a rate of
          <strong>69.5 LMC</strong> per block.
        </li>
        <li>
          Total supply of <strong>one hundred million.</strong>
        </li>
        <li>
          For every node that the referral friends enjoy a <strong>5%</strong>
          share of their airdrop earnings. Upon successfully inviting three node
          friends, activate indirect Airdrop Boost earnings, which can be
          further stacked with an additional 5% from each indirect node friend.
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
      </div>

      {invites.length == 0 && <p className="no-data">No data</p>}
    </Modal>
  );
};

export default InviteModal;
