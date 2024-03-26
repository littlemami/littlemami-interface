import Image from "next/image";
import AvatarGroup from "../AvatarGroup";

const PoolCard = (props) => {
  const { imgSrc, joinScrArr, startTime, lmc, apr, onClick } = props;
  const arr = [
    {
      text: "Start Time",
      value: startTime,
    },
    {
      text: "LMC per Block",
      value: lmc,
    },
    {
      text: "APR",
      value: apr,
    },
  ];
  return (
    <div
      onClick={() => onClick?.(props?.pool)}
      className="flex-1 shrink-0 rounded-[1.875rem] border-[0.0625rem] border-solid border-[rgba(255,255,255,0.17)]  shadow-[0px_4px_13.8px_0px_rgba(0,0,0,0.25)] backdrop-blur-[1.5625rem] p-8 flex flex-col cursor-pointer"
    >
      <Image src={imgSrc} width={800} height={40} alt={imgSrc} />
      <AvatarGroup list={joinScrArr} />
      <div className="flex flex-col">
        {arr.map((item) => {
          return (
            <div className="flex flex-row justify-between mb-3" key={item}>
              <div>{item.text}</div>
              <div>{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoolCard;
