import { Modal, message, Popconfirm } from "antd";

import Vector from "@/public/images/svg/vector.svg";
import Twitter from "@/public/images/svg/twitter.svg";

const HammerModal = ({
  open,
  handleClose,
  totalPrize,
  stakeRate,
  leaderPrize,
}) => {
  return (
    <Modal
      centered
      open={open}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
      width={560}
      wrapClassName="cur-modal-box"
      classNames={{
        mask: "cur-modal-mask",
        body: "cur-modal-body suc-modal-body",
      }}
    >
      <div className="hammer">
        <strong>Holding node gets LMC airdrop</strong>
        <div className="hammer-bd">
          <div>
            <em>Total Rewards</em>
            <span>{totalPrize ?? "--"} LMC</span>
          </div>
          <div>
            <em>Staking</em>
            <span>{stakeRate ?? "--"} LMC/Block</span>
          </div>
          <div>
            <em>Leadership Rewards</em>
            <span>{leaderPrize ?? "--"} LMC</span>
          </div>
        </div>
      </div>
      <button className={`price-btn small`} onClick={(e) => {}}>
        Claim Prize
      </button>
    </Modal>
  );
};

export default HammerModal;
