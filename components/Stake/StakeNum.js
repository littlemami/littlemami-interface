import Image from "next/image";

const StakeNum = (props) => {
  const { className } = props;
  const arr = [
    {
      imgSrc: "/images/svg/totalStake.svg",
      value: "123123",
      title: "Total Staked",
    },
    { imgSrc: "/images/svg/myStake.svg", value: "4000", title: "My Staked" },
    { imgSrc: "/images/svg/reward.svg", value: "500.2", title: "My Rewards" },
  ];
  return (
    <div className={`flex flex-row ${className} gap-12`}>
      {arr.map((item) => {
        return (
          <div className="flex flex-row items-center" key={item}>
            <Image
              src={item.imgSrc}
              width={30}
              height={30}
              alt={item.imgSrc}
              className="mr-4"
            />
            <div className="flex flex-col">
              <div className="font-bold text-[#FFF] text-lg">
                {item.value} LMC
              </div>
              <div className="text-[rgba(226,217,240,0.60)]">{item.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StakeNum;
