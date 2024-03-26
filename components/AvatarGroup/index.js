import Image from "next/image";

const AvatarGroup = (props) => {
  const { list, className } = props;
  return (
    <div className={`flex mt-4 mb-3 ${className}`}>
      {list.map((src, index) => {
        const className = index === 0 ? "" : "-ml-3";
        return (
          <Image
            src={src}
            key={src}
            width={46}
            height={46}
            alt={src}
            className={className}
          />
        );
      })}
    </div>
  );
};

export default AvatarGroup;