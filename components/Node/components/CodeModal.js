import { Modal, message, Popconfirm } from "antd";
const CodeModal = ({ open, code, marsPrize, handleClose }) => {
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
      <h4>Codes For MARS NFT</h4>

      <ul>
        <li>
          To share the enthusiasm and sincerity of LittleMami with a broader
          audience, we have prepared a batch of lottery codes for early
          participants. These codes can be used for future unreleased MARS NFT
          lotteries.
        </li>
        <li>
          Purchasing nodes and recommending others to purchase nodes both earn 1
          code each. Unidirectional recommendations for node purchases can earn
          a maximum of 3 codes, until the whitelist round concludes.
        </li>
      </ul>
      <div className="new-list-box">
        <div className="score-main">
          <img src="/images/node_banner.png" alt="" />
          <div>
            <p>My Code: {code}</p>
            <p>Earn Mars: {marsPrize}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CodeModal;
