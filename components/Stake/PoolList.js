import AvatarGroup from "../AvatarGroup";
import MyButton from "../MyButton";
import MyTag from "../MyTag";
import WriteButton from "@/components/WriteButton";
import { useState, useContext } from "react";

import { StakeContext } from "@/pages/stake";

import UnStaked from "@/pages/stake/components/UnStaked";
import { Space } from "antd";
const List = ({ item, index, getStake }) => {
  const [open, setOpen] = useState(false);
  const cardCss =
    "rounded-2xl border-[0.0625rem] border-solid border-[rgba(255,255,255,0.17)] py-4 px-8 w-full bg-[#191832]";

  const { stakeAmount, userRemain, claim, tokenAmount } = getStake;
  return (
    <>
      {(stakeAmount && stakeAmount != 0) || index === 0 ? (
        <div
          className={`flex flex-row items-center ${cardCss} mt-2`}
          key={item}
        >
          <div className="w-3/5">
            {index === 0 ? (
              "Pools"
            ) : (
              <div className="flex flex-row items-center">
                <AvatarGroup list={item?.avatarList} className="w-1/5" />
                <div className="ml-16 flex">
                  {(
                    item?.tagList(
                      stakeAmount,
                      stakeAmount * tokenAmount || 0
                    ) ?? []
                  ).map((item) => {
                    return (
                      <MyTag
                        key={item}
                        color={item?.color}
                        textNode={item?.textNode}
                        className="mr-2"
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="w-1/5">
            {index === 0 ? "Pending Rewards" : (userRemain || 0) + " LMC"}
          </div>
          <div className="flex flex-row w-1/5">
            {index === 0 ? (
              "Actions"
            ) : (
              <Space>
                <WriteButton color="#6944ff" {...claim} />

                <MyButton
                  onClick={() => setOpen(true)}
                  fullWidth
                  text="Unstake"
                  color="#b844ff"
                />
              </Space>
            )}
          </div>
        </div>
      ) : null}

      <UnStaked
        pool={item.pool}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

const PoolList = (props) => {
  const { className, list } = props;
  const getStake = useContext(StakeContext);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-col">
        {list?.map((item, index) => {
          return (
            <List
              getStake={getStake[item?.pool || 0]}
              item={item}
              index={index}
              key={index}
            />
          );
        })}
        {(!getStake[0]?.stakeAmount || getStake[0]?.stakeAmount == 0) &&
          (!getStake[1]?.stakeAmount || getStake[1]?.stakeAmount == 0) && (
            <div className="text-center mt-10"> No Data</div>
          )}
      </div>
    </div>
  );
};

export default PoolList;
