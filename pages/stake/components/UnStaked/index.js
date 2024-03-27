import { Modal, message, Popconfirm } from "antd";
import MyButton from "@/components/MyButton";
import { useState, useMemo } from "react";
import CheckNft from "../Tools/CheckNft";
import WriteButton from "@/components/WriteButton";

import { useTotalStakeInfo } from "@/hooks/stake";
const Tools = ({ open, handleClose, pool }) => {
  const { unStake, userPassTokenId, stakedTokenIds } = useTotalStakeInfo(pool);
  const [choolsNfts, setChoolsNfts] = useState([]);

  const options = useMemo(
    () =>
      stakedTokenIds?.map((item) => ({
        value: item,
        key: item,
      })),
    [stakedTokenIds]
  );

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
      <h4>My Staked NFT</h4>
      <div className="tools-bd">
        {options?.length === 0 ? (
          <div className="no-data">No data</div>
        ) : (
          <CheckNft unStaked options={options} onChange={setChoolsNfts} />
        )}
      </div>
      <div className="tools-btn">
        <WriteButton
          fullWidth
          color="#6944ff"
          {...unStake({
            unStakeTokenIds: choolsNfts,
            passTokenId: userPassTokenId,
            callback: handleClose,
          })}
        />
      </div>
    </Modal>
  );
};
export default Tools;
