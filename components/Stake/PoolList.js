import AvatarGroup from "../AvatarGroup";
import MyButton from "../MyButton";
import MyTag from "../MyTag";

const PoolList = (props) => {
  const { className, list, unStake } = props;
  const cardCss =
    "rounded-2xl border-[0.0625rem] border-solid border-[rgba(255,255,255,0.17)] py-4 px-8 w-full bg-[#191832]";
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-col">
        {list.map((item, index) => {
          return (
            <div
              className={`flex flex-row items-center ${cardCss} mt-2`}
              key={item}
            >
              <div className="w-3/5">
                {index === 0 ? (
                  "Pools"
                ) : (
                  <div className="flex flex-row items-center">
                    <AvatarGroup list={item.avatarList} className="w-1/5" />
                    <div className="ml-16">
                      {(item?.tagList ?? []).map((item) => {
                        return (
                          <MyTag
                            key={item}
                            color={item.color}
                            textNode={item.textNode}
                            className="mr-2"
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-1/5">
                {index === 0 ? "Pending Rewards" : item.lmc + " LMC"}
              </div>
              <div className="flex flex-row w-1/5">
                {index === 0 ? (
                  "Actions"
                ) : (
                  <>
                    <MyButton text="claim" color="#6944ff" className="mr-2" />
                    <MyButton
                      onClick={() => unStake?.(list)}
                      text="Unstake"
                      color="#b844ff"
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoolList;
