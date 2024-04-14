import Image from "next/image";

const StakeTitle = (props) => {
  const { title, className, extraNode, tagNode } = props;
  return (
    <div className={`flex flex-col ${className}`}>
      <div className={`flex flex-row  items-center`}>
        <Image
          src="/images/svg/eth.svg"
          width={8}
          height={13}
          alt="eth"
          className="mr-2"
        />
        <div className="text-[#FFF] font-Poppins text-[2.625rem] font-not-italic font-bold leading-normal tracking-1.26px">
          {title}
        </div>
        {tagNode}
      </div>
      {extraNode}
    </div>
  );
};

export default StakeTitle;
