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
          <p>You now have {num} nodes in total.</p>
        </div>
      </div>
      <button
        className={`price-btn small`}
        onClick={(e) => {
          const text = encodeURIComponent(
            `I have officially be a #MarsNode, an innovative approach for users to engage with the blockchain by leveraging social relationships.  I will receive mining rewards and actively contribute to earn more LMC and Mars airdrops.  Let’s faming ${
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
