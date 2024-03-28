import { Modal, message, Popconfirm } from "antd";
import MyButton from "@/components/MyButton";
import { useState } from "react";
import CheckNft from "./CheckNft";
import { displayNonZeroDigits } from "@/utils";

const Tools = ({
  open,
  options,
  handleClose,
  onChange,
  defaultList,
  only,
  tokenAmount,
}) => {
  const noData = !options || options?.length === 0;
  const [list, setList] = useState(defaultList || (only ? undefined : []));
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
      <h4>{only ? "My Pass" : "My Tools"}</h4>
      {!noData && !only && (
        <p className="tools-money">
          Transfer {displayNonZeroDigits((list?.length || 0) * tokenAmount)} LMC
          to your wallet.
        </p>
      )}
      <div className="tools-bd">
        {noData ? (
          <div className="no-data">No data</div>
        ) : (
          <CheckNft
            defaultList={defaultList}
            options={options}
            only={only}
            onChange={setList}
          />
        )}
      </div>
      <div className="tools-btn">
        {noData ? (
          <MyButton
            onClick={() => {
              window?.open?.(
                only
                  ? "https://opensea.io/zh-CN/collection/littlemami-pass"
                  : "https://opensea.io/zh-CN/collection/lmc-tool-ssr"
              );
            }}
            fullWidth
            text={only ? "Buy Pass" : "Buy Tools"}
            color="#6944ff"
          />
        ) : (
          <MyButton
            onClick={() => {
              handleClose?.();
              onChange?.(list);
            }}
            fullWidth
            text="COMFIRM"
            color="#6944ff"
          />
        )}
      </div>
    </Modal>
  );
};
export default Tools;
