import { Modal, message, Popconfirm } from "antd";

import Vector from "@/public/images/svg/vector.svg";
import Twitter from "@/public/images/svg/twitter.svg";

const SuccessfulModal = ({ num, id, open, handleClose }) => {
  return (
    <Modal
      centered
      open={open}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
      width={550}
      wrapClassName="cur-modal-box"
      classNames={{
        mask: "cur-modal-mask",
        body: "cur-modal-body suc-modal-body",
      }}
    >
      <div className="suc">
        <Vector width={"3.75rem"} />
        <div>
          <strong> Purchase successful!</strong>

          <p>
            You have purchased {num} nodes,Data indexing in progress. Please be
            patient for one minute.
          </p>
        </div>
      </div>
      <button
        className={`price-btn small`}
        onClick={(e) => {
          const text = encodeURIComponent(
            `I have officially become the @MarsProtocolFi #MarsNode, and I will receive staking rewards.Let's farming to earn more #LMC and #MARS NFT airdrops.${
              window.location.href + id
            }`
          );
          const tweetUrl = `https://twitter.com/intent/tweet?text=${text}`; // https://twitter.com/Littlemamilabs

          window.open(tweetUrl, "_blank");
        }}
      >
        <Twitter width={"1.6875rem"} />
        Share it!
      </button>
    </Modal>
  );
};

export default SuccessfulModal;
