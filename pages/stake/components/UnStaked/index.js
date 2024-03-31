import { Modal, message, Popconfirm } from "antd";
import MyButton from "@/components/MyButton";
import { useState, useMemo, useContext } from "react";
import CheckNft from "../Tools/CheckNft";
import WriteButton from "@/components/WriteButton";
import { displayNonZeroDigits } from "@/utils";
import { StakeContext } from "@/pages/stake";

const Tools = ({ open, handleClose, pool }) => {
  const getStake = useContext(StakeContext);
  const { unStake, tokenAmount, stakedTokenIds } = getStake[pool || 0];
  const [choolsNfts, setChoolsNfts] = useState([]);

  const options = useMemo(
    () =>
      stakedTokenIds?.map((item) => ({
        value: `No.${item}`,
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
      <p className="tools-money">
        Transfer {displayNonZeroDigits((choolsNfts?.length || 0) * tokenAmount)}{" "}
        LMC {pool === 1 ? `and ${choolsNfts?.length || 0} Pass` : ""} to your
        wallet.
      </p>
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
            callback: handleClose,
          })}
        />
      </div>
    </Modal>
  );
};
export default Tools;
