import { Chip } from "@nextui-org/react";

const MyTag = (props) => {
  const { color, textNode,className} = props;
  return (
    <Chip
      className={`py-3  rounded-full h-[20px] ${className}`}
      style={{ backgroundColor: color }}
    >
      {textNode}
    </Chip>
  );
};

export default MyTag;
