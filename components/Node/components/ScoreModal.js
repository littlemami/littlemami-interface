import { Modal, message, Popconfirm } from "antd";
const CodeModal = ({ open, handleClose, leftBlock, list, scoreTreasury }) => {
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
      <ul style={{ marginTop: "3.125rem" }}>
        <li>
          Each node&apos;s creation will automatically contribute 5 points to
          the Points Treasury.
        </li>
        <li>
          If no new nodes are created within 7200 blocks, 20% of the total
          accumulated points in the treasury will be awarded to the last node
          participant, while the remaining 80% of the total contribution will be
          evenly distributed among participants ranked from 2nd to 100th.
          Simultaneously, the Points Treasury accumulation will reset.
        </li>
      </ul>
      <h4 className="mid">
        <span>Points Treasury: {scoreTreasury || "--"} Points</span>
        <span>Left Block: {leftBlock || "--"}</span>
      </h4>
      <div className="new-list-box">
        <div className="con">
          {list?.map((invite, index) => {
            return (
              <div className="item" key={index}>
                <strong>{invite?.address || "--"}</strong>
                <p> {invite?.shareScore || "--"} Points</p>
              </div>
            );
          })}
        </div>
      </div>

      {list?.length == 0 && <p className="no-data">No data</p>}
    </Modal>
  );
};

export default CodeModal;
