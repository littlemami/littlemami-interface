import { Modal, message, Popconfirm } from "antd";
import MyButton from "@/components/MyButton";
import { useState } from "react";
import CheckNft from "./CheckNft";
const Tools = ({ open, handleClose }) => {
  const [noData, setNodata] = useState(false);
  return (
    <Modal
      destroyOnClose
      centered
      open={open}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
      width={546}
      wrapClassName="cur-modal-box tools-modal-box"
      classNames={{ mask: "cur-modal-mask", body: "cur-modal-body inivte" }}
    >
      <h4>My Tools</h4>
      {!noData && (
        <p className="tools-money">Transfer 40000 LMC to your wallet.</p>
      )}
      <div className="tools-bd">
        {noData ? (
          <div className="no-data">No data</div>
        ) : (
          <CheckNft
            options={[
              { value: "No.112", key: 1 },
              { value: "No.113", key: 2, disabled: true },
              { value: "No.114", key: 3 },
            ]}
            onChange={(val) => console.log(val)}
          />
        )}
      </div>
      <div className="tools-btn">
        {noData ? (
          <MyButton fullWidth text="Buy Tools" color="#6944ff" />
        ) : (
          <MyButton fullWidth text="COMFIRM" color="#6944ff" />
        )}
      </div>
    </Modal>
  );
};
export default Tools;
